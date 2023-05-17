import { extendTailwindMerge } from "tailwind-merge";

export const tremorTwMerge = extendTailwindMerge({
  classGroups: {
    borderRadius: [
      {
        rounded: [
          {
            tremor: ["sm", "default", "full"],
          },
        ],
      },
    ],
    fontSize: [
      {
        text: [
          {
            tremor: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
          },
        ],
      },
    ],
    fontWeight: [
      {
        font: [
          {
            tremor: ["normal", "medium", "semibold", "bold"],
          },
        ],
      },
    ],
    boxShadow: [
      {
        shadow: [
          {
            tremor: ["sm", "default", "md", "lg"],
          },
        ],
      },
    ],
  },
});
