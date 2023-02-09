import React from "react";
import { twMerge } from "tailwind-merge";

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

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  color?: Color;
  size?: Size;
  icon?: React.ElementType;
  tooltip?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
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
    <span ref={ref} className={className} {...other}>
      <span
        className={twMerge(
          "flex-shrink-0 inline-flex justify-center items-center",
          getColorVariantsFromColorThemeValue(getColor(color).darkText).textColor,
          getColorVariantsFromColorThemeValue(getColor(color).lightBackground).bgColor,
          borderRadius.full.all,
          badgeProportions[size].paddingX,
          badgeProportions[size].paddingY,
          badgeProportions[size].fontSize,
        )}
      >
        {Icon ? (
          <Icon className={twMerge(iconElem(), iconSizes[size].height, iconSizes[size].width)} />
        ) : null}
        <p className={textElem}>{children ?? text}</p>
      </span>
    </span>
  );
});

export default Badge;
