"use client";
import { tremorTwMerge } from "lib";
import React from "react";

import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { makeClassName, mergeRefs, Sizes } from "lib";
import { Color, IconVariant, Size } from "../../../lib";
import { getIconColors, iconSizes, shape, wrapperProportions } from "./styles";

const makeIconClassName = makeClassName("Icon");

export const IconVariants: { [key: string]: IconVariant } = {
  Simple: "simple",
  Light: "light",
  Shadow: "shadow",
  Solid: "solid",
  Outlined: "outlined",
};

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: React.ElementType;
  variant?: IconVariant;
  tooltip?: string;
  size?: Size;
  color?: Color;
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    icon,
    variant = IconVariants.Simple,
    tooltip,
    size = Sizes.SM,
    color,
    className,
    ...other
  } = props;
  const Icon = icon;
  const iconColorStyles = getIconColors(variant, color);

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <span
      ref={mergeRefs([ref, tooltipProps.refs.setReference])}
      className={tremorTwMerge(
        makeIconClassName("root"),
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
      {...getReferenceProps}
      {...other}
    >
      <Tooltip text={tooltip} {...tooltipProps} />
      <Icon
        className={tremorTwMerge(
          makeIconClassName("icon"),
          "shrink-0",
          iconSizes[size].height,
          iconSizes[size].width,
        )}
      />
    </span>
  );
});

Icon.displayName = "Icon";

export default Icon;
