export type ButtonType = "button" | "submit" | "reset";

export type ValueFormatter = {
  (value: number): string;
};

const iconVariantValues = ["simple", "light", "shadow", "solid", "outlined"] as const;

export type IconVariant = (typeof iconVariantValues)[number];

export type HorizontalPosition = "left" | "right";

export type VerticalPosition = "top" | "bottom";

export type Importance = "primary" | "secondary";

export type ButtonVariant = "primary" | "secondary" | "light";

export type RelativeFilterOption = "tdy" | "w" | "t" | "m" | "y" | null;

const deltaTypeValues = [
  "increase",
  "moderateIncrease",
  "decrease",
  "moderateDecrease",
  "unchanged",
] as const;

export type DeltaType = (typeof deltaTypeValues)[number];

const sizeValues = ["xs", "sm", "md", "lg", "xl"] as const;

export type Size = (typeof sizeValues)[number];

const baseColorValues = [
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

export type Color = (typeof baseColorValues)[number];

const justifyContentValues = ["start", "end", "center", "between", "around", "evenly"] as const;
export type JustifyContent = (typeof justifyContentValues)[number];

const alignItemsValues = ["start", "end", "center", "baseline", "stretch"] as const;
export type AlignItems = (typeof alignItemsValues)[number];

export type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";
