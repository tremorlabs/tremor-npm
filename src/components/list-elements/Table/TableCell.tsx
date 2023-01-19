import React, { forwardRef } from "react";

import { TextAlignments, classNames, parseTextAlignment, spacing } from "lib";
import { TextAlignment } from "../../../lib/inputTypes";

export interface TableCellProps {
  textAlignment?: TextAlignment;
  children: React.ReactNode;
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ textAlignment = TextAlignments.Left, children }, ref) => {
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
          ref={ref}
        >
          {children}
        </td>
      </>
    );
  }
);

export default TableCell;
