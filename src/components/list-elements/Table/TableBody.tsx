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
          "align-top overflow-x-auto divide-y divide-tremor-border",
          className,
        )}
        {...other}
      >
        {children}
      </tbody>
    </>
  );
});

export default TableBody;
