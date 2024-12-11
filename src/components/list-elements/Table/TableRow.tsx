import { tremorTwMerge } from "lib";
import React from "react";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ children, className, ...other }, ref) => {
    return (
      <tr ref={ref} className={tremorTwMerge(className)} {...other}>
        {children}
      </tr>
    );
  },
);

TableRow.displayName = "TableRow";

export { TableRow };
