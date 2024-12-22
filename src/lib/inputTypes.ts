export type ValueFormatter = {
  (value: number, index?: number): string;
};

export type CurveType = "linear" | "natural" | "monotone" | "step";

export type Interval = "preserveStartEnd" | "equidistantPreserveStart";

export type IntervalType = "preserveStartEnd" | Interval;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const iconVariantValues = ["simple", "light", "shadow", "solid", "outlined"] as const;

export type IconVariant = (typeof iconVariantValues)[number];

export type HorizontalPosition = "left" | "right";

export type VerticalPosition = "top" | "bottom";

export type ButtonVariant = "primary" | "secondary" | "light";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deltaTypeValues = [
  "increase",
  "moderateIncrease",
  "decrease",
  "moderateDecrease",
  "unchanged",
] as const;

export type DeltaType = (typeof deltaTypeValues)[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sizeValues = ["xs", "sm", "md", "lg", "xl"] as const;

export type Size = (typeof sizeValues)[number];

const colorValues = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;

export type Color = (typeof colorValues)[number];
export type CustomColor = Color | string;
export const getIsBaseColor = (color: Color | string) => colorValues.includes(color as Color);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const justifyContentValues = ["start", "end", "center", "between", "around", "evenly"] as const;
export type JustifyContent = (typeof justifyContentValues)[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const alignItemsValues = ["start", "end", "center", "baseline", "stretch"] as const;
export type AlignItems = (typeof alignItemsValues)[number];

export type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";

export type FunnelVariantType = "base" | "center";
