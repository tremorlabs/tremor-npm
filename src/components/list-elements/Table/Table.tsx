import React from "react";
import clsx from "clsx";

import {
  defaultColors,
  fontSize,
  fontWeight,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
} from "lib";
import { MarginTop } from "../../../lib";

export interface TableProps {
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const Table = ({ marginTop = "mt-0", children }: TableProps) => (
  <div className="overflow-auto">
    <table
      className={clsx(
        "tremor-base w-full tabular-nums",
        parseMarginTop(marginTop),
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        fontSize.sm,
        fontWeight.sm,
      )}
    >
      {children}
    </table>
  </div>
);

export default Table;
