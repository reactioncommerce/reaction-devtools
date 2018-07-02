import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { init, loadDataset, resetData } from "../../reaction-data-loader/data/methods.js";
import { loadSampleData } from "./sampleData.js";

const methods = {};

methods.indexData = (settings) => {
  check(settings, Match.Optional(Object));
  Promise.await(init(1, settings)
    .then(resetData)
    .then(loadDataset));
};

methods.resetData = (settings) => {
  check(settings, Match.Optional(Object));
  Promise.await(init(1, settings)
    .then(resetData));
};

methods.sampleData = (settings) => {
  check(settings, Match.Optional(Object));
  Promise.await(init(1, settings)
    .then(resetData)
    .then(loadSampleData));
};

export default methods;

Meteor.methods({
  "devtools/loadData": methods.indexData,
  "devtools/resetData": methods.resetData,
  "devtools/sampleData": methods.sampleData
});
