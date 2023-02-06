import React from "react";
import clsx from "clsx";

import { defaultColors, getColorVariantsFromColorThemeValue, parseMarginTop } from "lib";
import { MarginTop } from "../../../lib/inputTypes";

export interface ListProps {
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const List = ({ marginTop = "mt-0", children }: ListProps) => {
  return (
    <ul
      className={clsx(
        "tremor-base list-element w-full overflow-hidden divide-y",
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        getColorVariantsFromColorThemeValue(defaultColors.lightBorder).divideColor,
        parseMarginTop(marginTop),
      )}
    >
      {children}
    </ul>
  );
};

export default List;
