import React from "react";
import { render } from "@testing-library/react";

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
  test("renders the List component with colSpan and rowSpan", () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="align-baseline" rowSpan={2}>
              # ID
            </TableHeaderCell>
            <TableHeaderCell colSpan={4}>Personal</TableHeaderCell>
            <TableHeaderCell className="text-right">Stats</TableHeaderCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Sales ($)</TableHeaderCell>
            <TableHeaderCell>Region</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="text-right">Working Hours (h)</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Peter Doe</TableCell>
            <TableCell>1.000.000</TableCell>
            <TableCell>Region A</TableCell>
            <TableCell>211</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
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
