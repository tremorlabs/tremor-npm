import React from "react";

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableFooterCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "components";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import BadgeDelta from "components/icon-elements/BadgeDelta/BadgeDelta";
import { DeltaType } from "lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ListElements/Table",
  component: Table,
} as ComponentMeta<typeof Table>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

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
    name: "Jane Doe",
    sales: "1.000.000",
    region: "Region A",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 100,
  },
  {
    id: 5,
    name: "Jackson Doe",
    sales: "2.202.000",
    region: "Region B",
    status: "overperforming",
    deltaType: "moderateIncrease",
    hours: 110,
  },
  {
    id: 6,
    name: "Robert Doe",
    sales: "1.505.000",
    region: "Region C",
    status: "underperforming",
    deltaType: "moderateDecrease",
    hours: 90,
  },
];

const Template: ComponentStory<typeof Table> = (args) => {
  return (
    <Card>
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
    </Card>
  );
};
const paginationConfig = {
  pageSize: 1,
  allowEndStartButtons: true,
};
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: undefined,
};

export const WithPaginationWithDefaultVariant = Template.bind({});
WithPaginationWithDefaultVariant.args = {
  children: undefined,
  paginationConfig: {
    ...paginationConfig,
    visibleButtons: 3,
  },
};

export const WithPaginationWithOnlyArrows = Template.bind({});
WithPaginationWithOnlyArrows.args = {
  children: undefined,
  paginationConfig: {
    ...paginationConfig,
    variant: "only_arrows",
    color: "green",
  },
};

export const WithPaginationWithInput = Template.bind({});
WithPaginationWithInput.args = {
  children: undefined,
  paginationConfig: {
    ...paginationConfig,
    variant: "with_input",
    color: "red",
  },
};
