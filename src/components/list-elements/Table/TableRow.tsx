import React from "react";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  (props, ref) => {
    const { children, ...other } = props;
    return (
      <>
        <tr ref={ref} {...other}>
          {children}
        </tr>
      </>
    );
  },
);

export default TableRow;
