import React from "react";
import { twMerge } from "tailwind-merge";

import { fontWeight, getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeTableHeadClassName = makeClassName("TableHead");

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
          makeTableHeadClassName("root"),
          "text-left",
          getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
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

TableHead.displayName = "TableHead";

export default TableHead;
