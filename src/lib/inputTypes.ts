export type ValueFormatter = {
  (value: number): string;
};

export type CurveType = "linear" | "natural" | "monotone" | "step";

export type Interval = "preserveStartEnd" | "equidistantPreserveStart";

export type IntervalType = "preserveStartEnd" | Interval;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sizeValues = ["xs", "sm", "md", "lg", "xl"] as const;

export type Size = (typeof sizeValues)[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colorValues = [
  "brand",
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
