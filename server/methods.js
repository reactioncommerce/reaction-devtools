import faker from "faker";
import { slugify } from "transliteration";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Shops, Products, ProductSearch, Tags, Media, Jobs } from "/lib/collections";
import { Reaction, Logger } from "/server/api";
import { productTemplate, variantTemplate, optionTemplate } from "./dataset";
import core from "/server/api/core";


const methods = {};

methods.cleanJobs = function () {
  Jobs.remove({});
};

methods.loadShops = function () {
  Logger.info("Starting load Shops");
  const shops = require("/imports/plugins/custom/swag-shop/private/data/Shops.json");
  shops.forEach((shop) => {
    Shops.insert(shop);
    Logger.info(`Inserted shop: ${shop.name}`);
  });
  Logger.info("Shops loaded");
};

methods.resetShops = function () {
  const shops =   require("/imports/plugins/custom/swag-shop/private/data/Shops.json");
  const shop = shops[0];
  // Let's remove any shops that are not ours
  Shops.remove({ _id: { $ne: shop._id } });
  const rawShopCollection = Shops.rawCollection();
  rawShopCollection.update({ _id: shop._id }, shop);
  Logger.info("Shop reset to original values");
};


methods.resetMedia = () => {
  Media.files.direct.remove({});
};

methods.resetUsers = function () {
  const users = Meteor.users.find({});
  users.forEach((user) => {
    Meteor.users.remove(user._id);
  });
};

methods.createAdminUser = function () {
  Reaction.createDefaultAdminUser();
};

methods.loadProducts = function () {
  Logger.info("Starting load Products");
  const products = require("/imports/plugins/custom/reaction-devtools/sample-data/data/Products.json");
  products.forEach((product) => {
    product.workflow.workflow = ["imported"]; // setting this bypasses revision control
    product.createdAt = new Date();
    product.updatedAt = new Date();
    Products.insert(product, {}, { publish: true });
  });
  Logger.info("Products loaded");
};

methods.loadTags = function () {
  Logger.info("Starting load Tags");
  const tags = require("/imports/plugins/custom/reaction-devtools/sample-data/data/Tags.json");
  tags.forEach((tag) => {
    tag.updatedAt = new Date();
    Tags.insert(tag);
  });
  Logger.info("Tags loaded");
};

function getTopVariant(productId) {
  const topVariant = Products.findOne({
    "ancestors": { $in: [productId] },
    "ancestors.1": { $exists: false }
  });
  return topVariant;
}

methods.importProductImages = function () {
  Logger.info("Started loading product images");
  const products = Products.find({ type: "simple" }).fetch();
  for (const product of products) {
    const productId = product._id;
    if (!Media.findOne({ "metadata.productId": productId })) {
      const shopId = product.shopId;
      const filepath = "custom/images/" + productId + ".jpg";
      const binary = Assets.getBinary(filepath);
      const fileObj = new FS.File();
      const fileName = `${productId}.jpg`;
      fileObj.attachData(binary, { type: "image/jpeg", name: fileName });
      const topVariant = getTopVariant(productId);
      fileObj.metadata = {
        productId,
        variantId: topVariant._id,
        toGrid: 1,
        shopId,
        priority: 0,
        workflow: "published"
      };
      Media.insert(fileObj);
    }
  }
  Logger.info("loaded product images");
};

methods.addProduct = function (bulk) {
  const product = productTemplate;
  const productId = Random.secret();
  const variant = variantTemplate;
  const variantId = Random.secret();
  product._id = productId;
  product.description = faker.lorem.paragraph();
  product.title = faker.commerce.productName();
  product.vendor = faker.company.companyName();
  product.handle = slugify(product.title);
  product.createdAt = new Date();
  product.updatedAt = new Date();
  bulk.insert(product);
  delete product._id;
  variant._id = variantId;
  variant.ancestors = [productId];
  variant.title = faker.commerce.productName();
  variant.createdAt = new Date();
  variant.updatedAt = new Date();
  bulk.insert(variant);
  delete variant._id;
  const numOptions = Random.choice([1, 2, 3, 4]);
  for (let x = 0; x < numOptions; x++) {
    const option = optionTemplate;
    option.optionTitle = faker.commerce.productName();
    option.price = faker.commerce.price();
    option.ancestors = [productId, variantId];
    bulk.insert(option);
    delete option._id;
  }
  return { productId, variantId };
};

methods.resetData = function () {
  // delete existing data
  Tags.remove({});
  Products.direct.remove({});
  ProductSearch.remove({});
  methods.resetMedia();
};

methods.loadSmallDataset = function () {
  methods.resetData();
  methods.loadTags();
  methods.loadProducts();
};

methods.loadLargeDataset = function () {
  methods.resetData();
  Logger.info("Loading Large Dataset");
  const rawProducts = Products.rawCollection();
  const bulk = rawProducts.initializeOrderedBulkOp();
  const numProducts = 10;
  for (let x = 0; x < numProducts; x++) {
    Logger.info("Adding product");
    methods.addProduct(bulk);
  }
  bulk.execute();
};

export default methods;

Meteor.methods({
  "devtools/loaddata/small": methods.loadSmallDataset,
  "devtools/loaddata/large": methods.loadLargeDataset,
  "devtools/resetData": methods.resetData
});
