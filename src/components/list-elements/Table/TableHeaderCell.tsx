import React from "react";
import { twMerge } from "tailwind-merge";

import { makeClassName, spacing } from "lib";
const makeTableHeaderCellClassName = makeClassName("TableHeaderCell");

const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <th
        ref={ref}
        className={twMerge(
          makeTableHeaderCellClassName("root"),
          "sticky whitespace-nowrap text-left text-tremor-content",
          spacing.none.top,
          spacing.twoXl.paddingX,
          spacing.xl.paddingY,
          className,
        )}
        {...other}
      >
        {children}
      </th>
    </>
  );
});

export default TableHeaderCell;
