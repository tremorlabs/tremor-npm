import React from "react";
import { twMerge } from "tailwind-merge";

import { spacing } from "lib";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <td
        ref={ref}
        className={twMerge(
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
