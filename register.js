import { Reaction } from "/lib/api";

// Register package as ReactionCommerce package
Reaction.registerPackage({
  label: "Reaktor Devtools",
  name: "reaktor-devtools",
  icon: "fa fa-code",
  meta: {
    version: "0.0.1"
  },
  autoEnable: !!(process.env.NODE_ENV === "development"),
  registry: [
    {
      name: "reaktor-devtools-admin",
      label: "Reaktor Dev Tools",
      provides: ["settings"],
      container: "dashboard",
      template: "DevTools",
      icon: "fa fa-code"
    }
  ]
});
