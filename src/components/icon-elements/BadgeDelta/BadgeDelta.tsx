"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { DeltaType, DeltaTypes, Size, makeClassName, spacing } from "../../../lib";
import { Sizes, mapInputsToDeltaType } from "lib";
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
}

const BadgeDelta = React.forwardRef<HTMLSpanElement, BadgeDeltaProps>((props, ref) => {
  const {
    deltaType = DeltaTypes.Increase,
    isIncreasePositive = true,
    size = Sizes.SM,
    children,
    className,
    ...other
  } = props;

  const Icon = deltaIcons[deltaType];
  const mappedDeltaType = mapInputsToDeltaType(deltaType, isIncreasePositive);
  const badgeProportions = children ? badgeProportionsWithText : badgeProportionsIconOnly;

  return (
    <span
      ref={ref}
      className={tremorTwMerge(
        makeBadgeDeltaClassName("root"),
        // common
        "w-max flex-shrink-0 inline-flex justify-center items-center cursor-default",
        // light
        "rounded-tremor-full",
        // dark
        "dark:rounded-dark-tremor-full",
        colors[mappedDeltaType].bgColor,
        colors[mappedDeltaType].textColor,
        badgeProportions[size].paddingX,
        badgeProportions[size].paddingY,
        badgeProportions[size].fontSize,
        className,
      )}
      {...other}
    >
      <Icon
        className={tremorTwMerge(
          makeBadgeDeltaClassName("icon"),
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
