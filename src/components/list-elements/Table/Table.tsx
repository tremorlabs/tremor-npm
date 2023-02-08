import React from "react";
import { twMerge } from "tailwind-merge";

import { defaultColors, fontSize, fontWeight, getColorVariantsFromColorThemeValue } from "lib";
import { MarginTop } from "../../../lib";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  marginTop?: MarginTop;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const { children, className, ...other } = props;

  return (
    <div className={twMerge("overflow-auto", className)}>
      <table
        ref={ref}
        className={twMerge(
          "w-full tabular-nums",
          getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
          fontSize.sm,
          fontWeight.sm,
        )}
        {...other}
      >
        {children}
      </table>
    </div>
  );
});

export default Table;
