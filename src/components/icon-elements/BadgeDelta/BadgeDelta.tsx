"use client";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import {
  DeltaType,
  DeltaTypes,
  makeClassName,
  mapInputsToDeltaType,
  mergeRefs,
  Size,
  Sizes,
  spacing,
  tremorTwMerge,
} from "lib";
import React from "react";
import {
  badgeProportionsIconOnly,
  badgeProportionsWithText,
  colors,
  deltaIcons,
  iconSizes,
} from "./styles";

const makeBadgeDeltaClassName = makeClassName("BadgeDelta");

export interface BadgeDeltaProps extends React.HTMLAttributes<HTMLSpanElement> {
  deltaType?: DeltaType;
  isIncreasePositive?: boolean;
  size?: Size;
  tooltip?: string;
}

const BadgeDelta = React.forwardRef<HTMLSpanElement, BadgeDeltaProps>((props, ref) => {
  const {
    deltaType = DeltaTypes.Increase,
    isIncreasePositive = true,
    size = Sizes.SM,
    tooltip,
    children,
    className,
    ...other
  } = props;

  const Icon = deltaIcons[deltaType];
  const mappedDeltaType = mapInputsToDeltaType(deltaType, isIncreasePositive);
  const badgeProportions = children ? badgeProportionsWithText : badgeProportionsIconOnly;
  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <span
      ref={mergeRefs([ref, tooltipProps.refs.setReference])}
      className={tremorTwMerge(
        makeBadgeDeltaClassName("root"),
        // common
        "w-max flex-shrink-0 inline-flex justify-center items-center cursor-default rounded-tremor-full bg-opacity-20 dark:bg-opacity-25",
        colors[mappedDeltaType].bgColor,
        colors[mappedDeltaType].textColor,
        badgeProportions[size].paddingX,
        badgeProportions[size].paddingY,
        badgeProportions[size].fontSize,
        className,
      )}
      {...getReferenceProps}
      {...other}
    >
      <Tooltip text={tooltip} {...tooltipProps} />
      <Icon
        className={tremorTwMerge(
          makeBadgeDeltaClassName("icon"),
          "shrink-0",
          children
            ? tremorTwMerge(spacing.twoXs.negativeMarginLeft, spacing.xs.marginRight)
            : iconSizes[size].height,
          iconSizes[size].width,
        )}
      />
      {children ? (
        <p className={tremorTwMerge(makeBadgeDeltaClassName("text"), "text-sm whitespace-nowrap")}>
          {children}
        </p>
      ) : null}
    </span>
  );
});

BadgeDelta.displayName = "BadgeDelta";

export default BadgeDelta;
