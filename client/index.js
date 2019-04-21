import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { registerOperatorRoute } from "../../../../client/ui";
import DevTools from "./components/devtools";

if (process.env.NODE_ENV === "development") {
  registerOperatorRoute({
    isNavigationLink: true,
    isSetting: true,
    path: "/dev-tools",
    mainComponent: DevTools,
    // eslint-disable-next-line react/display-name, react/no-multi-comp
    SidebarIconComponent: (props) => <FontAwesomeIcon icon={faLaptop} {...props} />,
    sidebarI18nLabel: "admin.settings.devToolsLabel"
  });
}
