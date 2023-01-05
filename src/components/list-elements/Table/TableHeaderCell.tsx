import React from "react";

import {
  TextAlignments,
  classNames,
  defaultColors,
  fontWeight,
  getColorVariantsFromColorThemeValue,
  parseTextAlignment,
  spacing,
} from "lib";
import { TextAlignment } from "../../../lib/inputTypes";

interface TableHeaderCellProps {
  textAlignment?: TextAlignment;
  children: React.ReactNode;
}

const TableHeaderCell = ({
  textAlignment = TextAlignments.Left,
  children,
}: TableHeaderCellProps) => (
  <>
    <th
      className={classNames(
        "tr-sticky tr-whitespace-nowrap",
        parseTextAlignment(textAlignment),
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        spacing.none.top,
        spacing.twoXl.paddingLeft,
        spacing.twoXl.paddingRight,
        spacing.xl.paddingTop,
        spacing.xl.paddingBottom,
        fontWeight.lg
      )}
    >
      {children}
    </th>
  </>
);

export default TableHeaderCell;
