import React from "react";
import clsx from "clsx";

import { BaseColors, HorizontalPositions, VerticalPositions } from "lib/primitives";
import { Color, HorizontalPosition, VerticalPosition } from "../../../lib";
import {
  border,
  borderRadius,
  boxShadow,
  defaultColors,
  getColor,
  getColorVariantsFromColorThemeValue,
  spacing,
} from "lib";

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
  hFull?: boolean;
  shadow?: boolean;
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
      className={clsx(
        "relative w-full mx-auto text-left ring-1",
        getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
        boxShadow.md,
        getColorVariantsFromColorThemeValue(getColor(decorationColor).border).borderColor,
        getColorVariantsFromColorThemeValue(defaultColors.lightBorder).ringColor,
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
