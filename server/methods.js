import { Buffer } from "buffer";
import jpeg from "jpeg-js";
import faker from "faker";
import _ from "lodash";
import { slugify } from "transliteration";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Job } from "meteor/vsivsi:job-collection";
import { Products, ProductSearch, Tags, Media, Packages, Jobs, Orders } from "/lib/collections";
import { Logger } from "/server/api";
import { productTemplate, variantTemplate, optionTemplate, orderTemplate } from "./dataset";


const methods = {};

function resetMedia() {
  Media.files.direct.remove({});
}

function loadSmallProducts() {
  Logger.info("Starting load Products");
  turnOffRevisions();
  const products = require("/imports/plugins/custom/reaction-devtools/sample-data/data/small/Products.json");
  products.forEach((product) => {
    product.createdAt = new Date();
    product.updatedAt = new Date();
    Products.insert(product, {}, { publish: true });
  });
  turnOnRevisions();
  Logger.info("Products loaded");
}

function loadSmallTags() {
  Logger.info("Starting load Tags");
  const tags = require("/imports/plugins/custom/reaction-devtools/sample-data/data/small/Tags.json");
  tags.forEach((tag) => {
    tag.updatedAt = new Date();
    Tags.insert(tag);
  });
  Logger.info("Tags loaded");
}

function getTopVariant(productId) {
  const topVariant = Products.findOne({
    "ancestors": { $in: [productId] },
    "ancestors.1": { $exists: false }
  });
  return topVariant;
}

/**
 * Generates an random colored image with specified width, height and quality
 * @param width width of the image
 * @param height height of the image
 * @param quality quality of the image
 * @param callback callback
 */
function generateImage(width, height, quality, callback) {
  const frameData = new Buffer(width * height * 4);
  // const hexColors = [0x5b, 0x40, 0x29, 0xff, 0x59, 0x3e, 0x29, 0x54, 0x3c];
  // // const color = Random.choice(hexColors);
  // const color = Math.floor(Math.random() * 256);
  let i = 0;
  while (i < frameData.length) {
    const color = Math.floor(Math.random() * 256);
    frameData[i++] = color;
  }
  const rawImageData = { data: frameData, width, height };
  const jpegImageData = jpeg.encode(rawImageData, quality);

  if (jpegImageData) {
    callback(null, jpegImageData);
  }
}

function createProductImage(product) {
  generateImage(600, 600, 80, (err, image) => {
    const fileObj = new FS.File();
    const fileName = `${product._id}.jpg`;
    fileObj.attachData(image.data, { type: "image/jpeg", name: fileName });
    const topVariant = getTopVariant(product._id);
    const shopId = product.shopId;
    fileObj.metadata = {
      productId: product._id,
      variantId: topVariant._id,
      toGrid: 1,
      shopId,
      priority: 0,
      workflow: "published"
    };
    Media.insert(fileObj);
    Logger.info(`Wrote image for ${product._id}`);
    return fileObj;
  });
}

function importProductImages() {
  Logger.info("Started loading product images");
  const products = Products.find({ type: "simple" }).fetch();
  for (const product of products) {
    if (!Media.findOne({ "metadata.productId": product._id })) {
      createProductImage(product);
    }
  }
  Logger.info("loaded product images");
}

function addProduct() {
  const products = [];
  const product = _.cloneDeep(productTemplate);
  const productId = Random.id().toString();
  const variant = _.cloneDeep(variantTemplate);
  const variantId = Random.id().toString();
  product._id = productId;
  product.description = faker.lorem.paragraph();
  product.title = faker.commerce.productName();
  product.vendor = faker.company.companyName();
  product.handle = slugify(product.title);
  product.createdAt = new Date();
  product.updatedAt = new Date();
  // always one top level variant
  variant._id = variantId;
  variant.ancestors = [productId];
  variant.title = faker.commerce.productName();
  variant.createdAt = new Date();
  variant.updatedAt = new Date();
  products.push(variant);
  const numOptions = Random.choice([1, 2, 3, 4]);
  const optionPrices = [];
  for (let x = 0; x < numOptions; x++) {
    const option = _.cloneDeep(optionTemplate);
    const optionId = Random.id().toString();
    option._id = optionId;
    option.optionTitle = faker.commerce.productName();
    option.price = faker.commerce.price();
    optionPrices.push(parseFloat(option.price));
    option.ancestors = [productId, variantId];
    products.push(option);
  }
  const priceMin = _.min(optionPrices);
  const priceMax = _.max(optionPrices);
  let priceRange = `${priceMin} - ${priceMax}`;
  // if we don't have a range
  if (priceMin === priceMax) {
    priceRange = priceMin.toString();
  }
  const priceObject = {
    range: priceRange,
    min: priceMin,
    max: priceMax
  };
  product.price = priceObject;
  products.push(product);
  return products;
}

function addOrder() {
  const order = _.cloneDeep(orderTemplate);
  order._id = Random.id().toString();
  order.createdAt = new Date();
  const newName = `${faker.name.firstName()} ${faker.name.lastName()}`;
  order.billing.forEach((billingRecord, index) => {
    order.billing[index].paymentMethod.createdAt = new Date();
    order.billing[index].address.fullName = newName;
  });

  order.shipping.forEach((shippingRecord, index) => {
    order.shipping[index].address.fullName = newName;
  });

  order.items.forEach((item, index) => {
    order.items[index].product.createdAt = new Date();
    order.items[index].variants.createdAt = new Date();
  });
  return order;
}

function loadDataset(numProducts = 1000) {
  methods.resetData();
  Logger.info("Loading Medium Dataset");
  const rawProducts = Products.rawCollection();
  const products = [];
  for (let x = 0; x < numProducts; x++) {
    const newProducts = addProduct();
    products.push(...newProducts);
  }
  const writeOperations = products.map((product) => {
    return { insertOne: product };
  });
  rawProducts.bulkWrite(writeOperations).then(() => {
    Logger.info(`Created ${numProducts} products`);
  }, (error) => {
    Logger.error(error, "Error creating product record");
  });
}

function loadOrders(numOrders = 10000) {
  const rawOrders = Orders.rawCollection();
  const orders = [];
  for (let x = 0; x < numOrders; x++) {
    const newOrder = addOrder();
    orders.push(newOrder);
  }
  const writeOrderOperations = orders.map((order) => {
    return { insertOne: order };
  });
  rawOrders.bulkWrite(writeOrderOperations).then(() => {
    Logger.info(`Created ${numOrders} orders`);
  }, (error) => {
    Logger.error(error, "Error creating order records");
  });
}

function loadMediumTags() {
  const tags = require("/imports/plugins/custom/reaction-devtools/sample-data/data/medium/Tags.json");
  tags.forEach((tag) => {
    tag.updatedAt = new Date();
    Tags.insert(tag);
  });
  Logger.info("Tags loaded");
  return tags;
}

function turnOffRevisions() {
  Packages.update({
    name: "reaction-revisions"
  }, {
    $set: {
      "settings.general.enabled": false
    }
  });
}

function turnOnRevisions() {
  Packages.update({
    name: "reaction-revisions"
  }, {
    $set: {
      "settings.general.enabled": true
    }
  });
}

function assignHashtagsToProducts(tags, productPerCategory = 100) {
  const products = Products.find({ type: "simple" },  { _id: 1 }).fetch();
  const tagIds = tags.reduce((tagArray, tag) => {
    if (!tag.isTopLevel) {
      tagArray.push(tag._id);
    }
    return tagArray;
  }, []);
  const rawProducts = Products.rawCollection();
  const writeOperations = [];
  tagIds.map((tagId) => {
    for (let x = 0; x < productPerCategory; x++) {
      const product = Random.choice(products);
      const filter = { _id: product._id };
      const update = { $addToSet: { hashtags: tagId } };
      writeOperations.push({ updateOne: { filter, update } });
    }
  });
  rawProducts.bulkWrite(writeOperations);
  Logger.info("Tags assigned");
}

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

function kickoffOrderSearchRebuild() {
  new Job(Jobs, "order/buildSearchCollection", {})
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

methods.resetData = function () {
  // delete existing data
  Tags.remove({});
  Products.direct.remove({});
  ProductSearch.remove({});
  Orders.remove({});
  resetMedia();
};

methods.loadSmallDataset = function () {
  methods.resetData();
  loadSmallTags();
  loadSmallProducts();
};

methods.loadSmallOrders = function () {
  loadOrders(100);
};

methods.loadImages = function () {
  importProductImages();
};

methods.loadMediumDataset = function () {
  turnOffRevisions();
  methods.resetData();
  loadDataset(1000, 10000);
  const tags = loadMediumTags();
  assignHashtagsToProducts(tags);
  // importProductImages();
  // try to use this to make reactivity work
  // Products.update({}, { $set: { visible: true } }, { multi: true }, { selector: { type: "simple" }, publish: true });
  turnOnRevisions();
  kickoffProductSearchRebuild();
  kickoffOrderSearchRebuild();
  Logger.info("Loading Medium Dataset complete");
};

methods.loadMediumOrders = function () {
  loadOrders(10000);
};


methods.loadLargeDataset = function () {
  turnOffRevisions();
  methods.resetData();
  loadDataset(5000);
  turnOnRevisions();
  kickoffProductSearchRebuild();
};

methods.loadLargeOrders = () => {
  loadOrders(50000);
};


export default methods;

Meteor.methods({
  "devtools/loaddata/small/products": methods.loadSmallDataset,
  "devtools/loaddata/small/orders": methods.loadSmallOrders,
  "devtools/loaddata/small/images": methods.loadImages,
  "devtools/loaddata/medium/products": methods.loadMediumDataset,
  "devtools/loaddata/medim/orders": methods.loadMediumOrders,
  "devtools/loaddata/medium/images": methods.loadImages,
  "devtools/loaddata/large/products": methods.loadLargeDataset,
  "devtools/loaddata/large/orders": methods.loadLargeOrders,
  "devtools/loaddata/large/images": methods.loadImages,
  "devtools/resetData": methods.resetData
});
