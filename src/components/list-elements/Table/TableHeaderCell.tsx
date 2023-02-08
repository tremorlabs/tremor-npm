import React from "react";
import { twMerge } from "tailwind-merge";

import { defaultColors, fontWeight, getColorVariantsFromColorThemeValue, spacing } from "lib";

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
          getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
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
