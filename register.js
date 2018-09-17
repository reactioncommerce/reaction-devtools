import { Reaction } from "/lib/api";

if (process.env.NODE_ENV === "development") {
  // Register package as ReactionCommerce package
  Reaction.registerPackage({
    label: "Reaction Devtools",
    name: "reaction-devtools",
    icon: "fa fa-code",
    meta: {
      version: "0.0.1"
    },
    autoEnable: true,
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
}
