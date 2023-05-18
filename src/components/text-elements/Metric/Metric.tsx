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
        "font-tremor-semibold text-tremor-content-emphasis text-tremor-3xl",
        color && getColorClassNames(color, colorPalette.darkText).textColor,
        className,
      )}
      {...other}
    >
      {children}
    </p>
  );
});

export default Metric;
