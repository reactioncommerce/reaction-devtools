export const productTemplate = {
  type: "simple",
  ancestors: [],
  shopId: "J8Bhq3uTtdgwZx3rz",
  originCountry: "US",
  requiresShipping: true,
  isDeleted: false,
  isVisible: true,
  price: {
    range: "12 - 24",
    min: 12,
    max: 24
  },
  template: "productDetailSimple",
  workflow: {
    status: "new"
  },
  isLowQuantity: false,
  isSoldOut: false,
  isBackorder: false,
  positions: {
    "reaction swag shop": {
      weight: 1
    }
  },
  hashtags: []
};

export const variantTemplate = {
  ancestors: [],
  price: 0,
  type: "variant",
  isVisible: true,
  isDeleted: false,
  compareAtPrice: 0,
  weight: 0,
  length: 0,
  width: 0,
  height: 0,
  inventoryManagement: true,
  inventoryPolicy: false,
  lowInventoryWarningThreshold: 0,
  inventoryQuantity: 0,
  shopId: "J8Bhq3uTtdgwZx3rz",
  taxable: true,
  taxCode: "0000",
  title: "Bag",
  optionTitle: "Untitled Option",
  originCountry: "US",
  workflow: {
    status: "new"
  }
};

export const optionTemplate = {
  ancestors: [],
  type: "variant",
  title: "One pound bag",
  price: 12,
  isVisible: true,
  isDeleted: false,
  compareAtPrice: 15,
  weight: 2,
  length: 2,
  width: 2,
  height: 2,
  inventoryManagement: true,
  inventoryPolicy: true,
  lowInventoryWarningThreshold: 0,
  inventoryQuantity: 1000,
  shopId: "J8Bhq3uTtdgwZx3rz",
  taxable: true,
  taxCode: "0000",
  originCountry: "US",
  workflow: {
    status: "new"
  }
};
