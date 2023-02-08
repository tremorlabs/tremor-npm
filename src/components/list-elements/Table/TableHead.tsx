import React from "react";
import clsx from "clsx";

import { defaultColors, fontWeight, getColorVariantsFromColorThemeValue } from "lib";

const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <thead
        ref={ref}
        className={clsx(
          "text-left",
          getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
          fontWeight.lg,
          className,
        )}
        {...other}
      >
        {children}
      </thead>
    </>
  );
});

export default TableHead;
