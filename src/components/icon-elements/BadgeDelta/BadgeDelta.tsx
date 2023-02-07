import React from "react";
import clsx from "clsx";

import { DeltaType, DeltaTypes, MarginTop, Size } from "../../../lib";
import { Sizes, borderRadius, mapInputsToDeltaType } from "lib";
import {
  badgeProportionsIconOnly,
  badgeProportionsWithText,
  colors,
  deltaIcons,
  iconSizes,
} from "./styles";
import { iconElem, textElem } from "lib/baseStyles";

export interface BadgeDeltaProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  deltaType?: DeltaType;
  isIncreasePositive?: boolean;
  size?: Size;
  marginTop?: MarginTop;
}

const BadgeDelta = React.forwardRef<HTMLDivElement, BadgeDeltaProps>((props, ref) => {
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
    <div
      ref={ref}
      className={clsx(
        "flex-shrink-0 inline-flex justify-center items-center",
        borderRadius.full.all,
        colors[mappedDeltaType].bgColor,
        colors[mappedDeltaType].textColor,
        badgeProportions[size].paddingLeft,
        badgeProportions[size].paddingRight,
        badgeProportions[size].paddingTop,
        badgeProportions[size].paddingBottom,
        badgeProportions[size].fontSize,
        className,
      )}
      {...other}
    >
      <Icon className={clsx(text ?? iconElem(), iconSizes[size].height, iconSizes[size].width)} />
      {children || text ? <p className={textElem}>{children ?? text}</p> : null}
    </div>
  );
});

export default BadgeDelta;
