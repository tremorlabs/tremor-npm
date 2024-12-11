import { tremorTwMerge } from "lib";
import React from "react";

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ children, className, ...other }, ref) => {
    return (
      <div className={tremorTwMerge("overflow-auto", className)}>
        <table
          ref={ref}
          className={tremorTwMerge("text-tremor-default text-tremor-content-default w-full")}
          {...other}
        >
          {children}
        </table>
      </div>
    );
  },
);

Table.displayName = "Table";

export { Table };
