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
  billing: [
    {
      paymentMethod: {
        processor: "Example",
        paymentPackageId: "xEiA2uER9fheyCi4v",
        paymentSettingsKey: "example-paymentmethod",
        storedCard: "Visa 4242",
        method: "credit",
        transactionId: "jLQ5nbTbJYPA7H2aw",
        riskLevel: "normal",
        currency: "USD",
        amount: 15.98,
        status: "created",
        mode: "authorize",
        transactions: [
          {
            amount: 15.98,
            transactionId: "jLQ5nbTbJYPA7H2aw",
            currency: "USD"
          }
        ],
        workflow: {
          status: "new"
        }
      },
      invoice: {
        shipping: 2.99,
        subtotal: 12.99,
        taxes: 0,
        discounts: 0,
        total: 15.98
      },
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
      shopId: "J8Bhq3uTtdgwZx3rz",
      _id: "CPgv7L9bH9wXFEGTT",
      currency: {
        userCurrency: "USD",
        exchangeRate: 1
      }
    }
  ],
  discount: 0,
  tax: 0,
  items: [
    {
      _id: "5DipCF2Nvdb4tLzsi",
      shopId: "J8Bhq3uTtdgwZx3rz",
      productId: "BCTMZ6HTxFSppJESk",
      quantity: 1,
      product: {
        _id: "BCTMZ6HTxFSppJESk",
        title: "Basic Reaction Product",
        shopId: "J8Bhq3uTtdgwZx3rz",
        ancestors: [],
        description: "Sign in as administrator to edit.",
        handle: "example-product",
        hashtags: [
          "rpjCvTBGjhBi2xdro",
          "cseCBSSrJ3t8HQSNP"
        ],
        price: {
          range: "12.99 - 19.99",
          min: 12.99,
          max: 19.99
        },
        isVisible: true,
        isLowQuantity: false,
        isSoldOut: false,
        isBackorder: false,
        metafields: [
          {
            key: "Material",
            value: "Cotton"
          },
          {
            key: "Quality",
            value: "Excellent"
          }
        ],
        pageTitle: "This is a basic product. You can do a lot with it.",
        type: "simple",
        vendor: "Example Manufacturer",
        originCountry: "US",
        requiresShipping: true,
        isDeleted: false,
        template: "productDetailSimple",
        workflow: {
          status: "new"
        }
      },
      variants: {
        _id: "CJoRBm9vRrorc9mxZ",
        title: "Option 2 - Green Tomato",
        ancestors: [
          "BCTMZ6HTxFSppJESk",
          "6qiqPwBkeJdtdQc4G"
        ],
        optionTitle: "Green",
        price: 12.99,
        inventoryManagement: true,
        inventoryPolicy: true,
        inventoryQuantity: 42,
        isVisible: true,
        weight: 25,
        length: 10,
        height: 3,
        width: 10,
        metafields: [
          {
            key: null,
            value: null
          }
        ],
        shopId: "J8Bhq3uTtdgwZx3rz",
        taxable: true,
        type: "variant",
        isDeleted: false,
        compareAtPrice: 0,
        lowInventoryWarningThreshold: 0,
        taxCode: "0000",
        originCountry: "US",
        workflow: {
          status: "new"
        }
      },
      title: "Basic Reaction Product",
      type: "simple",
      parcel: {
        weight: 25,
        height: 3,
        width: 10,
        length: 10
      },
      shippingMethod: {
        shopId: "J8Bhq3uTtdgwZx3rz",
        shipmentQuotes: [
          {
            carrier: "Flat Rate",
            method: {
              name: "Standard",
              label: "Standard",
              group: "Ground",
              handling: 0,
              rate: 2.99,
              enabled: true,
              _id: "ppsATnw3f4r4ARHvu",
              carrier: "Flat Rate"
            },
            rate: 2.99,
            shopId: "J8Bhq3uTtdgwZx3rz"
          }
        ],
        shipmentQuotesQueryStatus: {
          requestStatus: "success",
          numOfShippingMethodsFound: 1
        },
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
          enabled: true,
          _id: "ppsATnw3f4r4ARHvu",
          carrier: "Flat Rate",
          currencyCode: "USD"
        },
        paymentId: "CPgv7L9bH9wXFEGTT",
        items: [
          {
            _id: "5DipCF2Nvdb4tLzsi",
            productId: "BCTMZ6HTxFSppJESk",
            shopId: "J8Bhq3uTtdgwZx3rz",
            variantId: "CJoRBm9vRrorc9mxZ"
          }
        ],
        workflow: {
          status: "new",
          workflow: [
            "coreOrderWorkflow/notStarted"
          ]
        }
      },
      workflow: {
        status: "new",
        workflow: [
          "coreOrderWorkflow/created"
        ]
      },
      addedAt: new Date(),
      createdAt: new Date(),
      isTaxable: true,
      optionTitle: "Green",
      priceWhenAdded: {
        amount: 12.99,
        currencyCode: "USD"
      },
      productSlug: "example-product",
      productType: "simple",
      productVendor: "Example Manufacturer",
      taxCode: "0000",
      updatedAt: new Date(),
      variantId: "CJoRBm9vRrorc9mxZ",
      variantTitle: "Option 2 - Green Tomato",
    }
  ],
  shipping: [
    {
      shopId: "J8Bhq3uTtdgwZx3rz",
      shipmentQuotes: [
        {
          carrier: "Flat Rate",
          method: {
            name: "Standard",
            label: "Standard",
            group: "Ground",
            handling: 0,
            rate: 2.99,
            enabled: true,
            _id: "ppsATnw3f4r4ARHvu",
            carrier: "Flat Rate"
          },
          rate: 2.99,
          shopId: "J8Bhq3uTtdgwZx3rz"
        }
      ],
      shipmentQuotesQueryStatus: {
        requestStatus: "success",
        numOfShippingMethodsFound: 1
      },
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
        enabled: true,
        _id: "ppsATnw3f4r4ARHvu",
        carrier: "Flat Rate"
      },
      paymentId: "CPgv7L9bH9wXFEGTT",
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
