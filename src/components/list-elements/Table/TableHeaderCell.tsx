import React from "react";
import { twMerge } from "tailwind-merge";

import { fontWeight, getColorClassNames, makeClassName, spacing } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

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
          "sticky whitespace-nowrap text-left",
          getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
          spacing.none.top,
          spacing.twoXl.paddingX,
          spacing.xl.paddingY,
          fontWeight.lg,
          className,
        )}
        {...other}
      >
        {children}
      </th>
    </>
  );
});

TableHeaderCell.displayName = "TableHeaderCell";

export default TableHeaderCell;
