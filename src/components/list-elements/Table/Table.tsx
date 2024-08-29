import React from "react";
import { makeClassName, tremorTwMerge } from "lib";

const makeTableClassName = makeClassName("Table");

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    if (process.env.NODE_ENV === "development") {
      console.info(
        "The Table is also available as a copy-and-paste component. Visit https://tremor.so/docs/ui/table (This is only shown in development)",
      );
    }

    return (
      <div className={tremorTwMerge(makeTableClassName("root"), "overflow-auto", className)}>
        <table
          ref={ref}
          className={tremorTwMerge(
            makeTableClassName("table"),
            // common
            "w-full text-tremor-default",
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
