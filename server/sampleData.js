import { Buffer } from "buffer";
import _ from "lodash";
import bufferStreamReader from "buffer-stream-reader";
import { FileRecord } from "@reactioncommerce/file-collections";
import { Job } from "/imports/plugins/core/job-collection/lib";
import { Products, Tags, Jobs, MediaRecords } from "/lib/collections";
import { Media } from "/imports/plugins/core/files/server";
import { Logger } from "/server/api";
import collections from "/imports/collections/rawCollections";
import publishProductToCatalogById from "/imports/plugins/core/catalog/server/no-meteor/utils/publishProductToCatalogById";

/**
 * @method loadSmallProducts
 * @summary load products from the "small" dataset
 * @return {undefined}
 */
function loadSmallProducts() {
  Logger.info("Starting load Products");
  const products = require("/imports/plugins/custom/reaction-devtools/sample-data/Products.json");
  products.forEach((product) => {
    product.createdAt = new Date();
    product.updatedAt = new Date();
    Products.insert(product, {}, { publish: true });
  });
  Promise.await(attachProductImages());
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
  const tags = require("/imports/plugins/custom/reaction-devtools/sample-data/Tags.json");
  tags.forEach((tag) => {
    tag.updatedAt = new Date();
    Tags.insert(tag);
  });
  Logger.info("Tags loaded");
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
  const parent = Products.findOne({ _id: { $in: variant.ancestors }, type: "simple" });
  return parent;
}


async function storeFromAttachedBuffer(fileRecord) {
  const { stores } = fileRecord.collection.options;
  const bufferData = fileRecord.data;

  // We do these in series to avoid issues with multiple streams reading
  // from the temp store at the same time.
  try {
    for (const store of stores) {
      if (fileRecord.hasStored(store.name)) {
        return Promise.resolve();
      }

      // Make a new read stream in each loop because you can only read once
      const readStream = new bufferStreamReader(bufferData);
      const writeStream = await store.createWriteStream(fileRecord);
      await new Promise((resolve, reject) => {
        fileRecord.once("error", reject);
        fileRecord.once("stored", resolve);
        readStream.pipe(writeStream);
      });
    }
  } catch (error) {
    throw new Error("Error in storeFromAttachedBuffer:", error);
  }
}

/**
 * @method loadSwagShopProductImage
 * @summary Load swag shop product image
 * @param {object} product - the product to attach an image to
 * @returns {object} fileObj - the file object that's been created
 */
function loadSwagShopProductImage(product) {
  const filepath = `plugins/reaction-devtools/images/${product._id}.jpg`;
  try {
    const binary = Assets.getBinary(filepath);
    const buffer = new Buffer(binary);
    const fileName = `${product._id}.jpg`;
    const fileRecord = new FileRecord({
      original: {
        name: fileName,
        size: buffer.length,
        type: "image/jpeg",
        updatedAt: new Date()
      }
    });
    fileRecord.attachData(buffer);
    const { shopId } = product;
    if (product.type === "simple") {
      const topVariant = getTopVariant(product._id);
      fileRecord.metadata = {
        productId: product._id,
        variantId: topVariant._id,
        toGrid: 1,
        shopId,
        priority: 0,
        workflow: "published"
      };
    } else {
      const parent = getPrimaryProduct(product);
      fileRecord.metadata = {
        productId: parent._id,
        variantId: product._id,
        toGrid: 1,
        shopId,
        priority: 0,
        workflow: "published"
      };
    }

    Promise.await(Media.insert(fileRecord));
    Promise.await(storeFromAttachedBuffer(fileRecord));
  } catch (e) {
    return; // When image is not found, do nothing
  }
}

/**
 * @method attachProductImages
 * @summary Generate an image and attach it to every product
 * @returns {undefined}
 */
function attachProductImages() {
  Logger.info("Started loading product images");
  const products = Products.find({}).fetch();
  const productIds = products.map(({ _id }) => _id);
  const media = MediaRecords.find({ "metadata.productId": { $in: productIds } }).fetch();
  const productIdsWithMedia = _.uniq(media.map((doc) => doc.metadata.productId));
  const imagesAdded = [];
  for (const product of products) {
    // include top level products and options but not top-level variants
    if (!productIdsWithMedia.includes(product._id && product.ancestors.length > 1)) {
      Promise.await(loadSwagShopProductImage(product));
      imagesAdded.push(product._id);
    }
    if (product.type === "simple" && product.isVisible) {
      publishProductToCatalogById(product._id, collections);
    }
  }
  Logger.info("loaded product images");
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
 * @method kickoffOrderSearchRebuild
 * @summary Drop a job to rebuilt the order search into the queue
 * @returns {undefined}
 */
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

export function loadSampleData() {
  loadSmallProducts();
  loadSmallTags();
}
