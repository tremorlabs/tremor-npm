import "../assets/fonts/stylesheet.css";
import "../src/styles.css";

import type { Preview } from "@storybook/react";

const preview = {
  parameters: {
    // docs: {
    //   theme,
    // },
    backgrounds: {
      values: [
        { name: 'Dark', value: '#030712' },
        { name: 'Light', value: '#fff' },
      ],
      default: 'Light',
    },
  },
} satisfies Preview;

export default preview;
