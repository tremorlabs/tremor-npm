import React from "react";
import { twMerge } from "tailwind-merge";

import { fontSize, fontWeight, getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

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
            "w-full tabular-nums",
            getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
            fontSize.sm,
            fontWeight.sm,
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
