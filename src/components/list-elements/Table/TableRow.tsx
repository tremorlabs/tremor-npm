import React from "react";
import { makeClassName, tremorTwMerge } from "lib";

const makeRowClassName = makeClassName("TableRow");

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <>
        <tr ref={ref} className={tremorTwMerge(makeRowClassName("row"), className)} {...other}>
          {children}
        </tr>
      </>
    );
  },
);

TableRow.displayName = "TableRow";

export default TableRow;
