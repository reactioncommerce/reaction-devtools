# reaction-devtools

This is a plugin that creates a new dashboard panel that allows you to load datasets for testing. All the data generated is random(except for `sample-data`).
The progress of loading can be checked on server cosole. You will have to refresh the page after loading of data to see the new products.

Data can be laoded in the following ways:

### Sample dataset
To load this dataset use the `Load Sample Data` button. It loads `products: 7 (+ variants and options), orders: 100` from `reaction-swag-shop`

### Predefined dataset
To load one of these, press the button corresponding to the dataset you want to laod, it will automatically fill the form for you.
Then press the `Load Data` button.
1. Small - `products: 100, orders: 100, tags: 3, IPS: 3, users: 100`
1. Medium - `products: 1000, orders: 10000, tags: 10, IPS: 5, users: 100`
1. Large - `products: 50000, orders: 50000, tags: 100, IPS: 7, users: 100`

To login as user, use email: `user-0-1@reactioncommerce.com`, password: `hello`
To login as admin, use email: `admin@localhost`, password: `r3@cti0n`

**Note** Loading the "Large" dataset on a local dev box is discouraged, since the code is single threaded as of now it takes a lot of time(> 1 hr)

### Custom dataset
Fill the fields and press the `Load data` button.

### To install
1. Clone this repo into `/imports/plugins/custom/`
1. `reaction reset`
1. `reaction`
