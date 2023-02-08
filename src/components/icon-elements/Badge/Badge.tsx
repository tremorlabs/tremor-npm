import React from "react";
import clsx from "clsx";

import {
  BaseColors,
  Sizes,
  borderRadius,
  getColor,
  getColorVariantsFromColorThemeValue,
} from "lib";
import { Color, Size } from "../../../lib";
import { badgeProportions, iconSizes } from "./styles";
import { iconElem, textElem } from "lib/baseStyles";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  color?: Color;
  size?: Size;
  icon?: React.ElementType;
  tooltip?: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const {
    text,
    color = BaseColors.Blue,
    icon,
    size = Sizes.SM,
    className,
    children,
    ...other
  } = props;

  const Icon = icon ? icon : null;
  return (
    <div
      ref={ref}
      className={clsx(
        "flex-shrink-0 inline-flex justify-center items-center",
        getColorVariantsFromColorThemeValue(getColor(color).darkText).textColor,
        getColorVariantsFromColorThemeValue(getColor(color).lightBackground).bgColor,
        borderRadius.full.all,
        badgeProportions[size].paddingX,
        badgeProportions[size].paddingY,
        badgeProportions[size].fontSize,
        className,
      )}
      {...other}
    >
      {Icon ? (
        <Icon className={clsx(iconElem(), iconSizes[size].height, iconSizes[size].width)} />
      ) : null}
      <p className={textElem}>{children ?? text}</p>
    </div>
  );
});

export default Badge;
