import React from "react";

import { makeClassName } from "lib";
import { tremorTwMerge } from "lib";

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

export default TableRow;
