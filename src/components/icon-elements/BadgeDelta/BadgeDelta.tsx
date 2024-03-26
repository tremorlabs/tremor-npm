"use client";
import React from "react";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import {
  DeltaType,
  DeltaTypes,
  makeClassName,
  mapInputsToDeltaType,
  mergeRefs,
  Size,
  Sizes,
  tremorTwMerge,
} from "lib";
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
        "w-max shrink-0 inline-flex justify-center items-center cursor-default rounded-tremor-small ring-1 ring-inset",
        colors[mappedDeltaType].bgColor,
        colors[mappedDeltaType].textColor,
        colors[mappedDeltaType].ringColor,
        badgeProportions[size].paddingX,
        badgeProportions[size].paddingY,
        badgeProportions[size].fontSize,
        // light
        "bg-opacity-10 ring-opacity-20",
        // dark
        "dark:bg-opacity-5 dark:ring-opacity-60",
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
          children ? tremorTwMerge("-ml-1 mr-1.5") : iconSizes[size].height,
          iconSizes[size].width,
        )}
      />
      {children ? (
        <span className={tremorTwMerge(makeBadgeDeltaClassName("text"), "whitespace-nowrap")}>
          {children}
        </span>
      ) : null}
    </span>
  );
});

BadgeDelta.displayName = "BadgeDelta";

export default BadgeDelta;
