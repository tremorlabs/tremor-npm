import React from "react";
import clsx from "clsx";

import { BaseColors, Sizes } from "lib";
import { Color, IconVariant, MarginTop, Size } from "../../../lib";
import { getIconColors, iconSizes, shape, wrapperProportions } from "./styles";

export const IconVariants: { [key: string]: IconVariant } = {
  Simple: "simple",
  Light: "light",
  Shadow: "shadow",
  Solid: "solid",
  Outlined: "outlined",
};

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType;
  variant?: IconVariant;
  tooltip?: string;
  size?: Size;
  color?: Color;
  marginTop?: MarginTop;
}

const Icon = React.forwardRef<HTMLDivElement, IconProps>((props, ref) => {
  const {
    icon,
    variant = IconVariants.Simple,
    size = Sizes.SM,
    color = BaseColors.Blue,
    className,
    ...other
  } = props;
  const Icon = icon;
  const iconColorStyles = getIconColors(variant, color);

  return (
    <div
      ref={ref}
      className={clsx(
        "inline-flex flex-shrink-0 items-center",
        iconColorStyles.bgColor,
        iconColorStyles.textColor,
        iconColorStyles.borderColor,
        iconColorStyles.ringColor,
        shape[variant].rounded,
        shape[variant].border,
        shape[variant].shadow,
        shape[variant].ring,
        wrapperProportions[size].paddingX,
        wrapperProportions[size].paddingY,
        className,
      )}
      {...other}
    >
      <Icon className={clsx(iconSizes[size].height, iconSizes[size].width)} />
    </div>
  );
});

export default Icon;
