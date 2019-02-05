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

export const orderTemplate = {
  accountId: "qoSQCkbnHayhf49xc",
  currencyCode: "USD",
  shopId: "J8Bhq3uTtdgwZx3rz",
  workflow: {
    status: "new",
    workflow: [
      "coreOrderWorkflow/created"
    ]
  },
  shipping: [
    {
      shopId: "J8Bhq3uTtdgwZx3rz",
      _id: "uqxDNgszdbk7TCQoY",
      address: {
        country: "US",
        fullName: "Fake Customer",
        address1: "2110 Main St. Suite 207",
        postal: "90405",
        city: "Santa Monica",
        region: "CA",
        phone: "3236873265",
        isShippingDefault: true,
        isBillingDefault: true,
        isCommercial: false,
        _id: "vxkNHcB5mQ33gFRYP",
        failedValidation: false
      },
      shipmentMethod: {
        name: "Standard",
        label: "Standard",
        group: "Ground",
        handling: 0,
        rate: 2.99,
        _id: "ppsATnw3f4r4ARHvu",
        carrier: "Flat Rate",
        currencyCode: "USD"
      },
      payment: {
        _id: "CPgv7L9bH9wXFEGTT",
        displayName: "Visa 4242",
        amount: 15.98,
        invoice: {
          shipping: 2.99,
          subtotal: 12.99,
          taxes: 0,
          discounts: 0,
          total: 15.98
        },
        method: "credit",
        mode: "authorize",
        paymentPluginName: "example-paymentmethod",
        processor: "Example",
        status: "created",
        shopId: "J8Bhq3uTtdgwZx3rz"
      },
      items: [
        {
          _id: "5DipCF2Nvdb4tLzsi",
          productId: "BCTMZ6HTxFSppJESk",
          shopId: "J8Bhq3uTtdgwZx3rz",
          variantId: "CJoRBm9vRrorc9mxZ",
          createdAt: new Date(),
          addedAt: new Date(),
          updatedAt: new Date(),
          price: {
            amount: 12.99,
            currencyCode: "USD"
          },
          quantity: 1,
          subtotal: 12.99,
          title: "Option 2 - Green Tomato"
        }
      ],
      itemIds: [ "5DipCF2Nvdb4tLzsi" ],
      workflow: {
        status: "new",
        workflow: [
          "coreOrderWorkflow/notStarted"
        ]
      }
    }
  ],
  cartId: "PWwEqTRebvLQew94w",
  email: "brent@reactioncommerce.com"
};
