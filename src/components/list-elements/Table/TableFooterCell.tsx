import { makeClassName, spacing, tremorTwMerge } from "lib";
import React from "react";

const makeTableFooterCellClassName = makeClassName("TableFooterCell");

const TableFooterCell = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <th
        ref={ref}
        className={tremorTwMerge(
          makeTableFooterCellClassName("root"),
          // common
          //"whitespace-nowrap text-left font-semibold",
          // light
          "text-tremor-content font-medium",
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

TableFooterCell.displayName = "TableFooterCell";

export default TableFooterCell;
