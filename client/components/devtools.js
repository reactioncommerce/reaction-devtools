import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker, registerComponent } from "@reactioncommerce/reaction-components";
import { Button, SettingsCard } from "@reactioncommerce/reaction-ui";


class DevTools extends Component {
  handleResetDataClick = () => {
    Meteor.call("devtools/resetData", (error) => {
      if (error) {
        Alerts.toast(`Error resetting sample data ${error.reason}`, "error");
      } else {
        Alerts.toast("Reset successful", "success");
      }
    });
  }

  handleImagesClick = () => {
    Meteor.call("devtools/loaddata/images", (error) => {
      if (error) {
        Alerts.toast(`Error loading images ${error.reason}`, "error");
      } else {
        Alerts.toast("Images loaded successfully", "success");
      }
    });
  }

  handleImagesFromWebClick = () => {
    Meteor.call("devtools/loaddata/images", "web", (error) => {
      if (error) {
        Alerts.toast(`Error loading images ${error.reason}`, "error");
      } else {
        Alerts.toast("Images loaded successfully", "success");
      }
    });
  }

  handleSeedDataClick = () => {
    Meteor.call("devtools/loaddata/small/products", (error) => {
      if (error) {
        Alerts.toast(`Error loading sample data ${error.reason}`, "error");
      } else {
        Alerts.toast("Sample data loaded", "success");
      }
    });
  }

  handleSmallOrdersClick = () => {
    Meteor.call("devtools/loaddata/small/orders", (error) => {
      if (error) {
        Alerts.toast(`Error loading order data ${error.reason}`, "error");
      } else {
        Alerts.toast("Orders loaded successfully", "success");
      }
    });
  }

  handleMediumDataClick = () => {
    Meteor.call("devtools/loaddata/medium/products", (error) => {
      if (error) {
        Alerts.toast(`Error loading medium sample data ${error.reason}`, "error");
      } else {
        Alerts.toast("Load medium dataset successful", "success");
      }
    });
  }

  handleMediumOrdersClick = () => {
    Meteor.call("devtools/loaddata/medium/orders", (error) => {
      if (error) {
        Alerts.toast(`Error loading medium sample data ${error.reason}`, "error");
      } else {
        Alerts.toast("Loaded 10000 orders successful", "success");
      }
    });
  }

  handleLargeDataClick = () => {
    Meteor.call("devtools/loaddata/large/products", (error) => {
      if (error) {
        Alerts.toast(`Error loading large sample data ${error.reason}`, "error");
      } else {
        Alerts.toast("Load large dataset successful", "success");
      }
    });
  }

  handleLargeOrdersClick = () => {
    Meteor.call("devtools/loaddata/large/orders", (error) => {
      if (error) {
        Alerts.toast(`Error loading large order data ${error.reason}`, "error");
      } else {
        Alerts.toast("Loading orders successful", "success");
      }
    });
  }

  render() {
    return (
      <div>
        <SettingsCard
          title={"Common"}
          expanded={true}
          showSwitch={false}
        >
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Reset Data"}
            onClick={this.handleResetDataClick}
          />
        </SettingsCard>

        <SettingsCard
          title={"Small shop data (10 products, 100 orders"}
          expanded={true}
          showSwitch={false}
        >
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Products and Tags"}
            onClick={this.handleSeedDataClick}
          />
          <br />
          <br />
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Orders"}
            onClick={this.handleSmallOrdersClick}
          />
          <br />
          <br />
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Images"}
            onClick={this.handleImagesClick}
          />

          <br />
          <br />
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Puppy Images"}
            onClick={this.handleImagesFromWebClick}
          />
        </SettingsCard>


        <SettingsCard
          title={"Medium Dataset (1000 products, 10000 orders)"}
          expanded={true}
          showSwitch={false}
        >
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Produts and Tags"}
            onClick={this.handleMediumDataClick}
          />
          <br />
          <br />
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Orders"}
            onClick={this.handleMediumOrdersClick}
          />
          <br />
          <br />
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Images"}
            onClick={this.handleImagesClick}
          />
          <div>Loading images may take some time</div>
        </SettingsCard>

        <SettingsCard
          title={"Large Dataset (50,000 products, 50,000 orders)"}
          expanded={true}
          showSwitch={false}
        >
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Produts and Tags"}
            onClick={this.handleLargeDataClick}
          />
          <br />
          <br />
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Orders"}
            onClick={this.handleLargeOrdersClick}
          />
          <br />
          <br />
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Images"}
            onClick={this.handleImagesClick}
          />
          <div>Loading images may take some time</div>
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
