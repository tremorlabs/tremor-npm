import React from "react";
import clsx from "clsx";

import { spacing } from "lib";
import { TextAlignment } from "../../../lib/inputTypes";

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  textAlignment?: TextAlignment;
}

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <td
        ref={ref}
        className={clsx(
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

export default TableCell;
