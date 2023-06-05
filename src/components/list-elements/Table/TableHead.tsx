import React from "react";
import { tremorTwMerge } from "lib";

import { makeClassName } from "lib";

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
