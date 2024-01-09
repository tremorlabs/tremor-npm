import React from "react";
import { makeClassName, tremorTwMerge } from "lib";

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
          "top-0 px-4 py-3.5",
          // light
          "text-tremor-content font-medium",
          // dark
          "dark:text-dark-tremor-content",
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
