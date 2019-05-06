/**
 * This script takes the Products json array, and finds any option without a variant parent and then matches to the correct variant parent.
 */
const jsonProducts = require("/Users/steven.rowney/dev/reaktor/reaction-meteor/imports/plugins/custom/reaktor-devtools/sample-data/data/levelkids/Products.json");

const products = jsonProducts
  .filter((product) => product.type === "simple");

const variants = jsonProducts
  .filter((variant) => variant.type === "variant" && variant.ancestors.length === 1);

const options = jsonProducts
  .filter((option) => option.type === "variant" && option.ancestors.length > 1);

console.log(`Number of products ${products.length}\nNumber of variants ${variants.length}\nNumber of options ${options.length}`);

const orphanedOptions = options
  .filter((option) => !variants.map((variant) => variant._id).includes(option.ancestors[1])); // its always the second element in the array (luckily)

console.log(`Number of orphaned options ${orphanedOptions.length}`);

const optionsWithParents = options
  .filter((option) => variants.map((variant) => variant._id).includes(option.ancestors[1])); // its always the second element in the array

console.log(`Number of options with parents ${optionsWithParents.length}`);

const updatedOrphans = orphanedOptions.map((option) => {
  const optionProduct = option.ancestors[0];

  const matchedVariant = optionsWithParents.find((option) => option.ancestors[0] === optionProduct);
  const matchedOptionId = matchedVariant.ancestors[1];

  option.ancestors = [optionProduct, matchedOptionId];
  return option;
});

const updatedOrphantsStillBroken = updatedOrphans
  .filter((option) => !variants.map((variant) => variant._id).includes(option.ancestors[1])); // its always the second element in the array (luckily)

console.log(`Number of orphaned options after transformation ${updatedOrphantsStillBroken.length}`);

const newProducts = [];
newProducts.push(updatedOrphans, optionsWithParents, variants, products);

// write to new file

const callback = () => console.log("Writing complete");

const fs = require("fs");

fs.writeFile("/Users/steven.rowney/dev/reaktor/reaction-meteor/imports/plugins/custom/reaktor-devtools/sample-data/data/levelkids/ProductsFixed.json", JSON.stringify(newProducts), "utf8", callback);
