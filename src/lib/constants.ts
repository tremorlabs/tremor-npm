import { Color, Shade, DeltaType, HorizontalPosition, Size, VerticalPosition } from "./inputTypes";

export const DeltaTypes: { [key: string]: DeltaType } = {
  Increase: "increase",
  ModerateIncrease: "moderateIncrease",
  Decrease: "decrease",
  ModerateDecrease: "moderateDecrease",
  Unchanged: "unchanged",
};

export const BaseColors: { [key: string]: Color } = {
  Slate: "slate",
  Gray: "gray",
  Zinc: "zinc",
  Neutral: "neutral",
  Stone: "stone",
  Red: "red",
  Orange: "orange",
  Amber: "amber",
  Yellow: "yellow",
  Lime: "lime",
  Green: "green",
  Emerald: "emerald",
  Teal: "teal",
  Cyan: "cyan",
  Sky: "sky",
  Blue: "blue",
  Indigo: "indigo",
  Violet: "violet",
  Purple: "purple",
  Fuchsia: "fuchsia",
  Pink: "pink",
  Rose: "rose",
};

export const BaseShades: { [key: string]: Shade } = {
  50: 50,
  100: 100,
  200: 200,
  300: 300,
  400: 400,
  500: 500,
  600: 600,
  700: 700,
  800: 800,
  900: 900,
  950: 950
};

export const Sizes: { [key: string]: Size } = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
};

export const HorizontalPositions: { [key: string]: HorizontalPosition } = {
  Left: "left",
  Right: "right",
};

export const VerticalPositions: { [key: string]: VerticalPosition } = {
  Top: "top",
  Bottom: "bottom",
};
