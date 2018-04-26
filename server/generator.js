// import { MongoClient } from 'mongodb';
// import test from 'assert';
const cluster = require('cluster');
import now from "performance-now";
const numCPUs = require('os').cpus().length;
import { loadDataset, init, resetData } from "./methods";

const tagSettings = {
    numOfTags: 250
}
/*
37500 for mid -> 50 sec
124521 for ent

60000 -> order, spread over a year
60000 -> accounta
*/
// try {
//     start(1)
// } catch (err) {
//     console.err(err);
// }
if (cluster.isMaster) {
//     //   Fork workers.   
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
    let numPro = 1000;
    const variations = [1, 2, 5, 20];
    await init(id)
    await loadDataset(numPro, variations, tagSettings);
    console.log(id, Date.now())
}
// var Worker = require('webworker-threads').Worker;
 


// async function start() {
//     // Connection url
//     const url = 'mongodb://localhost:3001';
//     // Database Name
//     const dbName = 'meteor';
//     // Connect using MongoClient
//     const client = await MongoClient.connect(url)
//     const db = client.db(dbName);
//     // Use the admin database for the operation
//     const collection = db.collection('Accounts');
//     // Find some documents
//     console.log(await collection.find({}).toArray());
//     return db;
// }
// async function load() {
//     await methods.resetData();    
//     let numPro = 50000;
//     const variations = [1, 2, 5, 20];
//     const numWork = 3;
//     console.log("Number of products =", numPro);
//     for (var i = 0; i < numWork; i++) {
//         // You may also pass in a function:
//         var worker = new Worker(() => {
//             this.onmessage = async function(event) {
//                 console.log("Got message");
//                 const { nP } = event.data;
//                 await loadDataset(nP, variations);
//                 self.close();
//             };
//         });
//         worker.postMessage({nP: numPro});
//     }
//     // proArray = [];
//     // let s = now();
//     // for (var i = 0; i < nP / 2000; i += 1) {
//     //     proArray.push(loadDataset(2000, variations));
//     // }
//     // await Promise.all(proArray);
//     // console.log("Total time =", now() - s);
//     // nP = 10000;
//     // console.log("Number of products =", nP);
//     // await loadDataset(numPro, variations);
// }

// // load()

// // // You may also pass in a function:
// // var worker = new Worker(function(){
// //     this.onmessage = function(event) {
// //         let numPro = 5000;
// //     const variations = [1, 2, 5, 20];
// //       loadDataset(numPro, variations)
// //       .then(console.log)
// //       .catch(console.log)
// //     //   self.close();
// //     };
// //   });
// //   worker.postMessage('ali');
// // "babel-cli": "^6.26.0",
// //     "babel-preset-es2015": "^6.24.1",
// //     "babel-preset-stage-2": "^6.24.1",