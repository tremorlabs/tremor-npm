import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeTableClassName = makeClassName("Table");

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <table
        ref={ref}
        className={tremorTwMerge(
          makeTableClassName("root"),
          // common
          "w-full tabular-nums text-tremor-default",
          // light
          "text-tremor-content",
          // dark
          "dark:text-dark-tremor-content",
          className,
        )}
        {...other}
      >
        {children}
      </table>
    );
  },
);

Table.displayName = "Table";

export default Table;
