import faker from "faker";
import now from "performance-now";
import _ from "lodash";
import slugify from "slugify";
var fs = require("fs");
import randomID from "random-id";
import { MongoClient, ObjectID, Binary } from 'mongodb';
import { productTemplate, variantTemplate, optionTemplate, orderTemplate,
   filerecordTemplate, copiesTemplate, tagTemplate, metadata, discountTemplate,
   accountTemplate, userTemplate } from "./dataset";
import * as images from "./images";

let Tags, Catalog, Products, ProductSearch, OrderSearch, Orders, Media, Discounts, Users, Accounts, workerId = 0;
let settings = {};
const storeDbs = {};
let stores = null;
let db = null;
let tags = [];
const optionsMap = {};

export async function init(id, sett) {
  workerId = id;
  const url = 'mongodb://localhost:27017/';
  const client = await MongoClient.connect(url);
  db = client.db(sett.dbName);
  settings = sett;
  stores = [
    {
      name: "image"
    },
    {
      name: "large"
    },
    {
      name: "medium"
    },
    {
      name: "thumbnail"
    },
    {
      name: "small"
    },
  ];
  Products = db.collection("Products");
  Tags = db.collection("Tags");
  Catalog = db.collection("Catalog");
  ProductSearch = db.collection("ProductSearch");
  OrderSearch = db.collection("OrderSearch");
  Orders = db.collection("Orders");
  Discounts = db.collection("Discounts");
  Media = db.collection("cfs.Media.filerecord");
  Users = db.collection("users");
  Accounts = db.collection("Accounts");
  for (const store of stores) {
    storeDbs[store.name] = {
      files: db.collection(`cfs_gridfs.${store.name}.files`),
      chunks: db.collection(`cfs_gridfs.${store.name}.chunks`)
    } 
  };
  await images.init();
}

// var lock = new ReadWriteLock();

const methods = {};

/**
 * @method resetMedia
 * @summary Reset the media collection
 * @return {undefined}
 */
async function resetMedia() {
  await Media.remove(
    {});
  for (const store of stores) {
    await db.collection(`cfs_gridfs.${store.name}.chunks`).remove({});
    await db.collection(`cfs_gridfs.${store.name}.files`).remove({});
  }
  // console.log("Resetting Media")
  // const images = await Media.find().toArray();
  // console.log(images)
  // await Promise.all(images.map((fileRecord) => Media.remove(fileRecord)));
}

/**
 * @method getTopVariant
 * @summary determine the top variant for a product to attach the image to
 * @param {string} productId - The id for a product
 * @returns {object} the variant object
 */
function getTopVariant(productId) {
  const topVariant = Products.findOne({
    "ancestors": { $in: [productId] },
    "ancestors.1": { $exists: false }
  });
  return topVariant;
}

/**
 * @method getPrimaryProduct
 * @summary determine the top-level product for assigning product images
 * @param {object} variant - the variant to find the parent for
 */
function getPrimaryProduct(variant) {
  const parent = Products.findOne({ _id: { $in: variant.ancestors  }, type: "simple" } );
  return parent;
}


/**
 * @method addProduct
 * @summary Generate a random product with variants and options
 * @returns {array} products - An array of the products created
 */
function addProduct(batch, catalogBatch) {
  const product = _.cloneDeep(productTemplate);
  const variants = [];
  const productId = randomID(10, "aA0");
  product._id = productId;
  product.description = `${faker.lorem.paragraphs()}`;
  product.title = `${faker.commerce.productName()}-${randomID(5, "aA0")}`;
  product.vendor = faker.company.companyName();
  product.handle = slugify(product.title);
  product.hashtags = getTagsForProduct();
  product.createdAt = new Date();
  product.updatedAt = new Date();
  product.metafields = metadata[settings.attributes];
  // always one top level variant
  const variant = _.cloneDeep(variantTemplate);
  const variantId = randomID(10, "aA0");;
  variant._id = variantId;
  variant.ancestors = [productId];
  variant.title = faker.commerce.productName();
  variant.createdAt = new Date();
  variant.updatedAt = new Date();
  batch.insert(variant);
  variants.push(variant);
  const numOptions = settings.variations[Math.floor(Math.random()*settings.variations.length)];
  const optionPrices = [];
  optionsMap[productId] = [];
  for (let x = 0; x < numOptions; x += 1) {
    const option = _.cloneDeep(optionTemplate);
    const optionId = randomID(10, "aA0");
    option._id = optionId;
    option.optionTitle = faker.commerce.productName();
    option.title = option.optionTitle;
    option.price = faker.commerce.price();
    optionPrices.push(parseFloat(option.price));
    option.ancestors = [productId, variantId];
    optionsMap[productId].push({
      _id: optionId
    });
    batch.insert(option);
    variants.push(option);
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
  batch.insert(product);

  catalogBatch.insert({
    ...product,
    type: "product-simple",
    variants,
    media: []
  })
}

function getTagsForProduct() {
  const numberOfTags = Math.ceil(Math.random() * 3);
  let hashtags = [];
  for (let i = 0; i < numberOfTags; i++) {
    hashtags.push(tags[Math.floor(Math.random() * tags.length)]);
  }
  return hashtags;
}

async function addPrimaryImage(productId, fileRecordBatch, mediaArr, storeBatch) {
  for (let i = 0; i < settings.IPS; i++) {
    const name = `${randomID(10, "aA0")}.jpg`;
    const filerecord = _.cloneDeep(filerecordTemplate);
    filerecord._id = randomID(10, "aA0");
    filerecord.original.name = name;
    filerecord.metadata.productId = productId;
    filerecord.metadata.variantId = productId;
    const imageIndex = Math.floor(Math.random() * 20);
    for (const store of stores) {
      const storeName = store.name;
      const ID = ObjectID();
      const filesTemplate = _.cloneDeep(copiesTemplate[storeName].files);
      const chunksTemplate = {
        n: 0
      }
      filesTemplate._id = ID;
      chunksTemplate.files_id = ID;
      chunksTemplate.data = images.getImage(storeName, imageIndex);
      storeBatch[storeName].files.insert(filesTemplate);
      storeBatch[storeName].chunks.insert(chunksTemplate);
      filerecord.copies[storeName].key = ID.toString();
      filerecord.copies[storeName].name = name;
    }
    fileRecordBatch.insert(filerecord);
    mediaArr.push({
      "metadata" : {
        "productId" : productId,
        "variantId" : productId,
        "toGrid" : 1,
        "shopId" : "J8Bhq3uTtdgwZx3rz",
        "priority" : 0,
        "workflow" : "published"
      },
      "thumbnail" : `/assets/files/Media/${filerecord._id}/thumbnail/${name}`,
      "small" : `/assets/files/Media/${filerecord._id}/small/${name}`,
      "medium" : `/assets/files/Media/${filerecord._id}/medium/${name}`,
      "large" : `/assets/files/Media/${filerecord._id}/large/${name}`,
      "image" : `/assets/files/Media/${filerecord._id}/image/${name}`
    });
  }
}

async function addImage() {
  // file._id = chunk.files_id = copies.store.key in string
  const storeBatch = {}
  let catalogBatch = Catalog.initializeUnorderedBulkOp({useLegacyOps: true});
  Object.keys(storeDbs).forEach((key) => {
    storeBatch[key] = {
      files: storeDbs[key].files.initializeUnorderedBulkOp({ useLegacyOps: true }),
      chunks: storeDbs[key].chunks.initializeUnorderedBulkOp({ useLegacyOps: true })
    };
  });
  let fileRecordBatch = Media.initializeUnorderedBulkOp({ useLegacyOps: true });
  let count = 0;
  const products = Object.keys(optionsMap);
  for (let k = 0; k < products.length; k++) {
    const options = optionsMap[products[k]];
    const mediaArr = [];
    await addPrimaryImage(products[k], fileRecordBatch, mediaArr, storeBatch);
    for (let j = 0; j < options.length; j++) {
      const option = options[j];
      for (let i = 0; i < settings.IPS; i++) {
        count++;
        const name = `${randomID(10, "aA0")}.jpg`;
        const filerecord = _.cloneDeep(filerecordTemplate);
        filerecord._id = randomID(10, "aA0");
        filerecord.original.name = name;
        filerecord.metadata.productId = products[k];
        filerecord.metadata.variantId = option._id;
        const imageIndex = Math.floor(Math.random() * 20);
        for (const store of stores) {
          const storeName = store.name;
          const ID = ObjectID();
          const filesTemplate = _.cloneDeep(copiesTemplate[storeName].files);
          const chunksTemplate = {
            n: 0
          }
          filesTemplate._id = ID;
          chunksTemplate.files_id = ID;
          // const imageData = await createImage(storeName);
          // chunksTemplate.data = Binary(imageData);
          chunksTemplate.data = images.getImage(storeName, imageIndex);
          storeBatch[storeName].files.insert(filesTemplate);
          storeBatch[storeName].chunks.insert(chunksTemplate);
          filerecord.copies[storeName].key = ID.toString();
          filerecord.copies[storeName].name = name;
        }
        fileRecordBatch.insert(filerecord);
        mediaArr.push({
          "metadata" : {
            "productId" : products[k],
            "variantId" : option._id,
            "toGrid" : 1,
            "shopId" : "J8Bhq3uTtdgwZx3rz",
            "priority" : 0,
            "workflow" : "published"
          },
          "thumbnail" : `/assets/files/Media/${filerecord._id}/thumbnail/${name}`,
          "small" : `/assets/files/Media/${filerecord._id}/small/${name}`,
          "medium" : `/assets/files/Media/${filerecord._id}/medium/${name}`,
          "large" : `/assets/files/Media/${filerecord._id}/large/${name}`,
          "image" : `/assets/files/Media/${filerecord._id}/image/${name}`
        });
      }
    }
    catalogBatch.find({ _id: products[k] }).updateOne({ $set: { media: mediaArr } });
    if (count >= settings.imageBatchSize) {
      console.log(workerId, "Saving images", k, "of", products.length);
      const conversionsArr = []
      Object.keys(storeBatch).forEach((key) => {
        conversionsArr.push(storeBatch[key].files.execute());
        conversionsArr.push(storeBatch[key].chunks.execute());
      });
      await Promise.all([ fileRecordBatch.execute(), ...conversionsArr, catalogBatch.execute() ]);
      count = 0;
      fileRecordBatch = Media.initializeUnorderedBulkOp({ useLegacyOps: true });
      Object.keys(storeBatch).forEach((key) => {
        storeBatch[key].files = storeDbs[key].files.initializeUnorderedBulkOp({ useLegacyOps: true });
        storeBatch[key].chunks = storeDbs[key].chunks.initializeUnorderedBulkOp({ useLegacyOps: true });
      });
      catalogBatch = Catalog.initializeUnorderedBulkOp({useLegacyOps: true});
    }
  }
  const conversionsArr = []
  Object.keys(storeBatch).forEach((key) => {
    conversionsArr.push(storeBatch[key].files.execute());
    conversionsArr.push(storeBatch[key].chunks.execute());
  });
  return Promise.all([ fileRecordBatch.execute(), ...conversionsArr, catalogBatch.execute() ]);
}

async function addTags() {
  let numOfTags = settings.tags;
  const linkedTagsRatio = 0.2;
  const topLevelRatio = 0.1;
  let batch = Tags.initializeUnorderedBulkOp({useLegacyOps: true});
  for (let i = 0; i < numOfTags; i++) {
    const data = _.cloneDeep(tagTemplate);
    data._id = randomID(10, "aA0");
    data.name = `${faker.commerce.department()}-${randomID(4, 'aA0')}`;
    data.slug = slugify(data.name);
    data.createdAt = new Date();
    data.updatedAt = new Date();
    if (i === Math.round(numOfTags * topLevelRatio)) {
      data.isTopLevel = true
      tags.push(data._id);
    }
    batch.insert(data);
  }
  await batch.execute();
  batch = Tags.initializeUnorderedBulkOp({useLegacyOps: true});
  const linkedTags = numOfTags * linkedTagsRatio;
  for (let i = 0; i < linkedTags; i++) {
    const currentTag = tags[Math.floor(Math.random() * tags.length)]
    const start = Math.floor(Math.random() * tags.length);
    const len = Math.floor(Math.random() * 5);
    const end = (start + len) > tags.length ? tags.length : (start + len)
    const tagsToLink = tags.slice(start, end);
    batch.find({ _id: currentTag }).updateOne({ $set: { groups: tagsToLink }});
  }
  return batch.execute();
}

async function addUsers() {
  const numOfUsers = settings.orders || 1000;
  let userBatch = Users.initializeUnorderedBulkOp({ useLegacyOps: true });
  let accountBatch = Accounts.initializeUnorderedBulkOp({ useLegacyOps: true });

  for (let i = 1; i <= numOfUsers; i++) {
    const user = _.cloneDeep(userTemplate);
    const name = `user-${workerId}-${i}`;
    const email = `${name}@reactioncommerce.com`;
    user._id = randomID(12, "aA0");
    user.createdAt = new Date();
    user.updatedAt = user.createdAt;
    user.emails[0].address = email;
    user.name = name;
    userBatch.insert(user);
  
    const account = _.cloneDeep(accountTemplate);
    account._id = user._id;
    account.userId = user._id;
    account.createdAt = user.createdAt;
    account.updatedAt = user.updatedAt;
    account.name = name;
    account.profile.addressBook[0].fullName = name;
    account.profile.addressBook[0]._id = randomID(20, "aA0");
    account.emails[0].address = email;
    accountBatch.insert(account);

    if (i % 10000 === 0) {
      console.log(workerId, "User Status", i, "/", numOfOrders);
      await Promise.all([userBatch.execute(), accountBatch.execute()]);
      userBatch = Users.initializeUnorderedBulkOp({ useLegacyOps: true });
      accountBatch = Accounts.initializeUnorderedBulkOp({ useLegacyOps: true });
    }
  }
  return Promise.all([userBatch.execute(), accountBatch.execute()]);
}

/**
* @method addOrder
* @summary Add a randomized order from a template
* @returns {object} order - The order object
*/
function addOrder() {
 const order = _.cloneDeep(orderTemplate);
 order._id = randomID(10, "aA0");
 const currentDate = new Date();
 const yrOldDate = new Date();
 yrOldDate.setYear(yrOldDate.getFullYear() - settings.duration);
 order.createdAt = faker.date.between(yrOldDate, new Date());
 order.email = faker.internet.email();
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


function addDiscounts() {
  const discountBatch = Discounts.initializeUnorderedBulkOp({ useLegacyOps: true });
  for (let i = 0; i < settings.discounts; i++) {
    const discount = _.cloneDeep(discountTemplate);
    discount._id = randomID(20, "aA0");
    discount.code = `${discount.code}-${workerId}-${i}`;
    discount.discount = (100.0 / settings.discounts) * (i + 1)
    discountBatch.insert(discount);
  }
  return discountBatch.execute();
}

async function addOrders() {
  const numOfOrders = settings.orders || 1000;
  let batch = Orders.initializeUnorderedBulkOp({ useLegacyOps: true });
  for (let i = 1; i <= numOfOrders; i++) {
    batch.insert(addOrder());
    if (i % 10000 === 0) {
      console.log(workerId, "Order Status", i, "done out of", numOfOrders);
      await batch.execute();
      batch = Orders.initializeUnorderedBulkOp({ useLegacyOps: true });
    }
  }
  return batch.execute();
}

/**
 * @method loadDataset
 * @summary load products generated from a template
 * @param {number} [numProducts=1000] The number of products to load
 */
export async function loadDataset() {
  console.log("########## loadDataset ##########");
  const products = [];
  console.log("Setting of this process", settings);
  let batch = Products.initializeUnorderedBulkOp({useLegacyOps: true});
  let catalogBatch = Catalog.initializeUnorderedBulkOp({useLegacyOps: true});
  let s = now();
  let start = now();
  let count = 0;
  const promiseArr = []
  const batchSize = 3;
  console.log("Starting Tags, Orders");
  await Promise.all([addTags(), addDiscounts()]);
  console.log("Finished Tags, Orders in", now() - s)
  s = now() 
  console.log("Started making products promise");
  for (let x = 1; x <= settings.products; x += 1) {
    addProduct(batch, catalogBatch);
    if (x % settings.productBatchSize === 0) {
      console.log(workerId, "Indexting products", x, "of", settings.products);
      await Promise.all([batch.execute(), catalogBatch.execute()]);
      batch = Products.initializeUnorderedBulkOp({useLegacyOps: true});
      catalogBatch = Catalog.initializeUnorderedBulkOp({useLegacyOps: true});
    }
  }
  try {
    await Promise.all([batch.execute(), catalogBatch.execute()]);
  } catch (err) {
  }
  console.log("Time to index products =", now() - s);
  await [addOrders(), addUsers()];
  // const products = Products.find({ type: "variant", ancestors: { $size: 2 } }, { _id: 1, ancestors: 1 });
  s = now();
  console.log("Adding images");
  await addImage();
  console.log("Time to index images =", now() - s);
  console.log("****************** Total time = ", now() - start, "*********************")
}

/**
 * @method resetData
 * @summary Clear out data, bypassing revision control when necessary
 * @returns {undefined}
 */
export async function resetData() {
  // delete existing data
  await Tags.remove({});
  await Products.remove({});
  await Catalog.remove({});
  await Discounts.remove({});
  await ProductSearch.remove({});
  await OrderSearch.remove({});
  await Orders.remove({});
  await Users.remove({ "roles.J8Bhq3uTtdgwZx3rz" : { $ne: "admin"} });
  await Accounts.remove({ "emails.0.address": { $ne: "admin@localhost" } });
  await resetMedia();
  console.log("Reset done");
};
