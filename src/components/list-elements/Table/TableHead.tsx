import { tremorTwMerge } from "lib";
import React from "react";

const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ children, className, ...other }, ref) => {
  return (
    <>
      <thead
        ref={ref}
        className={tremorTwMerge("text-tremor-content-default text-left", className)}
        {...other}
      >
        {children}
      </thead>
    </>
  );
});

TableHead.displayName = "TableHead";

export { TableHead };
