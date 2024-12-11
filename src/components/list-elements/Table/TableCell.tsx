import { tremorTwMerge } from "lib";
import React from "react";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ children, className, ...other }, ref) => {
  return (
    <td
      ref={ref}
      className={tremorTwMerge("p-4 text-left align-middle whitespace-nowrap", className)}
      {...other}
    >
      {children}
    </td>
  );
});

TableCell.displayName = "TableCell";

export { TableCell };
