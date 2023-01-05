import React from "react";

import { TextAlignments, classNames, parseTextAlignment, spacing } from "lib";
import { TextAlignment } from "../../../lib/inputTypes";

export interface TableCellProps {
  textAlignment?: TextAlignment;
  children: React.ReactNode;
}

const TableCell = ({
  textAlignment = TextAlignments.Left,
  children,
}: TableCellProps) => {
  return (
    <>
      <td
        className={classNames(
          "tr-align-middle tr-whitespace-nowrap tr-tabular-nums",
          parseTextAlignment(textAlignment),
          spacing.twoXl.paddingLeft,
          spacing.twoXl.paddingRight,
          spacing.twoXl.paddingTop,
          spacing.twoXl.paddingBottom
        )}
      >
        {children}
      </td>
    </>
  );
};

export default TableCell;
