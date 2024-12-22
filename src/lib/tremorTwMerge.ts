import { extendTailwindMerge } from "tailwind-merge";

export const tremorTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [
        {
          shadow: [
            {
              tremor: ["input", "card", "dropdown"],
              "dark-tremor": ["input", "card", "dropdown"],
            },
          ],
        },
      ],
      rounded: [
        {
          rounded: [
            {
              tremor: ["small", "default", "full"],
              "dark-tremor": ["small", "default", "full"],
            },
          ],
        },
      ],
      "font-size": [
        {
          text: [
            {
              tremor: ["default", "title", "metric"],
              "dark-tremor": ["default", "title", "metric"],
            },
          ],
        },
      ],
    },
  },
});
