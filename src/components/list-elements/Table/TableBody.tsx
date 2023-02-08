import React from "react";
import clsx from "clsx";

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
        className={clsx(
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
