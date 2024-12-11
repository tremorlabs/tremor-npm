import React from "react";
import { makeClassName, tremorTwMerge } from "lib";

const makeTableHeaderCellClassName = makeClassName("TableHeaderCell");

const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <th
        ref={ref}
        className={tremorTwMerge(
          makeTableHeaderCellClassName("root"),
          // common
          "top-0 px-4 py-3.5 text-left font-semibold whitespace-nowrap",
          // light
          "text-tremor-content-strong",
          // dark
          "dark:text-dark-tremor-content-strong",
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
