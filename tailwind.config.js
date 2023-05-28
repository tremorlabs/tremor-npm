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
            faint: "#eff6ff",
            muted: "#bfdbfe",
            subtle: "#60a5fa",
            DEFAULT: "#3b82f6",
            emphasis: "#1d4ed8",
            inverted: "#ffffff",
          },
          background: {
            muted: "#f9fafb",
            subtle: "#f3f4f6",
            DEFAULT: "#ffffff",
            emphasis: "#111827",
          },
          border: {
            DEFAULT: "#e5e7eb",
          },
          ring: {
            DEFAULT: "#e5e7eb",
          },
          content: {
            subtle: "#9ca3af",
            DEFAULT: "#6b7280",
            emphasis: "#374151",
            strong: "#111827",
            inverted: "#ffffff",
          },
        },
      },
      boxShadow: {
        "tremor-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)", // tremor-input
        "tremor-default": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", // tremor-card
        "tremor-md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // tremor-dropdown
      },
      borderRadius: {
        "tremor-sm": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-xs": ["0.75rem", { lineHeight: "1rem" }], //1x used, maybe changeable
        "tremor-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-base": ["1rem", { lineHeight: "1.5rem" }],
        "tremor-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-xl": ["1.25rem", { lineHeight: "1.75rem  " }], //never used
        "tremor-2xl": ["1.5rem", { lineHeight: "2rem" }], // never used
        "tremor-3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
