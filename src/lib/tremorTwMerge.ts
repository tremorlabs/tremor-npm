import { extendTailwindMerge } from "tailwind-merge";

export const tremorTwMerge = extendTailwindMerge({
  classGroups: {
    boxShadow: [
      {
        shadow: [
          {
            tremor: ["input", "card", "dropdown"],
            "dark-tremor": ["input", "card", "dropdown"],
          },
        ],
      },
    ],
    borderRadius: [
      {
        rounded: [
          {
            tremor: ["small", "default", "full"],
            "dark-tremor": ["small", "default", "full"],
          },
        ],
      },
    ],
    fontSize: [
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
});
