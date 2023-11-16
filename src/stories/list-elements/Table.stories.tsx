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
    productivity: "n/a",
  },
  {
    id: 2,
    name: "Jon Doe",
    sales: "2.202.000",
    region: "Region B",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 110,
    productivity: "n/a",
  },
  {
    id: 3,
    name: "Peter Doe",
    sales: "1.505.000",
    region: "Region C",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 90,
    productivity: "n/a",
  },
  {
    id: 4,
    name: "Employee 4",
    sales: "500000",
    region: "Region D",
    status: "overperforming",
    deltaType: "moderateDecrease",
    hours: 92,
    productivity: "n/a",
  },
  {
    id: 5,
    name: "Employee 5",
    sales: "600000",
    region: "Region E",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 95,
    productivity: "n/a",
  },
  {
    id: 6,
    name: "Employee 6",
    sales: "700000",
    region: "Region F",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 98,
    productivity: "n/a",
  },
  {
    id: 7,
    name: "Employee 7",
    sales: "800000",
    region: "Region G",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 101,
    productivity: "n/a",
  },
  {
    id: 8,
    name: "Employee 8",
    sales: "900000",
    region: "Region H",
    status: "overperforming",
    deltaType: "moderateDecrease",
    hours: 104,
    productivity: "n/a",
  },
  {
    id: 9,
    name: "Employee 9",
    sales: "1000000",
    region: "Region I",
    status: "underperforming",
    deltaType: "moderateIncrease",
    hours: 107,
    productivity: "n/a",
  },
  {
    id: 10,
    name: "Employee 10",
    sales: "1100000",
    region: "Region J",
    status: "overperforming",
    deltaType: "moderateDecrease",
    hours: 110,
    productivity: "n/a",
  },
  {
    id: 11,
    name: "Employee 11",
    sales: "1200000",
    region: "Region K",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 113,
    productivity: "n/a",
  },
  {
    id: 12,
    name: "Employee 12",
    sales: "1300000",
    region: "Region L",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 116,
    productivity: "n/a",
  },
  {
    id: 13,
    name: "Employee 13",
    sales: "1400000",
    region: "Region M",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 119,
    productivity: "n/a",
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
          <TableHeaderCell className="text-right">Productivity</TableHeaderCell>
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
export const Sticky: Story = {
  render: (args) => (
    <div className="h-[30rem] w-[40rem] overflow-auto resize  m-5">
      <Table {...args} className="border-separate border-spacing-0 w-full">
        <TableHead className="">
          <TableRow>
            <TableHeaderCell className="sticky left-0 top-0 z-20 border-r border-b bg-white">
              Name
            </TableHeaderCell>
            <TableHeaderCell className="bg-white sticky top-0 border-b">Sales ($)</TableHeaderCell>
            <TableHeaderCell className="bg-white sticky top-0 border-b">Region</TableHeaderCell>
            <TableHeaderCell className="bg-white sticky top-0 border-b">Status</TableHeaderCell>
            <TableHeaderCell className="text-right bg-white sticky top-0 border-b">
              Working Hours (h)
            </TableHeaderCell>
            <TableHeaderCell className="text-right bg-white sticky top-0 border-b">
              Productivity
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="sticky left-0 z-10 bg-white border-r">{item.name}</TableCell>
              <TableCell className="text-right">{item.sales}</TableCell>
              <TableCell>{item.region}</TableCell>
              <TableCell>
                <BadgeDelta deltaType={item.deltaType as DeltaType} size="xs">
                  {item.status}
                </BadgeDelta>
              </TableCell>
              <TableCell className="text-right">{item.hours}</TableCell>
              <TableCell className="text-right">{item.productivity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFoot className="sticky bottom-0 bg-white z-10">
          <TableRow>
            <TableFooterCell className="sticky left-0 top-0 z-20 bg-white border-r border-t"></TableFooterCell>
            <TableFooterCell className="text-right border-t">Tot: 4642</TableFooterCell>
            <TableFooterCell className="border-t"></TableFooterCell>
            <TableFooterCell className="border-t"></TableFooterCell>
            <TableFooterCell className="text-right border-t">Avg: 15h</TableFooterCell>
            <TableFooterCell className="text-right border-t">Avg: n/a</TableFooterCell>
          </TableRow>
        </TableFoot>
      </Table>
    </div>
  ),
};
