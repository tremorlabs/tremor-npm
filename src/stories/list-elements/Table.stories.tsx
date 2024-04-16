import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "components";

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
  {
    id: 4,
    name: "Employee 4",
    sales: "500000",
    region: "Region D",
    status: "overperforming",
    deltaType: "moderateDecrease",
    hours: 92,
  },
  {
    id: 5,
    name: "Employee 5",
    sales: "600000",
    region: "Region E",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 95,
  },
  {
    id: 6,
    name: "Employee 6",
    sales: "700000",
    region: "Region F",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 98,
  },
  {
    id: 7,
    name: "Employee 7",
    sales: "800000",
    region: "Region G",
    status: "average",
    deltaType: "unchanged",
    hours: 101,
  },
  {
    id: 8,
    name: "Employee 8",
    sales: "900000",
    region: "Region H",
    status: "overperforming",
    deltaType: "moderateDecrease",
    hours: 104,
  },
  {
    id: 9,
    name: "Employee 9",
    sales: "1000000",
    region: "Region I",
    status: "underperforming",
    deltaType: "moderateIncrease",
    hours: 107,
  },
  {
    id: 10,
    name: "Employee 10",
    sales: "1100000",
    region: "Region J",
    status: "average",
    deltaType: "unchanged",
    hours: 110,
  },
  {
    id: 11,
    name: "Employee 11",
    sales: "1200000",
    region: "Region K",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 113,
  },
  {
    id: 12,
    name: "Employee 12",
    sales: "1300000",
    region: "Region L",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 116,
  },
  {
    id: 13,
    name: "Employee 13",
    sales: "1400000",
    region: "Region M",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 119,
  },
];

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell colSpan={3}>Name</TableHeaderCell>
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
              <BadgeDelta deltaType={item.deltaType as DeltaType} size="sm">
                {item.status}
              </BadgeDelta>
            </TableCell>
            <TableCell className="text-right">{item.hours}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  args: {
    children: undefined,
  },
};
