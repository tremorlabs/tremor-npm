import React from "react";
import { tremorTwMerge, makeClassName } from "lib";

const makeTableFootClassName = makeClassName("TableFoot");

const TableFoot = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <tfoot
        ref={ref}
        className={tremorTwMerge(
          makeTableFootClassName("root"),
          // common
          "text-left font-medium border-t-[1px] ",
          // light
          "text-tremor-content border-tremor-border",
          // dark
          "dark:text-dark-tremor-content dark:border-dark-tremor-border",
          className,
        )}
        {...other}
      >
        {children}
      </tfoot>
    </>
  );
});

TableFoot.displayName = "TableFoot";

export default TableFoot;
