import { tremorTwMerge } from "lib";
import React from "react";

const TableFoot = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ children, className, ...other }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={tremorTwMerge(
        "text-tremor-content-default border-tremor-border-default border-t-[1px] text-left font-medium",
        className,
      )}
      {...other}
    >
      {children}
    </tfoot>
  );
});

TableFoot.displayName = "TableFoot";

export { TableFoot };
