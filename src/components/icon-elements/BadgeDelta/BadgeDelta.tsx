import React from "react";
import { twMerge } from "tailwind-merge";

import { DeltaType, DeltaTypes, Size, makeClassName, spacing } from "../../../lib";
import { Sizes, borderRadius, mapInputsToDeltaType } from "lib";
import {
  badgeProportionsIconOnly,
  badgeProportionsWithText,
  colors,
  deltaIcons,
  iconSizes,
} from "./styles";

const makeBadgeDeltaClassName = makeClassName("BadgeDelta");

export interface BadgeDeltaProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string; // Deprecated
  deltaType?: DeltaType;
  isIncreasePositive?: boolean;
  size?: Size;
}

const BadgeDelta = React.forwardRef<HTMLSpanElement, BadgeDeltaProps>((props, ref) => {
  const {
    text,
    deltaType = DeltaTypes.Increase,
    isIncreasePositive = true,
    size = Sizes.SM,
    children,
    className,
    ...other
  } = props;

  if (text)
    console.log(
      "DeprecationWarning: The `text` property is deprecated and will be removed in the next major release. Please use children instead",
    );

  const Icon = deltaIcons[deltaType];
  const mappedDeltaType = mapInputsToDeltaType(deltaType, isIncreasePositive);
  const badgeProportions = children || text ? badgeProportionsWithText : badgeProportionsIconOnly;

  return (
    <span
      ref={ref}
      className={twMerge(
        makeBadgeDeltaClassName("root"),
        "w-max flex-shrink-0 inline-flex justify-center items-center",
        borderRadius.full.all,
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
        className={twMerge(
          makeBadgeDeltaClassName("icon"),
          text
            ? twMerge(spacing.twoXs.negativeMarginLeft, spacing.xs.marginRight)
            : iconSizes[size].height,
          iconSizes[size].width,
        )}
      />
      {children || text ? (
        <p className={twMerge(makeBadgeDeltaClassName("text"), "text-sm whitespace-nowrap")}>
          {children ?? text}
        </p>
      ) : null}
    </span>
  );
});

export default BadgeDelta;
