import React from "react";

import {
  classNames,
  defaultColors,
  fontWeight,
  getColorVariantsFromColorThemeValue,
} from "lib";

interface TableHeadProps {
  children: React.ReactElement[] | React.ReactElement;
}

const TableHead = ({ children }: TableHeadProps) => (
  <>
    <thead
      className={classNames(
        "tr-text-left",
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        fontWeight.lg
      )}
    >
      {children}
    </thead>
  </>
);

export default TableHead;
