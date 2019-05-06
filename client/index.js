import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeer } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { registerOperatorRoute } from "../../../../client/ui";
import DevTools from "./components/devtools";

registerOperatorRoute({
  isNavigationLink: true,
  isSetting: true,
  path: "/reaktor-dev-tools",
  mainComponent: DevTools,
  // eslint-disable-next-line react/display-name, react/no-multi-comp
  SidebarIconComponent: (props) => <FontAwesomeIcon icon={faBeer} {...props} />,
  sidebarI18nLabel: "admin.settings.reaktorDevToolsLabel"
});
