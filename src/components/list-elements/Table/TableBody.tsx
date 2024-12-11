import { tremorTwMerge } from "lib";
import React from "react";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ children, className, ...other }, ref) => {
  return (
    <>
      <tbody
        ref={ref}
        className={tremorTwMerge("divide-tremor-border-default divide-y align-top", className)}
        {...other}
      >
        {children}
      </tbody>
    </>
  );
});

TableBody.displayName = "TableBody";

export { TableBody };
