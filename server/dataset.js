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

export const orderTemplate = {
  sessionId: "SjtGZesckPtxRf755",
  userId: "qoSQCkbnHayhf49xc",
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
          carrier: "Flat Rate"
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
      }
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
    }
  ],
  cartId: "PWwEqTRebvLQew94w",
  email: "brent@reactioncommerce.com"
};

export const tagTemplate = {
	"_id": "cseCBSSrJ3t8HQSNP",
	"name": "Apparel",
	"slug": "apparel",
	"isTopLevel": false,
  "shopId": "J8Bhq3uTtdgwZx3rz",
	"isDeleted": false,
	"isVisible": true,
	"groups": []
}

export const filerecordTemplate = {
  "_id" : "3JoatDkgzQciP3FvkS7H",
  "original" : {
      "name" : "eV0hnPMVsG.jpg",
      "size" : 2435,
      "type" : "image/jpeg",
  },
  "metadata" : {
      "productId" : "y035nZZk38",
      "variantId" : "eV0hnPMVsG",
      "toGrid" : 1,
      "shopId" : "J8Bhq3uTtdgwZx3rz",
      "priority" : 0,
      "workflow" : "published"
  },
  "copies" : {
      "image" : {
          "name" : "eV0hnPMVsG.jpg",
          "type" : "image/jpeg",
          "key" : "5ad9bb3212c01ca6c65f7011",
          "storageAdapter" : "gridfs",
          "size" : 2435,
      },
      "large" : {
          "name" : "eV0hnPMVsG.jpg",
          "type" : "image/jpeg",
          "key" : "5ad9bb3212c01ca6c65f7012",
          "storageAdapter" : "gridfs",
          "size" : 2435,
      },
      "medium" : {
          "name" : "eV0hnPMVsG.jpg",
          "type" : "image/jpeg",
          "key" : "5ad9bb3212c01ca6c65f7013",
          "storageAdapter" : "gridfs",
          "size" : 2435,
      },
      "small" : {
          "name" : "eV0hnPMVsG.jpg",
          "type" : "image/jpeg",
          "key" : "5ad9bb3212c01ca6c65f7014",
          "storageAdapter" : "gridfs",
          "size" : 539,
      },
      "thumbnail" : {
          "name" : "eV0hnPMVsG.jpg",
          "type" : "image/jpeg",
          "key" : "5ad9bb3212c01ca6c65f7015",
          "storageAdapter" : "gridfs",
          "size" : 241,
      }
  }
}

export const copiesTemplate = {
  image: {
    files: {
      "filename" : "eV0hnPMVsG.jpg",
      "contentType" : "image/jpeg",
      "length" : 2435,
      "chunkSize" : 1048576,
      "aliases" : null,
      "metadata" : null,
      "md5" : "cbb998b516f0a15daa9dc27e39e2c171"
    },
    chunks: {
      "n" : 0,
      "data" : { "$binary" : "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAJYAlgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAYH/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmAmWvgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=", "$type" : "00" }
    }
  },
  large: {
    files: {
      "filename" : "eV0hnPMVsG.jpg",
      "contentType" : "image/jpeg",
      "length" : 2435,
      "chunkSize" : 1048576,
      "aliases" : null,
      "metadata" : null,
      "md5" : "cbb998b516f0a15daa9dc27e39e2c171"
    },
    chunks: {
      "n" : 0,
      "data" : { "$binary" : "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAJYAlgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAYH/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmAmWvgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=", "$type" : "00" }
    }
  },
  medium: {
    files: {
      "filename" : "eV0hnPMVsG.jpg",
      "contentType" : "image/jpeg",
      "length" : 2435,
      "chunkSize" : 1048576,
      "aliases" : null,
      "metadata" : null,
      "md5" : "cbb998b516f0a15daa9dc27e39e2c171"
    },
    chunks: {
      "n" : 0,
      "data" : { "$binary" : "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAJYAlgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAYH/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmAmWvgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=", "$type" : "00" }
    }
  },
  small: {
    files: {
      "filename" : "eV0hnPMVsG.jpg",
      "contentType" : "image/jpeg",
      "length" : 539,
      "chunkSize" : 1048576,
      "aliases" : null,
      "metadata" : null,
      "md5" : "a1faf437497b5209a62d6a4fe6856a36"
    },
    chunks: {
      "n" : 0,
      "data" : { "$binary" : "iVBORw0KGgoAAAANSUhEUgAAAOsAAADrCAIAAAAHaPaCAAAACXBIWXMAAAPoAAAD6AG1e1JrAAABzUlEQVR42u3SQQkAAAgEwevm2/49TGAKH8LAJFg20wV/RQIcDA4GB+NgcDA4GByMg8HB4GBwMA4GB4ODwcE4GBwMDsbBKuBgcDA4GAeDg8HB4GAcDA4GB4ODcTA4GBwMDsbB4GBwMA4GB4ODwcE4GBwMDgYH42BwMDgYHIyDwcHgYHAwDgYHg4NxMDgYHAwOxsHgYHAwOBgHg4PBweBgHAwOBgeDg3EwOBgcjIPBweBgcDAOBgeDg8HBOBgcDA4GB+NgcDA4GByMg8HB4GAcDA4GB4ODcTA4GBwMDsbB4GBwMDgYB4ODwcHgYBwMDgYH42BwMDgYHIyDwcHgYHAwDgYHg4PBwTgYHAwOxsES4GBwMDgYB4ODwcHgYBwMDgYHg4NxMDgYHAwOxsHgYHAwDlYBB4ODwcE4GBwMDgYH42BwMDgYHIyDwcHgYHAwDgYHg4NxMDgYHAwOxsHgYHAwOBgHg4PBweBgHAwOBgeDg3EwOBgcjIPBweBgcDAOBgeDg8HBOBgcDA4GB+NgcDA4GByMg8HB4GAcDA4GB4ODcTA4GBwMDsbB4GBwMDgYB4ODwcHgYBwMDgYH42BwMDgYHIyDwcHgYHAwDgYHw4EFizBX/mnym6QAAAAASUVORK5CYII=", "$type" : "00" }
    }
  },
  thumbnail: {
    files: {
      "filename" : "eV0hnPMVsG.jpg",
      "contentType" : "image/jpeg",
      "length" : 241,
      "chunkSize" : 1048576,
      "aliases" : null,
      "metadata" : null,
      "md5" : "9108019e4647793476c102fc8d380cf3"
    },
    chunks: {
      "n" : 0,
      "data" : { "$binary" : "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAo0lEQVR42u3QMQ0AAAgDsHnjxr8PFGCBj6dJFTTTxVEUyJIlS5YsWQpkyZIlS5YsBbJkyZIlS5YCWbJkyZIlS4EsWbJkyZKlQJYsWbJkyVIgS5YsWbJkKZAlS5YsWbIUyJIlS5YsWQpkyZIlS5YsBbJkyZIlS5YCWbJkyZIlS4EsWbJkyZKlQJYsWbJkyVIgS5YsWbJkKZAlS5YsWbIUyJL1bQHvYumH7v82fwAAAABJRU5ErkJggg==", "$type" : "00" }
    }
  }
}

/*
file._id = chunk.files_id = copies.store.key
*/