import React from "react";
import { tremorTwMerge } from "lib";

import { getColorClassNames } from "lib";
import { Color } from "../../../lib";
import { colorPalette } from "lib/theme";

export interface MetricProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Metric = React.forwardRef<HTMLParagraphElement, MetricProps>((props, ref) => {
  const { color, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={tremorTwMerge(
        // common
        "font-semibold text-tremor-metric",
        // light
        "text-tremor-content-emphasis",
        // dark
        "dark:text-dark-tremor-content-emphasis",
        color && getColorClassNames(color, colorPalette.darkText).textColor,
        className,
      )}
      {...other}
    >
      {children}
    </p>
  );
});

Metric.displayName = "Metric";

export default Metric;
