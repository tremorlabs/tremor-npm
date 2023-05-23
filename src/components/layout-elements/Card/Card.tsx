import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, HorizontalPositions, VerticalPositions } from "lib/constants";
import { Color, HorizontalPosition, VerticalPosition } from "../../../lib";
import {
  border,
  borderRadius,
  boxShadow,
  getColorClassNames,
  spacing,
  colorClassNames,
  makeClassName,
} from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

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
  const {
    decoration = "",
    decorationColor = BaseColors.Blue,
    children,
    className,
    ...other
  } = props;
  return (
    <div
      ref={ref}
      className={twMerge(
        makeCardClassName("root"),
        "relative w-full text-left ring-1",
        getColorClassNames("white").bgColor,
        boxShadow.md,
        colorClassNames[decorationColor][colorPalette.border].borderColor,
        getColorClassNames(DEFAULT_COLOR, colorPalette.lightRing).ringColor,
        parseDecorationAlignment(decoration),
        spacing.threeXl.paddingAll,
        borderRadius.lg.all,
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
