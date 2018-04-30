import faker from "faker";
import sharp from "sharp";
import now from "performance-now";
import _ from "lodash";
import slugify from "slugify";
var fs = require("fs");
import randomID from "random-id";
import { MongoClient, ObjectID, Binary } from 'mongodb';
import { productTemplate, variantTemplate, optionTemplate, orderTemplate, filerecordTemplate, copiesTemplate, tagTemplate, metadata } from "./dataset";

let Tags, Catalog, Products, ProductSearch, OrderSearch, Orders, Media, workerId = 0;
let settings = {};
const storeDbs = {};
let stores = null;
let db = null;
let data;
let mediaBatch;
let mediaBatchLength = 0;
let tags = [];
const imagesPromise = [];
const conversionPromises = [];
const options = [];
let cachedImages = {};
let binaryCachedImages = {};

async function cacheImages() {
    console.log("Caching conversions");
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    cachedImages.image = await sharp({
        create: {
            width: 600,
            height: 600,
            channels: 3,
            background: { r, g, b }
        }
        })
        .jpeg()
        .toBuffer();
    cachedImages.large = cachedImages.image;
    cachedImages.medium = cachedImages.image;
    cachedImages.small = await sharp({
        create: {
            width: 235,
            height: 235,
            channels: 3,
            background: { r, g, b }
        }
        })
        .png()
        .toBuffer();
    cachedImages.thumbnail = await sharp({
        create: {
            width: 100,
            height: 100,
            channels: 3,
            background: { r, g, b }
        }
        })
        .png()
        .toBuffer();
    Object.keys(cachedImages).forEach((key) => {
      binaryCachedImages[key] = Binary(cachedImages[key]);
    });
        
}

export async function init(id, sett) {
  // console.log("********** init ***********");
  workerId = id;
  const url = 'mongodb://localhost:3001/';
  const dbName = 'meteor';
  const client = await MongoClient.connect(url);
  db = client.db(dbName);
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
  Media = db.collection("cfs.Media.filerecord");
  // await new Promise((resolve, reject) => {
  //   fs.readFile('/Users/akarshitwal/Documents/reaction-devtools/server/image.jpg', (err, d) => {
  //     // Encode to base64
  //     var encodedImage = new Buffer(d, 'binary').toString('base64');
  //     data = encodedImage;
  //     resolve(encodedImage);
  //   });
  // });
  for (const store of stores) {
    storeDbs[store.name] = {
      files: db.collection(`cfs_gridfs.${store.name}.files`),
      chunks: db.collection(`cfs_gridfs.${store.name}.chunks`)
    } 
  };
  mediaBatch = Media.initializeUnorderedBulkOp({useLegacyOps: true})
  await cacheImages();
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
 * @method generateImage
 * @summary Generates an random colored image with specified width, height and quality
 * @param {number} width - width of the image
 * @param {number} height - height of the image
 * @param {number} quality - quality of the image
 * @param {function} callback - callback
 */
async function createImage(storeName) {
  const caching = true;
  console.log("Store name is ", storeName);
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  if (caching) {
    if (storeName === "small") {
      return await sharp({
        create: {
            width: 235,
            height: 235,
            channels: 3,
            background: { r, g, b }
        }
        })
        .png()
        .toBuffer();
    }
    if (storeName === "thumbnail") {
      await sharp({
        create: {
            width: 100,
            height: 100,
            channels: 3,
            background: { r, g, b }
        }
        })
        .png()
        .toBuffer();
      
    }
    return await sharp({
      create: {
          width: 600,
          height: 600,
          channels: 3,
          background: { r, g, b }
      }
      })
      .jpeg()
      .toBuffer();
  }
  return cachedImages[storeName];
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
  product.metadata = metadata[settings.attributes];
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
  for (let x = 0; x < numOptions; x += 1) {
    const option = _.cloneDeep(optionTemplate);
    const optionId = randomID(10, "aA0");
    option._id = optionId;
    option.optionTitle = faker.commerce.productName();
    option.price = faker.commerce.price();
    optionPrices.push(parseFloat(option.price));
    option.ancestors = [productId, variantId];
    options.push({
      product: {
        _id: optionId,
        type: option.type,
        shopId: option.shopId
      },
      parentId: product._id
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

async function addImage(options) {
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
  for (let j = 0; j < options.length; j++) {
    const option = options[j];
    for (let i = 0; i < settings.IPS; i++) {
      count++;
      const name = `${randomID(10, "aA0")}.jpg`;
      const filerecord = _.cloneDeep(filerecordTemplate);
      filerecord._id = randomID(10, "aA0");
      filerecord.original.name = name;
      filerecord.metadata.productId = option.parentId;
      filerecord.metadata.variantId = option.product._id;
      filerecord.metadata.shopId = option.product.shopId;
      for (const store of stores) {
        const storeName = store.name;
        const ID = ObjectID();
        // console.log(copiesTemplate, storeName);
        const filesTemplate = _.cloneDeep(copiesTemplate[storeName].files);
        const chunksTemplate = {
          n: 0
        }
        filesTemplate._id = ID;
        chunksTemplate.files_id = ID;
        // const imageData = await createImage(storeName);
        // chunksTemplate.data = Binary(imageData);
        chunksTemplate.data = binaryCachedImages[storeName];
        storeBatch[storeName].files.insert(filesTemplate);
        storeBatch[storeName].chunks.insert(chunksTemplate);
        filerecord.copies[storeName].key = ID.toString();
        filerecord.copies[storeName].name = name;
      }
      fileRecordBatch.insert(filerecord);
      console.log(option.parentId);
      catalogBatch.find({ _id: option.parentId }).updateOne({
        $push: {
          media: {
            "metadata" : {
              "productId" : option.parentId,
              "variantId" : option.product._id,
              "toGrid" : 1,
              "shopId" : option.product.shopId,
              "priority" : 0,
              "workflow" : "published"
            },
            "thumbnail" : `/assets/files/Media/${filerecord._id}/thumbnail/${name}.jpg`,
            "small" : `/assets/files/Media/${filerecord._id}/small/${name}.jpg`,
            "medium" : `/assets/files/Media/${filerecord._id}/medium/${name}.jpg`,
            "large" : `/assets/files/Media/${filerecord._id}/large/${name}.jpg`,
            "image" : `/assets/files/Media/${filerecord._id}/image/${name}.jpg`
          }
        }
      });
      if (count === 10000) {
        console.log(workerId, "Saving images", j, "of", options.length);
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


async function addOrders() {
  const numOfOrders = settings.orders || 1000;
  let batch = Orders.initializeUnorderedBulkOp({ useLegacyOps: true });
  for (let i = 0; i < numOfOrders; i++) {
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
  // console.log("Load dataset called", Products);
  let batch = Products.initializeUnorderedBulkOp({useLegacyOps: true});
  let catalogBatch = Catalog.initializeUnorderedBulkOp({useLegacyOps: true});
  let s = now();
  let start = now();
  let count = 0;
  const promiseArr = []
  const batchSize = 3;
  console.log("Starting Tags, Orders");
  await addTags();
  console.log("Finished Tags, Orders in", now() - s)
  s = now() 
  console.log("Started making products promise");
  for (let x = 0; x < settings.products; x += 1) {
    addProduct(batch, catalogBatch);
    if (x % 3000 === 0) {
      console.log(workerId, "Indexting products", x, "of", settings.products);
      await Promise.all([batch.execute(), catalogBatch.execute()]);
      batch = Products.initializeUnorderedBulkOp({useLegacyOps: true});
      catalogBatch = Catalog.initializeUnorderedBulkOp({useLegacyOps: true});
    }
  }
  await Promise.all([batch.execute(), catalogBatch.execute()]);
  console.log("Time to index products =", now() - s);
  await addOrders();
  // const products = Products.find({ type: "variant", ancestors: { $size: 2 } }, { _id: 1, ancestors: 1 });
  s = now();
  await addImage(options);
  // for (const product of options) {
  //   for (var i = 0; i < IPS; i++) {
  //       imagesPromise.push(createProductImage(product.product, product.parentId));
  //   }
  // }
  // await Promise.all(imagesPromise)
  console.log("Time to index images =", now() - s);
  // s = now();
  // console.log("Going to index conversions");
  // mediaBatch.execute();
  // // await Promise.all(conversionPromises);
  // console.log("Time to index conversions =", now() - s);
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
  await ProductSearch.remove({});
  await OrderSearch.remove({});
  await Orders.remove({});
  await resetMedia();
  console.log("Reset done");
};
