import React from "react";
import clsx from "clsx";

import { defaultColors, fontWeight, getColorVariantsFromColorThemeValue, spacing } from "lib";
import { TextAlignment } from "../../../lib/inputTypes";

interface TableHeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  textAlignment?: TextAlignment;
}

const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <>
        <th
          ref={ref}
          className={clsx(
            "sticky whitespace-nowrap text-left",
            getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
            spacing.none.top,
            spacing.twoXl.paddingX,
            spacing.xl.paddingY,
            fontWeight.lg,
            className,
          )}
          {...other}
        >
          {children}
        </th>
      </>
    );
  },
);

export default TableHeaderCell;
