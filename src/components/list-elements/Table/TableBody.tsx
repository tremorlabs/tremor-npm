import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

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
