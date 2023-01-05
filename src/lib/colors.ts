import { BaseColors } from "./primitives";
import { Color } from "./inputTypes";

export const themeColorRange: Color[] = [
  BaseColors.Cyan,
  BaseColors.Sky,
  BaseColors.Blue,
  BaseColors.Indigo,
  BaseColors.Violet,
  BaseColors.Purple,
  BaseColors.Fuchsia,
  BaseColors.Slate,
  BaseColors.Gray,
  BaseColors.Zinc,
  BaseColors.Neutral,
  BaseColors.Stone,
  BaseColors.Red,
  BaseColors.Orange,
  BaseColors.Amber,
  BaseColors.Yellow,
  BaseColors.Lime,
  BaseColors.Green,
  BaseColors.Emerald,
  BaseColors.Teal,
  BaseColors.Pink,
  BaseColors.Rose,
];

export type DefaultColors = {
  transparent: string;
  white: string;
  black: string;
  canvasBackground: string;
  lightBackground: string;
  background: string;
  darkBackground: string;
  darkestBackground: string;
  lightBorder: string;
  border: string;
  darkBorder: string;
  lightRing: string;
  ring: string;
  lightText: string;
  text: string;
  darkText: string;
  darkestText: string;
  icon: string;
};

export const defaultColors: DefaultColors = {
  transparent: "transparent-none",
  white: "white-none",
  black: "black-none",
  canvasBackground: "gray-50",
  lightBackground: "gray-100",
  background: "gray-200",
  darkBackground: "gray-400", //hover
  darkestBackground: "gray-600", //selected
  lightBorder: "gray-200",
  border: "gray-300",
  darkBorder: "gray-600",
  lightRing: "gray-200",
  ring: "blue-300",
  lightText: "gray-400",
  text: "gray-500",
  darkText: "gray-700",
  darkestText: "gray-900",
  icon: "gray-500",
};

export type TwColorValues = {
  500: string;
};

export const twColorsHex: { [baseColor: string]: TwColorValues } = {
  [BaseColors.Slate]: {
    500: "#64748b",
  },
  [BaseColors.Gray]: {
    500: "#6b7280",
  },
  [BaseColors.Zinc]: {
    500: "#71717a",
  },
  [BaseColors.Neutral]: {
    500: "#737373",
  },
  [BaseColors.Stone]: {
    500: "#78716c",
  },
  [BaseColors.Red]: {
    500: "#ef4444",
  },
  [BaseColors.Orange]: {
    500: "#f97316",
  },
  [BaseColors.Amber]: {
    500: "#f59e0b",
  },
  [BaseColors.Yellow]: {
    500: "#eab308",
  },
  [BaseColors.Lime]: {
    500: "#84cc16",
  },
  [BaseColors.Green]: {
    500: "#22c55e",
  },
  [BaseColors.Emerald]: {
    500: "#10b981",
  },
  [BaseColors.Teal]: {
    500: "#14b8a6",
  },
  [BaseColors.Cyan]: {
    500: "#06b6d4",
  },
  [BaseColors.Sky]: {
    500: "#0ea5e9",
  },
  [BaseColors.Blue]: {
    500: "#3b82f6",
  },
  [BaseColors.Indigo]: {
    500: "#6366f1",
  },
  [BaseColors.Violet]: {
    500: "#8b5cf6",
  },
  [BaseColors.Purple]: {
    500: "#a855f7",
  },
  [BaseColors.Fuchsia]: {
    500: "#d946ef",
  },
  [BaseColors.Pink]: {
    500: "#ec4899",
  },
  [BaseColors.Rose]: {
    500: "#f43f5e",
  },
};

export type BaseColorTheme = {
  canvasBackground: string;
  lightBackground: string;
  background: string;
  darkBackground: string;
  darkestBackground: string;
  lightBorder: string;
  border: string;
  darkBorder: string;
  lightRing: string;
  ring: string;
  lightText: string;
  text: string;
  darkText: string;
  icon: string;
};

export const colorTheme: { [baseColor: string]: BaseColorTheme } = {
  [BaseColors.Slate]: {
    canvasBackground: "slate-50",
    lightBackground: "slate-100",
    background: "slate-500",
    darkBackground: "slate-600", //hover
    darkestBackground: "slate-800", //selected
    lightBorder: "slate-200",
    border: "slate-400",
    darkBorder: "slate-600",
    lightRing: "slate-200",
    ring: "slate-400",
    lightText: "slate-400",
    text: "slate-500",
    darkText: "slate-700",
    icon: "slate-500",
  },
  [BaseColors.Gray]: {
    canvasBackground: "gray-50",
    lightBackground: "gray-100",
    background: "gray-500",
    darkBackground: "gray-600", //hover
    darkestBackground: "gray-800", //selected
    lightBorder: "gray-200",
    border: "gray-400",
    darkBorder: "gray-600",
    lightRing: "gray-200",
    ring: "gray-400",
    lightText: "gray-400",
    text: "gray-500",
    darkText: "gray-700",
    icon: "gray-500",
  },
  [BaseColors.Zinc]: {
    canvasBackground: "zinc-50",
    lightBackground: "zinc-100",
    background: "zinc-500",
    darkBackground: "zinc-600", //hover
    darkestBackground: "zinc-800", //selected
    lightBorder: "zinc-200",
    border: "zinc-400",
    darkBorder: "zinc-600",
    lightRing: "zinc-200",
    ring: "zinc-400",
    lightText: "zinc-400",
    text: "zinc-500",
    darkText: "zinc-700",
    icon: "zinc-500",
  },
  [BaseColors.Neutral]: {
    canvasBackground: "neutral-50",
    lightBackground: "neutral-100",
    background: "neutral-500",
    darkBackground: "neutral-600", //hover
    darkestBackground: "neutral-800", //selected
    lightBorder: "neutral-200",
    border: "neutral-400",
    darkBorder: "neutral-600",
    lightRing: "neutral-200",
    ring: "neutral-400",
    lightText: "neutral-400",
    text: "neutral-500",
    darkText: "neutral-700",
    icon: "neutral-500",
  },
  [BaseColors.Stone]: {
    canvasBackground: "stone-50",
    lightBackground: "stone-100",
    background: "stone-500",
    darkBackground: "stone-600", //hover
    darkestBackground: "stone-800", //selected
    lightBorder: "stone-200",
    border: "stone-400",
    darkBorder: "stone-600",
    lightRing: "stone-200",
    ring: "stone-400",
    lightText: "stone-400",
    text: "stone-500",
    darkText: "stone-700",
    icon: "stone-500",
  },
  [BaseColors.Red]: {
    canvasBackground: "red-50",
    lightBackground: "red-100",
    background: "red-500",
    darkBackground: "red-600", //hover
    darkestBackground: "red-800", //selected
    lightBorder: "red-200",
    border: "red-400",
    darkBorder: "red-600",
    lightRing: "red-200",
    ring: "red-400",
    lightText: "red-400",
    text: "red-500",
    darkText: "red-700",
    icon: "red-500",
  },
  [BaseColors.Orange]: {
    canvasBackground: "orange-50",
    lightBackground: "orange-100",
    background: "orange-500",
    darkBackground: "orange-600", //hover
    darkestBackground: "orange-800", //selected
    lightBorder: "orange-200",
    border: "orange-400",
    darkBorder: "orange-600",
    lightRing: "orange-200",
    ring: "orange-400",
    lightText: "orange-400",
    text: "orange-500",
    darkText: "orange-700",
    icon: "orange-500",
  },
  [BaseColors.Amber]: {
    canvasBackground: "amber-50",
    lightBackground: "amber-100",
    background: "amber-500",
    darkBackground: "amber-600", //hover
    darkestBackground: "amber-800", //selected
    lightBorder: "amber-200",
    border: "amber-400",
    darkBorder: "amber-600",
    lightRing: "amber-200",
    ring: "amber-400",
    lightText: "amber-400",
    text: "amber-500",
    darkText: "amber-700",
    icon: "amber-500",
  },
  [BaseColors.Yellow]: {
    canvasBackground: "yellow-50",
    lightBackground: "yellow-100",
    background: "yellow-500",
    darkBackground: "yellow-600", //hover
    darkestBackground: "yellow-800", //selected
    lightBorder: "yellow-200",
    border: "yellow-400",
    darkBorder: "yellow-600",
    lightRing: "yellow-200",
    ring: "yellow-400",
    lightText: "yellow-400",
    text: "yellow-500",
    darkText: "yellow-700",
    icon: "yellow-500",
  },
  [BaseColors.Lime]: {
    canvasBackground: "lime-50",
    lightBackground: "lime-100",
    background: "lime-500",
    darkBackground: "lime-600", //hover
    darkestBackground: "lime-800", //selected
    lightBorder: "lime-200",
    border: "lime-400",
    darkBorder: "lime-600",
    lightRing: "lime-200",
    ring: "lime-400",
    lightText: "lime-400",
    text: "lime-500",
    darkText: "lime-700",
    icon: "lime-500",
  },
  [BaseColors.Green]: {
    canvasBackground: "green-50",
    lightBackground: "green-100",
    background: "green-500",
    darkBackground: "green-600", //hover
    darkestBackground: "green-800", //selected
    lightBorder: "green-200",
    border: "green-400",
    darkBorder: "green-600",
    lightRing: "green-200",
    ring: "green-400",
    lightText: "green-400",
    text: "green-500",
    darkText: "green-700",
    icon: "green-500",
  },
  [BaseColors.Emerald]: {
    canvasBackground: "emerald-50",
    lightBackground: "emerald-100",
    background: "emerald-500",
    darkBackground: "emerald-600", //hover
    darkestBackground: "emerald-800", //selected
    lightBorder: "emerald-200",
    border: "emerald-400",
    darkBorder: "emerald-600",
    lightRing: "emerald-200",
    ring: "emerald-400",
    lightText: "emerald-400",
    text: "emerald-500",
    darkText: "emerald-700",
    icon: "emerald-500",
  },
  [BaseColors.Teal]: {
    canvasBackground: "teal-50",
    lightBackground: "teal-100",
    background: "teal-500",
    darkBackground: "teal-600", //hover
    darkestBackground: "teal-800", //selected
    lightBorder: "teal-200",
    border: "teal-400",
    darkBorder: "teal-600",
    lightRing: "teal-200",
    ring: "teal-400",
    lightText: "teal-400",
    text: "teal-500",
    darkText: "teal-700",
    icon: "teal-500",
  },
  [BaseColors.Cyan]: {
    canvasBackground: "cyan-50",
    lightBackground: "cyan-100",
    background: "cyan-500",
    darkBackground: "cyan-600", //hover
    darkestBackground: "cyan-800", //selected
    lightBorder: "cyan-200",
    border: "cyan-400",
    darkBorder: "cyan-600",
    lightRing: "cyan-200",
    ring: "cyan-400",
    lightText: "cyan-400",
    text: "cyan-500",
    darkText: "cyan-700",
    icon: "cyan-500",
  },
  [BaseColors.Sky]: {
    canvasBackground: "sky-50",
    lightBackground: "sky-100",
    background: "sky-500",
    darkBackground: "sky-600", //hover
    darkestBackground: "sky-800", //selected
    lightBorder: "sky-200",
    border: "sky-400",
    darkBorder: "sky-600",
    lightRing: "sky-200",
    ring: "sky-400",
    lightText: "sky-400",
    text: "sky-500",
    darkText: "sky-700",
    icon: "sky-500",
  },
  [BaseColors.Blue]: {
    canvasBackground: "blue-50",
    lightBackground: "blue-100",
    background: "blue-500",
    darkBackground: "blue-600", //hover
    darkestBackground: "blue-800", //selected
    lightBorder: "blue-200",
    border: "blue-400",
    darkBorder: "blue-600",
    lightRing: "blue-200",
    ring: "blue-400",
    lightText: "blue-400",
    text: "blue-500",
    darkText: "blue-700",
    icon: "blue-500",
  },
  [BaseColors.Indigo]: {
    canvasBackground: "indigo-50",
    lightBackground: "indigo-100",
    background: "indigo-500",
    darkBackground: "indigo-600", //hover
    darkestBackground: "indigo-800", //selected
    lightBorder: "indigo-200",
    border: "indigo-400",
    darkBorder: "indigo-600",
    lightRing: "indigo-200",
    ring: "indigo-400",
    lightText: "indigo-400",
    text: "indigo-500",
    darkText: "indigo-700",
    icon: "indigo-500",
  },
  [BaseColors.Violet]: {
    canvasBackground: "violet-50",
    lightBackground: "violet-100",
    background: "violet-500",
    darkBackground: "violet-600", //hover
    darkestBackground: "violet-800", //selected
    lightBorder: "violet-200",
    border: "violet-400",
    darkBorder: "violet-600",
    lightRing: "violet-200",
    ring: "violet-400",
    lightText: "violet-400",
    text: "violet-500",
    darkText: "violet-700",
    icon: "violet-500",
  },
  [BaseColors.Purple]: {
    canvasBackground: "purple-50",
    lightBackground: "purple-100",
    background: "purple-500",
    darkBackground: "purple-600", //hover
    darkestBackground: "purple-800", //selected
    lightBorder: "purple-200",
    border: "purple-400",
    darkBorder: "purple-600",
    lightRing: "purple-200",
    ring: "purple-400",
    lightText: "purple-400",
    text: "purple-500",
    darkText: "purple-700",
    icon: "purple-500",
  },
  [BaseColors.Fuchsia]: {
    canvasBackground: "fuchsia-50",
    lightBackground: "fuchsia-100",
    background: "fuchsia-500",
    darkBackground: "fuchsia-600", //hover
    darkestBackground: "fuchsia-800", //selected
    lightBorder: "fuchsia-200",
    border: "fuchsia-400",
    darkBorder: "fuchsia-600",
    lightRing: "fuchsia-200",
    ring: "fuchsia-400",
    lightText: "fuchsia-400",
    text: "fuchsia-500",
    darkText: "fuchsia-700",
    icon: "fuchsia-500",
  },
  [BaseColors.Pink]: {
    canvasBackground: "pink-50",
    lightBackground: "pink-100",
    background: "pink-500",
    darkBackground: "pink-600", //hover
    darkestBackground: "pink-800", //selected
    lightBorder: "pink-200",
    border: "pink-400",
    darkBorder: "pink-600",
    lightRing: "pink-200",
    ring: "pink-400",
    lightText: "pink-400",
    text: "pink-500",
    darkText: "pink-700",
    icon: "pink-500",
  },
  [BaseColors.Rose]: {
    canvasBackground: "rose-50",
    lightBackground: "rose-100",
    background: "rose-500",
    darkBackground: "rose-600", //hover
    darkestBackground: "rose-800", //selected
    lightBorder: "rose-200",
    border: "rose-400",
    darkBorder: "rose-600",
    lightRing: "rose-200",
    ring: "rose-400",
    lightText: "rose-400",
    text: "rose-500",
    darkText: "rose-700",
    icon: "rose-500",
  },
};
