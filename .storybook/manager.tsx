import "../assets/fonts/stylesheet.css";

import { useEffect } from "react";

import { addons, types, useGlobals } from "@storybook/manager-api";

import theme from "./theme";

addons.setConfig({
  theme: theme,
  panelPosition: "bottom",
  initialActive: "canvas",
});

const ExampleToolbar = () => {
  const [globals] = useGlobals();

  useEffect(() => {
    const elements = document.querySelectorAll(".docs-story");

    elements.forEach((element) => {
      element.classList.add(globals["theme"] as string);
    });
  }, [globals]);

  return null;
};

export const registerAddons = () => {
  addons.register("docs-theme", () => {
    addons.add("docs-theme-addon", {
      title: "Addon to change docs story theme",
      type: types.TOOL,
      match: ({ viewMode }) => !!viewMode?.match(/^(?:story|docs)$/),
      render: ExampleToolbar,
    });
  });
};

registerAddons();
