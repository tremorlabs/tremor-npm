/* eslint-disable no-undef */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
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
            subtle: "#e2e8f0", // lightbackground 200
            DEFAULT: "#ffffff", // background
            emphasis: "#4b5563", // darkbackground
            strong: "#1f2937", // darkestbackground
            inverted: "#030712", // new
          },
          border: {
            DEFAULT: "#e5e7eb", //border
          },
          ring: {
            DEFAULT: "#e5e7eb", //ring
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
        "tremor-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-default": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "tremor-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-sm": "0.125rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-default": ["1rem", { lineHeight: "1.5rem" }],
      },
      fontWeight: {
        "tremor-default": "400",
        "tremor-emphasis": "500",
      },
    },
    plugins: [require("@headlessui/tailwindcss")],
  },
};
