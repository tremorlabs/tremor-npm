import React from "react";

import {
  classNames,
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
  <div className="tr-overflow-auto">
    <table
      className={classNames(
        "tremor-base tr-w-full tr-tabular-nums",
        parseMarginTop(marginTop),
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        fontSize.sm,
        fontWeight.sm
      )}
    >
      {children}
    </table>
  </div>
);

export default Table;
