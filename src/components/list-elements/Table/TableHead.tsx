import React from "react";
import { twMerge } from "tailwind-merge";

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
        className={twMerge(
          makeTableHeadClassName("root"),
          "text-left text-tremor-content",
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
