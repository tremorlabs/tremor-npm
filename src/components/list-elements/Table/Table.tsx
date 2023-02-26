import React from "react";
import { twMerge } from "tailwind-merge";

import { fontSize, fontWeight, getColorClassNames } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <div className={twMerge("overflow-auto", className)}>
        <table
          ref={ref}
          className={twMerge(
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

export default Table;
