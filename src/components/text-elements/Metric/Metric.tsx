import React from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
} from "lib";
import { Color } from "../../../lib";

export interface MetricProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Metric = React.forwardRef<HTMLParagraphElement, MetricProps>((props, ref) => {
  const { color = BaseColors.Gray, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={twMerge(
        getColorVariantsFromColorThemeValue(getColor(color as Color).darkText).textColor,
        fontSize.threeXl,
        fontWeight.lg,
        className,
      )}
      {...other}
    >
      {children}
    </p>
  );
});

export default Metric;
