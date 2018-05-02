// import { MongoClient } from 'mongodb';
// import test from 'assert';
const cluster = require('cluster');
import now from "performance-now";
import _ from "lodash";
const numCPUs = require('os').cpus().length;
import { loadDataset, init, resetData } from "./methods";

const dev = {
    dbName: "dev",
    products: 1000,
    orders: 1000,
    tags: 10,
    variations: [1, 2, 4, 5],
    IPS: 3,
    attributes: 10,
    duration: 1,
    productBatchSize: 3000,
    imageBatchSize: 5000
}
const ret = {
    dbName: "ret",
    products: 30000,
    orders: 2100000,
    tags: 100,
    variations: [1, 2, 5, 20],
    IPS: 5,
    attributes: 20,
    duration: 3,
    productBatchSize: 2500,
    imageBatchSize: 5000
}
const mid = {
    dbName: "mid",
    products: 300000,
    orders: 2100000,
    tags: 1000,
    variations: [1, 2, 5, 20],
    IPS: 7,
    attributes: 20,
    duration: 3,
    productBatchSize: 2000,
    imageBatchSize: 5000
}
const ent = {
    dbName: "ent",
    products: 1000000,
    orders: 52000000,
    tags: 4000,
    variations: [1, 2, 5, 200],
    IPS: 9,
    attributes: 40,
    duration: 3,
    productBatchSize: 1000,
    imageBatchSize: 5000
}

const settings = _.clone(dev);
settings.products = Math.round(settings.products / numCPUs);
settings.orders = Math.round(settings.orders / numCPUs);
settings.tags = Math.round(settings.tags / numCPUs);

if (cluster.isMaster) {
    //   Fork workers.
    init(0, settings).then(() => {
        return resetData();
    })
    .then(() => {
        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    });
    console.log("Initialization done")
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    start(cluster.worker.id)
    console.log(cluster.worker.id, Date.now())
    // start(cluster.worker.id)
}

async function start(id, settings) {
    process.on('unhandledRejection', r => console.log(r))
    await init(id, settings);
    await loadDataset();
    console.log(id, Date.now())
}
