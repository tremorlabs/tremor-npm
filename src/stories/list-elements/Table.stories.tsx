import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableFooterCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "components";

import BadgeDelta from "components/icon-elements/BadgeDelta/BadgeDelta";
import { DeltaType } from "lib";

const meta: Meta<typeof Table> = {
  title: "UI/List/Table",
  component: Table,
  parameters: {
    sourceLink: "https://github.com/tremorlabs/tremor/tree/main/src/components/list-elements/Table",
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const data = [
  {
    id: 1,
    name: "Peter Doe",
    sales: "1.000.000",
    region: "Region A",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 100,
  },
  {
    id: 2,
    name: "Jon Doe",
    sales: "2.202.000",
    region: "Region B",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 110,
  },
  {
    id: 3,
    name: "Peter Doe",
    sales: "1.505.000",
    region: "Region C",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 90,
  },
];

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Sales ($)</TableHeaderCell>
          <TableHeaderCell>Region</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell className="text-right">Working Hours (h)</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right">{item.sales}</TableCell>
            <TableCell>{item.region}</TableCell>
            <TableCell>
              <BadgeDelta deltaType={item.deltaType as DeltaType} size="xs">
                {item.status}
              </BadgeDelta>
            </TableCell>
            <TableCell className="text-right">{item.hours}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableFooterCell></TableFooterCell>
          <TableFooterCell className="text-right">4642</TableFooterCell>
          <TableFooterCell></TableFooterCell>
          <TableFooterCell></TableFooterCell>
          <TableFooterCell className="text-right">15h</TableFooterCell>
        </TableRow>
      </TableFoot>
    </Table>
  ),
  args: {
    children: undefined,
  },
};
