import React from "react";
import { twMerge } from "tailwind-merge";

import {
  borderRadius,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <div
        ref={ref}
        className={twMerge(
          "w-full mx-auto",
          getColorVariantsFromColorThemeValue(defaultColors.background).bgColor,
          sizing.threeXs.height,
          spacing.threeXl.marginTop,
          spacing.threeXl.marginBottom,
          borderRadius.lg.all,
          className,
        )}
        {...other}
      />
    );
  },
);

export default Divider;
