# reaction-devtools

This is a plugin that creates a new dashboard panel that allows you to load datasets for testing

You have a choice of three different datasets and optionally attach random images:

1. Small - 7 products (+ variants and options), 100 orders
1. Medium - 1000 products (+ variants and options), 10,000 orders
1. Large - 50,000 products (+ variants and options), 50,000 orders

**Note** Loading the "Large" dataset on a local dev box is discouraged

### To install

1. Clone this repo into `/import/plugins/custom/`
1. `meteor npm install jpeg-js` (for random image generation)
1. `reaction reset`

