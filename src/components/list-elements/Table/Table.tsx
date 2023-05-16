import React from "react";
import { twMerge } from "tailwind-merge";

import { makeClassName } from "lib";

const makeTableClassName = makeClassName("Table");

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <div className={twMerge(makeTableClassName("root"), "overflow-auto", className)}>
        <table
          ref={ref}
          className={twMerge(
            makeTableClassName("table"),
            "w-full tabular-nums text-tremor-sm text-tremor-content font-tremor-default",
          )}
          {...other}
        >
          {children}
        </table>
      </div>
    );
  },
);

export default Table;
