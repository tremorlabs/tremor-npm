import React from "react";
import { makeClassName, tremorTwMerge } from "lib";

const makeTableCellClassName = makeClassName("TableCell");

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <td
        ref={ref}
        className={tremorTwMerge(
          makeTableCellClassName("root"),
          "align-middle whitespace-nowrap text-left p-4",
          className,
        )}
        {...other}
      >
        {children}
      </td>
    </>
  );
});

TableCell.displayName = "TableCell";

export default TableCell;
