import { makeClassName, spacing, tremorTwMerge } from "lib";
import React from "react";

const makeTableHeaderCellClassName = makeClassName("TableHeaderCell");

const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { children, className, ...other } = props;
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
        {...other}
      >
        {children}
      </th>
    </>
  );
});

TableHeaderCell.displayName = "TableHeaderCell";

export default TableHeaderCell;
