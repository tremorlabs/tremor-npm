import { tremorTwMerge } from "lib";
import React from "react";

const TableFooterCell = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>(({ children, className, ...other }, ref) => {
  return (
    <th
      ref={ref}
      className={tremorTwMerge("text-tremor-content top-0 px-4 py-3.5 font-medium", className)}
      {...other}
    >
      {children}
    </th>
  );
});

TableFooterCell.displayName = "TableFooterCell";

export { TableFooterCell };
