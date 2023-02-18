import React from "react";
import { twMerge } from "tailwind-merge";

import { borderRadius, colorClassNames, sizing, spacing } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <div
        ref={ref}
        className={twMerge(
          "w-full mx-auto",
          colorClassNames[DEFAULT_COLOR][colorPalette.border].bgColor,
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
