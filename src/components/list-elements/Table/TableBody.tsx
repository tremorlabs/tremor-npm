import React from "react";
import clsx from "clsx";

import { defaultColors, getColorVariantsFromColorThemeValue } from "lib";

interface TableBodyProps {
  children: React.ReactElement[] | React.ReactElement;
}

const TableBody = ({ children }: TableBodyProps) => (
  <>
    <tbody
      className={clsx(
        "align-top overflow-x-auto divide-y",
        getColorVariantsFromColorThemeValue(defaultColors.lightBorder).divideColor,
      )}
    >
      {children}
    </tbody>
  </>
);

export default TableBody;
