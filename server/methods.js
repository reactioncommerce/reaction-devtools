import { Meteor } from "meteor/meteor";
import { Job } from "/imports/plugins/core/job-collection/lib";
import { Products, ProductSearch, Tags, Packages, Jobs, Orders, OrderSearch, Catalog } from "/lib/collections";
import { Media } from "/imports/plugins/core/files/server";
import Logger from "@reactioncommerce/logger";
import collections from "/imports/collections/rawCollections";
import syncRequest from "sync-request";
import publishProductToCatalogById from "/imports/plugins/core/catalog/server/no-meteor/utils/publishProductToCatalogById";
import getGraphQLContextInMeteorMethod from "/imports/plugins/core/graphql/server/getGraphQLContextInMeteorMethod";
import { productTemplate, variantTemplate, optionTemplate } from "./dataset";

const methods = {};

function getContext() {
  const context = {
    ...Promise.await(getGraphQLContextInMeteorMethod(Meteor.userId())),
    collections
  };

  return context;
}

/**
 * @method resetMedia
 * @summary Reset the media collection
 * @return {undefined}
 */
function resetMedia() {
  const images = Promise.await(Media.find());
  Promise.await(Promise.all(images.map((fileRecord) => Media.remove(fileRecord))));
}

/**
 * @method loadSmallProducts
 * @summary load products from the "small" dataset
 * @return {undefined}
 */
function importProducts() {
  Logger.info("Starting load Products");
  turnOffRevisions();
  const products = require("/imports/plugins/custom/reaktor-devtools/sample-data/data/levelkids/Products.json");
  products.forEach((product) => {
    product.createdAt = new Date();
    product.updatedAt = new Date();
    Products.insert(product, {}, { publish: true });
    if (product.type === "simple" && product.isVisible) {
      publishProductToCatalogById(product._id, getContext());
    }
  });
  turnOnRevisions();
  kickoffProductSearchRebuild();
  Logger.info("Products loaded");
}

/**
 * @method loadSmallTags
 * @summary load tags from the "small" dataset
 * @return {undefined}
 */
function loadSmallTags() {
  Logger.info("Starting load Tags");
  const tags = require("/imports/plugins/custom/reaktor-devtools/sample-data/data/small/Tags.json");
  tags.forEach((tag) => {
    tag.updatedAt = new Date();
    Tags.insert(tag);
  });
  Logger.info("Tags loaded");
}

/**
 * @method turnOffRevisions
 * @summary temporarily turn off revisions so we can just insert data willy-nilly
 * @returns {undefined}
 */
function turnOffRevisions() {
  Packages.update({
    name: "reaction-revisions"
  }, {
    $set: {
      "settings.general.enabled": false
    }
  });
}
/**
 * @method turnOnRevisions
 * @summary Turn revisions back on to the system functions normally
 * @returns {undefined}
 */
function turnOnRevisions() {
  Packages.update({
    name: "reaction-revisions"
  }, {
    $set: {
      "settings.general.enabled": true
    }
  });
}

/**
 * @method kickoffProductSearchRebuild
 * @summary Drop a job to rebuild the product search into the queue
 * @returns {undefined}
 */
function kickoffProductSearchRebuild() {
  new Job(Jobs, "product/buildSearchCollection", {})
    .priority("normal")
    .retry({
      retries: 5,
      wait: 60000,
      backoff: "exponential"
    })
    .save({
      cancelRepeats: true
    });
}

/**
 * @method resetData
 * @summary Clear out data, bypassing revision control when necessary
 * @returns {undefined}
 */
methods.resetData = function () {
  // delete existing data
  Tags.remove({});
  Products.remove({});
  Catalog.remove({});
  ProductSearch.remove({});
  OrderSearch.remove({});
  Orders.remove({});
  resetMedia();
};

methods.helloApi = () => {
  Logger.info("Hello API");

  const baseUrl = "http://pim.levelkids.com/api/rest/v1/";
  const token = "";
  const headers = {
    "CF-Access-Client-Id": "",
    "CF-Access-Client-Secret": "",
    "content-type": "application/json",
    "Authorization": `Bearer ${token}`
  };


  // TODO fix when vendor is empty
  const generatePermalink = (vendor, title) => `${vendor}-${title}`.replace(/ /g, "-").toLowerCase();

  const getOptionTitle = (product) =>
    // eslint-disable-next-line no-nested-ternary
    ((product.values.clothing_size && product.values.clothing_size.length > 0) ? product.values.clothing_size[0].data : "" ||
      (product.values.footware_size && product.values.footware_size.length > 0) ? product.values.footware_size[0].data : "")
  ;

  const getVariantTitle = (product) =>
    // eslint-disable-next-line no-nested-ternary
    ((product.values.color && product.values.color.length > 0) ? product.values.color[0].data : "" ||
    (product.values.target_gender && product.values.target_gender.length > 0) ? product.values.target_gender[0].data : "")
  ;

  const getDesc = (product) => (product.values.description && product.values.description.length > 0 ? product.values.description[0].data : "");

  const getPrice = (product) => product.values.msrp[0].data[0].amount;

  const optionsResponse = syncRequest("GET", `${baseUrl}products?limit=100&page=12&locales=en_US`, {
    headers
  });
  const pimProducts = JSON.parse(optionsResponse.getBody("utf8"))._embedded.items;

  Logger.info(`${JSON.stringify(pimProducts)}`);

  pimProducts.forEach((pimProduct) => {
    const option = optionTemplate;
    option._id = pimProduct.identifier;
    option.title = getOptionTitle(pimProduct);
    option.description = getDesc(pimProduct);
    option.vendor = pimProduct.values.brand && pimProduct.values.brand.length > 0 ? pimProduct.values.brand[0].data : "";
    option.price = getPrice(pimProduct);
    option.optionTitle = getOptionTitle(pimProduct);

    let variant = Products.findOne({ _id: `v${pimProduct.identifier}` });

    if (variant === undefined) {
      Logger.info(`Variant does not exist, creating: v${pimProduct.identifier}`);
      variant = variantTemplate;
      variant._id = `v${pimProduct.identifier}`;
      variant.title = getVariantTitle(pimProduct);
      variant.optionTitle = getVariantTitle(pimProduct);
      variant.description = getDesc(pimProduct);
      variant.vendor = pimProduct.values.brand && pimProduct.values.brand.length > 0 ? pimProduct.values.brand[0].data : "";
      variant.price = getPrice(pimProduct);
    } else {
      Logger.info(`Variant exists already: v${pimProduct.identifier}`);
    }

    Logger.info(`Processing variant: ${option.title} with parent ${pimProduct.parent}`);

    if (!pimProduct.parent) {
      Logger.info(`Skipping variant no parent ${JSON.stringify(pimProduct)}`);
      return;
    }

    // Do we have the parent already?
    const existingProduct = Products.findOne({ _id: pimProduct.parent });

    if (existingProduct === undefined) {
      // lookup product model from API and save
      const productResponse = syncRequest("GET", `${baseUrl}product-models/${pimProduct.parent}?locales=en_US`, {
        headers
      });
      const prodModel = JSON.parse(productResponse.getBody("utf8"));
      const newProduct = productTemplate;
      newProduct._id = prodModel.code;
      newProduct.title = prodModel.values.name[0].data;
      newProduct.description = getDesc(pimProduct);
      newProduct.vendor = prodModel.values.brand && prodModel.values.brand.length > 0 ? prodModel.values.brand[0].data : "";
      newProduct.handle = generatePermalink(newProduct.vendor, newProduct.title);

      Logger.info(`Processing product: ${newProduct.title} with parent ${newProduct._id}`);

      try {
        Products.insert(newProduct, {}, { publish: true });
        Logger.info(`Finished inserting product ${newProduct.title}`);
      } catch (err) { }

      // Link product to variant
      variant.ancestors = [newProduct._id];

      try {
        Products.insert(variant, {}, { publish: true });
        Logger.info(`Finished inserting variant ${newProduct.title}`);
      } catch (err) { }

      // Link option to variant
      option.ancestors = [newProduct._id, variant._id];

      // Save variant
      try {
        Products.insert(option, {}, { publish: true });
        Logger.info(`Finished inserting variant ${option.title} with product ${newProduct.title}`);
      } catch (e) { Logger.info(`Failed to get ${pimProduct.parent}`); }

      if (newProduct.type === "simple" && newProduct.isVisible) {
        publishProductToCatalogById(newProduct._id, getContext());
      }
    } else {
      Logger.info("Prod Model exists already");

      // Link option to variant
      option.ancestors = [existingProduct._id, `v${option._id}`];
      // Link product to variant
      variant.ancestors = [existingProduct._id];
      // Save variant
      try {
        Products.insert(option, {}, { publish: true });
        Logger.info(`2 Finished inserting variant ${option.title} with product ${existingProduct.title}`);
      } catch (e) { }
    }
  });
};

/**
 * @method loadSmallDataset
 * @summary Load the "small" dataset
 * @returns {undefined}
 */
methods.importProducts = function () {
  turnOffRevisions();
  importProducts();
  turnOnRevisions();
  kickoffProductSearchRebuild();
};

export default methods;

Meteor.methods({
  "reaktor-devtools/importProducts": methods.importProducts,
  "reaktor-devtools/resetData": methods.resetData
});
