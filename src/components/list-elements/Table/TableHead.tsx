import React from "react";
import clsx from "clsx";

import { defaultColors, fontWeight, getColorVariantsFromColorThemeValue } from "lib";

interface TableHeadProps {
  children: React.ReactElement[] | React.ReactElement;
}

const TableHead = ({ children }: TableHeadProps) => (
  <>
    <thead
      className={clsx(
        "text-left",
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        fontWeight.lg,
      )}
    >
      {children}
    </thead>
  </>
);

export default TableHead;
