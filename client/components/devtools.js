import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Button, SettingsCard } from "@reactioncommerce/reaction-ui";


class DevTools extends Component {
  handleResetDataClick = () => {
    Meteor.call("reaktor-devtools/resetData", (error) => {
      if (error) {
        Alerts.toast(`Error resetting sample data ${error.reason}`, "error");
      } else {
        Alerts.toast("Reset successful", "success");
      }
    });
  };

  handleSeedDataClick = () => {
    Meteor.call("reaktor-devtools/importProducts", (error) => {
      if (error) {
        Alerts.toast(`Error loading sample data ${error.reason}`, "error");
      } else {
        Alerts.toast("Sample data loaded", "success");
      }
    });
  };

  render() {
    return (
      <div>
        <SettingsCard
          title={"Reaktor DevTools"}
          expanded={true}
          showSwitch={false}
        >
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Reset Data"}
            onClick={this.handleResetDataClick}
          />
          <br />
          <br />
          <Button
            bezelStyle={"solid"}
            primary={true}
            label={"Load Level Kids Data"}
            onClick={this.handleSeedDataClick}
          />
        </SettingsCard>
      </div>
    );
  }
}

export default DevTools;
