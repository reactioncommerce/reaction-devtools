import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker, registerComponent } from "@reactioncommerce/reaction-components";
import { Divider, Button, SettingsCard } from "@reactioncommerce/reaction-ui";
import i18next from "i18next";


class DevTools extends Component {
  handleSeedDataClick = () => {
    Meteor.call("devtools/loaddata/small", (error) => {
      if (error) {
        Alerts.toast(`Error loading sample data ${error.reason}`, "error");
      } else {
        Alerts.toast("Sample data loaded", "success");
      }
    });
  }

  handleResetDataClick = () => {
    Meteor.call("devtools/resetData", (error) => {
      if (error) {
        Alerts.toast(`Error resetting sample data ${error.reason}`, "error");
      } else {
        Alerts.toast("Reset successful", "success");
      }
    });
  }


  render() {
    return (
      <div>
        <SettingsCard
          title={"Small shop data"}
          expanded={true}
          showSwitch={false}
        >
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Reset Products and Tags"}
            onClick={this.handleResetDataClick}
          />
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load sample Produts and Tags"}
            onClick={this.handleSeedDataClick}
          />
        </SettingsCard>
        <SettingsCard
          title={"Large Dataset"}
          expanded={true}
          showSwitch={false}
        >
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load sample Produts and Tags"}
            onClick={this.handleSeedDataClick}
          />
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
