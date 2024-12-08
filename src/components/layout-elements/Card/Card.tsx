import { Color, tremorTwMerge } from "lib";
import React from "react";

type HorizontalPosition = "left" | "right";
type VerticalPosition = "top" | "bottom";
type DecorationPosition = HorizontalPosition | VerticalPosition;

const POSITION_TO_BORDER_CLASS: Record<DecorationPosition, string> = {
  left: "border-l-4",
  right: "border-r-4",
  top: "border-t-4",
  bottom: "border-b-4",
};

const isValidDecorationPosition = (value: string): value is DecorationPosition => {
  return value in POSITION_TO_BORDER_CLASS;
};

const parseDecorationAlignment = (decorationAlignment: string): string => {
  if (!decorationAlignment) return "";

  return isValidDecorationPosition(decorationAlignment)
    ? POSITION_TO_BORDER_CLASS[decorationAlignment]
    : "";
};

const borderColors: { [color in Color]: string } = {
  brand: "border-tremor-brand-default",
  slate: "border-slate-500",
  gray: "border-gray-500",
  zinc: "border-zinc-500",
  neutral: "border-neutral-500",
  stone: "border-stone-500",
  red: "border-red-500",
  orange: "border-orange-500",
  amber: "border-amber-500",
  yellow: "border-yellow-500",
  lime: "border-lime-500",
  green: "border-green-500",
  emerald: "border-emerald-500",
  teal: "border-teal-500",
  cyan: "border-cyan-500",
  sky: "border-sky-500",
  blue: "border-blue-500",
  indigo: "border-indigo-500",
  violet: "border-violet-500",
  purple: "border-purple-500",
  fuchsia: "border-fuchsia-500",
  pink: "border-pink-500",
  rose: "border-rose-500",
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  decoration?: DecorationPosition | "";
  decorationColor?: Color;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ decoration = "", decorationColor = "brand", children, className, ...other }, ref) => {
    return (
      <div
        ref={ref}
        className={tremorTwMerge(
          // common
          "rounded-tremor-default relative w-full p-6 text-left ring-1",
          "bg-tremor-background-default shadow-tremor-card ring-tremor-ring-default",
          borderColors[decorationColor],
          parseDecorationAlignment(decoration),
          className,
        )}
        {...other}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export { Card, type CardProps };
