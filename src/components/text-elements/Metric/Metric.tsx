import { tremorTwMerge } from "lib";
import React from "react";

import { getColorClassNames } from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib";

export interface MetricProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Metric = React.forwardRef<HTMLParagraphElement, MetricProps>((props, ref) => {
  const { color, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={tremorTwMerge(
        "font-semibold text-tremor-metric",
        color
          ? getColorClassNames(color, colorPalette.darkText).textColor
          : "text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis",
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
