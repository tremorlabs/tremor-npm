import React from "react";
import { twMerge } from "tailwind-merge";

import { borderRadius, getColorClassNames, makeClassName, sizing, spacing } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeDividerClassName = makeClassName("Divider");

const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <div
        ref={ref}
        className={twMerge(
          makeDividerClassName("root"),
          "w-full mx-auto",
          getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).bgColor,
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

Divider.displayName = "Divider";

export default Divider;
