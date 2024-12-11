import { tremorTwMerge } from "lib";
import React from "react";

const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ children, className, ...other }, ref) => {
  return (
    <th
      ref={ref}
      className={tremorTwMerge(
        "text-tremor-content-strong top-0 px-4 py-3.5 text-left font-semibold whitespace-nowrap",
        className,
      )}
      {...other}
    >
      {children}
    </th>
  );
});

TableHeaderCell.displayName = "TableHeaderCell";

export { TableHeaderCell };
