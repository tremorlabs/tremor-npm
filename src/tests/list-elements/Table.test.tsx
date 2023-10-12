import { render } from "@testing-library/react";
import React from "react";

import Table from "components/list-elements/Table/Table";
import TableBody from "components/list-elements/Table/TableBody";
import TableCell from "components/list-elements/Table/TableCell";
import TableHead from "components/list-elements/Table/TableHead";
import TableHeaderCell from "components/list-elements/Table/TableHeaderCell";
import TableRow from "components/list-elements/Table/TableRow";

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
