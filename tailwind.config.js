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
            faint: "#eff6ff", // 50
            muted: "#bfdbfe", // 200 eg. disabled
            subtle: "#60a5fa", // 400
            DEFAULT: "#3b82f6", // 500
            emphasis: "#1d4ed8", // 700
            inverted: "#ffffff", // white
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
        "tremor-sm": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-md": "0.75rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-xs": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-base": ["1rem", { lineHeight: "1.5rem" }],
        "tremor-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-xl": ["1.25rem", { lineHeight: "1.75rem  " }],
        "tremor-2xl": ["1.5rem", { lineHeight: "2rem" }],
        "tremor-3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      fontWeight: {
        "tremor-normal": "400",
        "tremor-medium": "500",
        "tremor-semibold": "600",
        "tremor-bold": "700",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
