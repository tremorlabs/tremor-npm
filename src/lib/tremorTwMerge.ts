import { extendTailwindMerge } from "tailwind-merge";

export const tremorTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [{ "shadow-tremor": ["input", "card", "dropdown"] }],
      rounded: [{ "rounded-tremor": ["small", "default", "full"] }],
      "font-size": [{ "text-tremor": ["default", "label"] }],
    },
  },
});
