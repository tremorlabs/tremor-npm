import React from "react";
import { twMerge } from "tailwind-merge";

import { colorClassNames } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

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
          colorClassNames[DEFAULT_COLOR][colorPalette.lightBorder].divideColor,
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
