import React from "react";
import { tremorTwMerge } from "lib";

import { makeClassName, spacing } from "lib";

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
          "align-middle whitespace-nowrap tabular-nums text-left",
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
