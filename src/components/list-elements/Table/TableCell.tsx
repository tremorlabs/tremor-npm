import React from "react";
import clsx from "clsx";

import { TextAlignments, parseTextAlignment, spacing } from "lib";
import { TextAlignment } from "../../../lib/inputTypes";

export interface TableCellProps {
  textAlignment?: TextAlignment;
  children: React.ReactNode;
}

const TableCell = ({ textAlignment = TextAlignments.Left, children }: TableCellProps) => {
  return (
    <>
      <td
        className={clsx(
          "tr-align-middle tr-whitespace-nowrap tr-tabular-nums",
          parseTextAlignment(textAlignment),
          spacing.twoXl.paddingLeft,
          spacing.twoXl.paddingRight,
          spacing.twoXl.paddingTop,
          spacing.twoXl.paddingBottom,
        )}
      >
        {children}
      </td>
    </>
  );
};

export default TableCell;
