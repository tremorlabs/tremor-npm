"use client";
import React from "react";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import {
  Color,
  getColorClassNames,
  makeClassName,
  mergeRefs,
  Size,
  Sizes,
  tremorTwMerge,
  colorPalette,
} from "lib";
import { badgeProportions, iconSizes } from "./styles";

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
        "w-max shrink-0 inline-flex justify-center items-center cursor-default rounded-tremor-small ring-1 ring-inset",
        color
          ? tremorTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              getColorClassNames(color, colorPalette.iconText).textColor,
              getColorClassNames(color, colorPalette.iconRing).ringColor,
              // light
              "bg-opacity-10 ring-opacity-20",
              // dark
              "dark:bg-opacity-5 dark:ring-opacity-60",
            )
          : tremorTwMerge(
              // light
              "bg-tremor-brand-faint text-tremor-brand-emphasis ring-tremor-brand/20",
              // dark
              "dark:bg-dark-tremor-brand-muted/50 dark:text-dark-tremor-brand dark:ring-dark-tremor-subtle/20",
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
            "shrink-0 -ml-1 mr-1.5",
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
});

Badge.displayName = "Badge";

export default Badge;
