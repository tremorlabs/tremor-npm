"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { Sizes, getColorClassNames, makeClassName, mergeRefs, spacing } from "lib";
import { Color, Size } from "../../../lib";
import { badgeProportions, iconSizes } from "./styles";
import { colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

const makeBadgeClassName = makeClassName("Badge");

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: Color;
  size?: Size;
  icon?: React.ElementType;
  tooltip?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { color, icon, size = Sizes.SM, tooltip, className, children, ...other } = props;

  const Icon = icon ? icon : null;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <span
      ref={mergeRefs([ref, tooltipProps.refs.setReference])}
      className={tremorTwMerge(
        makeBadgeClassName("root"),
        // common
        "w-max flex-shrink-0 inline-flex justify-center items-center cursor-default rounded-tremor-full",
        color
          ? tremorTwMerge(
              getColorClassNames(color, colorPalette.lightBackground).bgColor,
              getColorClassNames(color, colorPalette.darkText).textColor,
            )
          : tremorTwMerge(
              // light
              "bg-tremor-brand-muted text-tremor-brand-emphasis",
              // dark
              "dark:bg-dark-tremor-brand-muted dark:text-dark-tremor-brand-emphasis",
            ),
        badgeProportions[size].paddingX,
        badgeProportions[size].paddingY,
        badgeProportions[size].fontSize,
        className,
      )}
      {...getReferenceProps}
      {...other}
    >
      <Tooltip text={tooltip} {...tooltipProps} />
      {Icon ? (
        <Icon
          className={tremorTwMerge(
            makeBadgeClassName("icon"),
            "shrink-0",
            spacing.twoXs.negativeMarginLeft,
            spacing.xs.marginRight,
            iconSizes[size].height,
            iconSizes[size].width,
          )}
        />
      ) : null}
      <p className={tremorTwMerge(makeBadgeClassName("text"), "text-sm whitespace-nowrap")}>
        {children}
      </p>
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;
