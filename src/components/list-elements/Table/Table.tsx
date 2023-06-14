import React from "react";
import { tremorTwMerge } from "lib";

import { makeClassName } from "lib";

const makeTableClassName = makeClassName("Table");

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <div className={tremorTwMerge(makeTableClassName("root"), "overflow-auto", className)}>
        <table
          ref={ref}
          className={tremorTwMerge(
            makeTableClassName("table"),
            // common
            "w-full tabular-nums text-tremor-default",
            // light
            "text-tremor-content",
            // dark
            "dark:text-dark-tremor-content",
          )}
          {...other}
        >
          {children}
        </table>
      </div>
    );
  },
);

Table.displayName = "Table";

export default Table;
