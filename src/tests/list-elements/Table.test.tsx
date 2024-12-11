import { render } from "@testing-library/react";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "components";
import React from "react";

describe("List", () => {
  test("renders the List component with default props", () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Sales ($)</TableHeaderCell>
            <TableHeaderCell>Region</TableHeaderCell>
            <TableHeaderCell>Working Hours (h)</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Peter Doe</TableCell>
            <TableCell>1.000.000</TableCell>
            <TableCell>Region A</TableCell>
            <TableCell>211</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Peter Doe</TableCell>
            <TableCell>1.000.000</TableCell>
            <TableCell>Region A</TableCell>
            <TableCell>211</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
  });
});
