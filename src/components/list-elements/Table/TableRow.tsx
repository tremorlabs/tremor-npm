import React from "react";

export interface TableRowProps {
  children: React.ReactNode;
}

const TableRow = ({ children }: TableRowProps) => {
  return (
    <>
      <tr>{children}</tr>
    </>
  );
};

export default TableRow;
