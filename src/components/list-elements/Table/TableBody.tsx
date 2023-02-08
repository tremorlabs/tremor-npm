import React from "react";
import { twMerge } from "tailwind-merge";

import { defaultColors, getColorVariantsFromColorThemeValue } from "lib";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <tbody
        ref={ref}
        className={twMerge(
          "align-top overflow-x-auto divide-y",
          getColorVariantsFromColorThemeValue(defaultColors.lightBorder).divideColor,
          className,
        )}
        {...other}
      >
        {children}
      </tbody>
    </>
  );
});

export default TableBody;
