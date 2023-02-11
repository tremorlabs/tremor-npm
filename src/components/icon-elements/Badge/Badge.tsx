import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, Sizes, borderRadius, colorClassNames, spacing } from "lib";
import { Color, Size } from "../../../lib";
import { badgeProportions, iconSizes } from "./styles";
import { colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

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
    tooltip,
    className,
    children,
    ...other
  } = props;

  const Icon = icon ? icon : null;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <span ref={ref} className={className} {...other}>
        <span
          ref={tooltipProps.refs.setReference}
          className={twMerge(
            "flex-shrink-0 inline-flex justify-center items-center",
            colorClassNames[color][colorPalette.darkText].textColor,
            colorClassNames[color][colorPalette.lightBackground].bgColor,
            borderRadius.full.all,
            badgeProportions[size].paddingX,
            badgeProportions[size].paddingY,
            badgeProportions[size].fontSize,
          )}
          {...getReferenceProps}
        >
          {Icon ? (
            <Icon
              className={twMerge(
                spacing.twoXs.negativeMarginLeft,
                spacing.xs.marginRight,
                iconSizes[size].height,
                iconSizes[size].width,
              )}
            />
          ) : null}
          <p className="text-sm whitespace-nowrap">{children ?? text}</p>
        </span>
      </span>
    </>
  );
});

export default Badge;
