import { Reaction } from "/lib/api";

// Register package as ReactionCommerce package
Reaction.registerPackage({
  label: "Reaction Devtools",
  name: "reaction-devtools",
  icon: "fa fa-code",
  version: "1.0.0",
  meta: {
    version: "1.0.0"
  },
  autoEnable: !!(process.env.NODE_ENV === "development"),
  registry: [
    {
      name: "reaction-devtools-admin",
      label: "Dev Tools",
      provides: ["settings"],
      container: "dashboard",
      template: "DevTools",
      icon: "fa fa-code"
    }
  ]
});
