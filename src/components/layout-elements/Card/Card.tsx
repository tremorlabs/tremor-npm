import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, HorizontalPositions, VerticalPositions } from "lib/constants";
import { Color, HorizontalPosition, VerticalPosition } from "../../../lib";
import { border, spacing, colorClassNames, makeClassName } from "lib";
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
        "relative w-full text-left ring-1 bg-tremor-background rounded-tremor-default ring-tremor-ring-subtle shadow-tremor-default",
        colorClassNames[decorationColor][colorPalette.border].borderColor,
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

export default Card;
