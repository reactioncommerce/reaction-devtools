import { Meteor } from "meteor/meteor";
import { Shops, Products, ProductSearch, Tags, Shipping, Media, Jobs } from "/lib/collections";
import { Reaction, Logger } from "/server/api";
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
        productId: productId,
        variantId: topVariant._id,
        toGrid: 1,
        shopId: shopId,
        priority: 0,
        workflow: "published"
      };
      Media.insert(fileObj);
    }
  }
  Logger.info("loaded product images");
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

export default methods;

Meteor.methods({
  "devtools/loaddata/small": methods.loadSmallDataset,
  "devtools/resetData": methods.resetData
});
