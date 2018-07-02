import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { composeWithTracker, registerComponent, Components } from "@reactioncommerce/reaction-components";
import { Button, SettingsCard } from "@reactioncommerce/reaction-ui";

class DevTools extends Component {
  state = {
    mongoHost: "mongodb://localhost:3001",
    dbName: "meteor",
    products: 100,
    orders: 100,
    users: 100,
    tags: 3,
    variations: [1, 2, 4, 5],
    IPS: 3,
    discounts: 10,
    attributes: 10,
    duration: 1,
    productBatchSize: 3001,
    imageBatchSize: 3000,
    optionsImageCached: true,
    primaryImageCached: true
  };

  populateSmallDataset = () => {
    this.setState({
      products: 100,
      orders: 100,
      tags: 3,
      IPS: 3
    });
  };

  populateMediumDataset = () => {
    this.setState({
      products: 1000,
      orders: 10000,
      tags: 10,
      imageBatchSize: 5000,
      IPS: 5
    });
  };

  populateLargeDataset = () => {
    this.setState({
      products: 50000,
      orders: 50000,
      tags: 100,
      imageBatchSize: 3000,
      IPS: 7
    });
  };

  populateSampleDataset = () => {
    Meteor.call("devtools/sampleData", this.state, (error) => {
      if (error) {
        Alerts.toast(`Error loading sample data ${error.msg}`, "error");
      } else {
        Alerts.toast("Sample data load successful", "success");
      }
    });
  };

  handleResetData = () => {
    Meteor.call("devtools/resetData", this.state, (error) => {
      if (error) {
        Alerts.toast(`Error resetting sample data ${error.msg}`, "error");
      } else {
        Alerts.toast("Reset successful", "success");
      }
    });
  };

  handleLoadData = () => {
    Meteor.call("devtools/loadData", this.state, (error) => {
      if (error) {
        Alerts.toast(`Error loading sample data ${error.msg}`, "error");
      } else {
        Alerts.toast("Data loading successful", "success");
      }
    });
  };

  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="devtools">
        <SettingsCard
          title={"Common"}
          expanded={true}
          showSwitch={false}
        >
          <div id="datasets">
            <Button
              bezelStyle={"solid"}
              label={"Small Dataset"}
              onClick={this.populateSmallDataset}
              className={"small"}
            />
            <Button
              bezelStyle={"solid"}
              label={"Medium Dataset"}
              onClick={this.populateMediumDataset}
              className={"medium"}
            />
            <Button
              bezelStyle={"solid"}
              label={"Large Dataset"}
              onClick={this.populateLargeDataset}
              className={"large"}
            />
          </div>
          <Components.TextField
            onChange={this.handleChange}
            label={"Database name"}
            placeholder={"meteor"}
            value={this.state.dbName}
            name={"dbName"}
          />
          <Components.TextField
            onChange={this.handleChange}
            label={"Mongo host"}
            placeholder={"mongodb://localhost:3001"}
            value={this.state.mongoHost}
            name={"mongoHost"}
          />
          <Components.TextField
            onChange={this.handleChange}
            label={"Top level products"}
            placeholder={1000}
            type={"number"}
            value={this.state.products}
            name={"products"}
          />
          <Components.TextField
            onChange={this.handleChange}
            label={"Orders"}
            placeholder={1000}
            type={"number"}
            value={this.state.orders}
            name={"orders"}
          />
          <Components.TextField
            onChange={this.handleChange}
            label={"Categories"}
            placeholder={10}
            type={"number"}
            value={this.state.tags}
            name={"tags"}
          />
          <Components.TextField
            onChange={this.handleChange}
            label={"Images per SKU"}
            placeholder={3}
            type={"number"}
            value={this.state.IPS}
            name={"IPS"}
          />
          <div id="actionButtons">
            <Button
              bezelStyle={"solid"}
              primary={true}
              label={"Load Data"}
              onClick={this.handleLoadData}
              className={"loadData"}
            />
            <Button
              bezelStyle={"solid"}
              primary={true}
              label={"Reset Data"}
              onClick={this.handleResetData}
              className={"resetData"}
            />
            <Button
              bezelStyle={"solid"}
              label={"Load Sample Dataset"}
              primary={true}
              onClick={this.populateSampleDataset}
              className={"loadSampleData"}
            />
          </div>
        </SettingsCard>
      </div>
    );
  }
}

registerComponent("DevTools", DevTools);

function composer(onData) {
  onData(null, {});
}

export default composeWithTracker(composer)(DevTools);
