import React from "react";
import clsx from "clsx";

import {
  borderRadius,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

const Divider = () => (
  <div
    className={clsx(
      "tremor-base w-full mx-auto",
      getColorVariantsFromColorThemeValue(defaultColors.background).bgColor,
      sizing.threeXs.height,
      spacing.threeXl.marginTop,
      spacing.threeXl.marginBottom,
      borderRadius.lg.all,
    )}
  />
);

export default Divider;
