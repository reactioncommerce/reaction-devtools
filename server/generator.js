// import { MongoClient } from 'mongodb';
// import test from 'assert';
const cluster = require('cluster');
import now from "performance-now";
const numCPUs = require('os').cpus().length;
import { loadDataset, init, resetData } from "./methods";

const dev = {
    products: 1000,
    orders: 1000,
    tags: 10,
    variations: [1, 2, 4, 5],
    IPS: 3,
    attributes: 10,
    duration: 1
}
const mid = {
    products: 300000,
    orders: 2100000,
    tags: 1000,
    variations: [1, 2, 5, 20],
    IPS: 7,
    attributes: 20,
    duration: 3
}
const ent = {
    products: 1000000,
    orders: 52000000,
    tags: 4000,
    variations: [1, 2, 5, 200],
    IPS: 9,
    attributes: 40,
    duration: 3
}

if (cluster.isMaster) {
    //   Fork workers.   
    init().then(() => {
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

async function start(id) {
    process.on('unhandledRejection', r => console.log(r))
    const settings = dev;
    settings.products = Math.ceil(settings.products / numCPUs);
    settings.orders = Math.ceil(settings.orders / numCPUs);
    settings.tags = Math.ceil(settings.tags / numCPUs);
    await init(id, settings);
    await loadDataset();
    console.log(id, Date.now())
}
