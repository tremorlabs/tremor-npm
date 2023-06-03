import React from "react";
import { tremorTwMerge } from "../../../lib";

import { HorizontalPositions, VerticalPositions } from "lib/constants";
import { Color, HorizontalPosition, VerticalPosition } from "../../../lib";
import { border, spacing, getColorClassNames, makeClassName } from "lib";
import { colorPalette } from "lib/theme";

const makeCardClassName = makeClassName("Card");

const parseDecorationAlignment = (decorationAlignment: string) => {
  if (!decorationAlignment) return "";
  switch (decorationAlignment) {
    case HorizontalPositions.Left:
      return border.lg.left;
    case VerticalPositions.Top:
      return border.lg.top;
    case HorizontalPositions.Right:
      return border.lg.right;
    case VerticalPositions.Bottom:
      return border.lg.bottom;
    default:
      return "";
  }
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  decoration?: HorizontalPosition | VerticalPosition | "";
  decorationColor?: Color;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { decoration = "", decorationColor, children, className, ...other } = props;
  return (
    <div
      ref={ref}
      className={tremorTwMerge(
        makeCardClassName("root"),
        // common
        "relative w-full text-left ring-1 rounded-tremor-default",
        // light
        "bg-tremor-background ring-tremor-ring shadow-tremor-card border-tremor-brand",
        // dark
        "dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card dark:border-dark-tremor-brand",
        decorationColor && getColorClassNames(decorationColor, colorPalette.border).borderColor,
        parseDecorationAlignment(decoration),
        spacing.threeXl.paddingAll,
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;
