import React from "react";
import { tremorTwMerge } from "lib";

import { makeClassName } from "lib";

const makeTableBodyClassName = makeClassName("TableBody");

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <tbody
        ref={ref}
        className={tremorTwMerge(
          makeTableBodyClassName("root"),
          // common
          "align-top overflow-x-auto divide-y",
          // light
          "divide-tremor-border",
          // dark
          "dark:divide-dark-tremor-border",
          className,
        )}
        {...other}
      >
        {children}
      </tbody>
    </>
  );
});

TableBody.displayName = "TableBody";

export default TableBody;
