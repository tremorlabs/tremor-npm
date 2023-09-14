import React from "react";
import { tremorTwMerge, makeClassName, spacing } from "lib";

const makeTableHeaderCellClassName = makeClassName("TableHeaderCell");

export interface TableHeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
  rowSpan?: number;
}

const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  (props, ref) => {
    const { children, className, colSpan, rowSpan, ...other } = props;
    return (
      <>
        <th
          ref={ref}
          className={tremorTwMerge(
            makeTableHeaderCellClassName("root"),
            // common
            "sticky whitespace-nowrap text-left font-semibold",
            // light
            "text-tremor-content",
            // dark
            "dark:text-dark-tremor-content",
            spacing.none.top,
            spacing.twoXl.paddingX,
            spacing.xl.paddingY,
            className,
          )}
          colSpan={colSpan}
          rowSpan={rowSpan}
          {...other}
        >
          {children}
        </th>
      </>
    );
  },
);

TableHeaderCell.displayName = "TableHeaderCell";

export default TableHeaderCell;
