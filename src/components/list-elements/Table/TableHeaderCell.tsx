import React from "react";
import { twMerge } from "tailwind-merge";

import { fontWeight, getColorClassNames, spacing } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

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

export default TableHeaderCell;
