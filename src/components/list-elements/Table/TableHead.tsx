import React from "react";
import { twMerge } from "tailwind-merge";

import { colorClassNames, fontWeight } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <thead
        ref={ref}
        className={twMerge(
          "text-left",
          colorClassNames[DEFAULT_COLOR][colorPalette.text].textColor,
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
