import "../assets/fonts/stylesheet.css";
import "../src/styles.css";
import "./globals.css";

import type { Preview } from "@storybook/react";

import { withThemeByClassName } from "@storybook/addon-themes";
import { type ReactRenderer } from "@storybook/react";

import theme from "./theme";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme,
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
} satisfies Preview;

export default preview;
