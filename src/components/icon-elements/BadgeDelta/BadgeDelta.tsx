import React from "react";
import { twMerge } from "tailwind-merge";

import { DeltaType, DeltaTypes, Size, spacing } from "../../../lib";
import { Sizes, borderRadius, mapInputsToDeltaType } from "lib";
import {
  badgeProportionsIconOnly,
  badgeProportionsWithText,
  colors,
  deltaIcons,
  iconSizes,
} from "./styles";
import { textElem } from "lib/baseStyles";

export interface BadgeDeltaProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
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

  const Icon = deltaIcons[deltaType];
  const mappedDeltaType = mapInputsToDeltaType(deltaType, isIncreasePositive);
  const badgeProportions = children || text ? badgeProportionsWithText : badgeProportionsIconOnly;

  return (
    <span ref={ref} className={className} {...other}>
      <span
        className={twMerge(
          "flex-shrink-0 inline-flex justify-center items-center",
          borderRadius.full.all,
          colors[mappedDeltaType].bgColor,
          colors[mappedDeltaType].textColor,
          badgeProportions[size].paddingX,
          badgeProportions[size].paddingY,
          badgeProportions[size].fontSize,
        )}
      >
        <Icon
          className={twMerge(
            text
              ? twMerge(spacing.twoXs.negativeMarginLeft, spacing.xs.marginRight)
              : iconSizes[size].height,
            iconSizes[size].width,
          )}
        />
        {children || text ? <p className={textElem}>{children ?? text}</p> : null}
      </span>
    </span>
  );
});

export default BadgeDelta;
