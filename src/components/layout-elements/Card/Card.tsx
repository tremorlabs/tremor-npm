import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, HorizontalPositions, VerticalPositions } from "lib/constants";
import { Color, HorizontalPosition, VerticalPosition, colorClassNames } from "../../../lib";
import { border, borderRadius, boxShadow, spacing } from "lib";
import { DEFAULT_COLOR, WHITE, colorPalette } from "lib/theme";

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
        "relative w-full text-left ring-1",
        colorClassNames[WHITE]["none"].bgColor,
        boxShadow.md,
        colorClassNames[decorationColor][colorPalette.border].borderColor,
        colorClassNames[DEFAULT_COLOR][colorPalette.ring].ringColor,
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

export default Card;
