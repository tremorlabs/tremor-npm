import React from "react";

import {
  borderRadius,
  classNames,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

const Divider = () => (
  <div
    className={classNames(
      "tremor-base tr-w-full tr-mx-auto",
      getColorVariantsFromColorThemeValue(defaultColors.background).bgColor,
      sizing.threeXs.height,
      spacing.threeXl.marginTop,
      spacing.threeXl.marginBottom,
      borderRadius.lg.all
    )}
  />
);

export default Divider;
