import { makeClassName, spacing, tremorTwMerge } from "lib";
import React from "react";

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
          "align-middle whitespace-nowrap text-left",
          spacing.twoXl.paddingAll,
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
