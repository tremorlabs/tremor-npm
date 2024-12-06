"use client";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { Color, makeClassName, mergeRefs, Size, Sizes, tremorTwMerge } from "lib";
import React from "react";
import { badgeColors, badgeProportions, iconSizes } from "./styles";

const makeBadgeClassName = makeClassName("Badge");

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: Color;
  size?: Size;
  icon?: React.ElementType;
  tooltip?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      color = "brand",
      icon: Icon,
      size = Sizes.SM,
      tooltip,
      className,
      children,
      ...forwardedProps
    },
    ref,
  ) => {
    const colors = badgeColors[color];
    const { tooltipProps, getReferenceProps } = useTooltip();

    return (
      <span
        ref={mergeRefs([ref, tooltipProps.refs.setReference])}
        className={tremorTwMerge(
          makeBadgeClassName("root"),
          // common
          "rounded-tremor-small inline-flex w-max shrink-0 cursor-default items-center justify-center ring-1 ring-inset",
          colors,
          badgeProportions[size].paddingX,
          badgeProportions[size].paddingY,
          badgeProportions[size].fontSize,
          className,
        )}
        {...getReferenceProps}
        {...forwardedProps}
      >
        <Tooltip text={tooltip} {...tooltipProps} />
        {Icon ? (
          <Icon
            className={tremorTwMerge(
              makeBadgeClassName("icon"),
              "mr-1.5 -ml-1 shrink-0",
              iconSizes[size].height,
              iconSizes[size].width,
            )}
          />
        ) : null}
        <span className={tremorTwMerge(makeBadgeClassName("text"), "whitespace-nowrap")}>
          {children}
        </span>
      </span>
    );
  },
);

Badge.displayName = "Badge";

export default Badge;
