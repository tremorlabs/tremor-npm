import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

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
        className={tremorTwMerge(
          makeTableHeadClassName("root"),
          // common
          "text-left",
          // light
          "text-tremor-content",
          // dark
          "dark:text-dark-tremor-content",
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
