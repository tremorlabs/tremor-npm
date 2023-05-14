/* eslint-disable no-undef */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        active: "#000fff", //@achi?
        tremor: {
          brand: {
            muted: "#bae6fd", // disabled
            subtle: "#7dd3fc", // 300 zb hover
            DEFAULT: "#3b82f6", // 500
            emphasis: "#1d4ed8", // 700
            inverted: "#eff6ff", //
          },
          background: {
            muted: "#f9fafb", //canvasbackground 50
            subtle: "#f3f4f6", // lightbackground 100
            DEFAULT: "#ffffff", // background
            emphasis: "#4b5563", // darkbackground
            strong: "#1f2937", // darkestbackground
            inverted: "#030712", // new
          },
          border: {
            muted: "#f3f4f6", // new 100
            subtle: "#e5e7eb", //lightBorder
            DEFAULT: "#6b7280", //border
            emphasis: "#374151", //darkborder
          },
          ring: {
            subtle: "#e5e7eb", //lightring
            DEFAULT: "#d1d5db", //ring
          },
          content: {
            subtle: "#9ca3af", //lighttext
            DEFAULT: "#6b7280", //text, //icon
            emphasis: "#374151", //darktext
            strong: "#1f2937", //darkesttext
            inverted: "#ffffff", //new
          },
        },
      },
      boxShadow: {
        tremor: {
          shadow: {
            sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
        },
      },
      borderRadius: {
        tremor: {
          rounded: {
            sm: "0.125rem",
            DEFAULT: "0.25rem",
          },
        },
      },
      fontSize: {
        tremor: {
          DEFAULT: ["1rem", { lineHeight: "1.5rem" }],
        },
      },
      fontWeight: {
        tremor: {
          default: "400",
          emphasis: "500",
        },
      },
    },
    plugins: [require("@headlessui/tailwindcss")],
  },
};
