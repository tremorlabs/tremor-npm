import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Card, BarList } from "components";

import { BaseColors } from "lib";
import { CalendarIcon } from "assets";
import { BarListProps } from "components/vis-elements/BarList/BarList";

const meta: Meta<typeof BarList> = {
  title: "Tremor/VisElements/BarList",
  component: BarList,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof BarList>;

const BarListResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <BarList {...args} />
      </Card>
    );
  },
};

const BarListTemplateColors: Story = {
  render: ({ ...args }) => {
    return (
      <div className="space-y-2">
        {Object.values(BaseColors).map((color) => (
          <Card key={color}>
            <BarList {...args} color={color} />
          </Card>
        ))}
      </div>
    );
  },
};

const BarListTemplateIndividualColors: Story = {
  render: ({ ...args }) => {
    return (
      <div className="space-y-2">
        <Card>
          <BarList {...args} />
        </Card>
      </div>
    );
  },
};

const getData = (
  additionalProps: Array<Record<string, unknown>> = [],
  additionalItems: BarListProps["data"] = [],
) => {
  const basicData = [
    { name: "/home", value: 100000000 },
    { name: "/imprint", value: 351 },
    { name: "/cancellation", value: 271 },
    {
      name: `/special-offer-august-getsahdkjhagskdfjhgakshjgdfkjahsgdfjkgasdjkhfgajkshgdfjkhagsdkjhfgajhksdgfjkhasdg
          fjkhagsdjhkgfasjkdgfjkasdhgkjgfdsk`,
      value: 191,
    },
    { name: "/documentation", value: 0 },
  ];
  const updatedData = additionalProps
    ? basicData.map((value, index) => ({ ...value, ...(additionalProps[index] || {}) }))
    : basicData;

  return [...updatedData, ...additionalItems];
};

export const DefaultExample: Story = {
  ...BarListResponsiveFlexTemplate,
  args: {
    data: getData(),
    valueFormatter: (value) => `${value} USD`,
  },
};

export const WithIconExample: Story = {
  ...BarListResponsiveFlexTemplate,
  args: {
    data: getData(Array(5).fill({ icon: CalendarIcon })),
    valueFormatter: (value) => `${value} USD`,
  },
};

export const WithLinksExample: Story = {
  ...BarListResponsiveFlexTemplate,
  args: {
    data: getData(Array(4).fill({ href: "https://www.tremor.so/" })),
    valueFormatter: (value) => `${value} USD`,
  },
};

export const ExampleColors: Story = {
  ...BarListTemplateColors,
  args: {
    data: getData(Array(3).fill({ href: "https://www.tremor.so/" })),
    valueFormatter: (value) => `${value} USD`,
  },
};

export const ExampleIndividualColors: Story = {
  ...BarListTemplateIndividualColors,
  args: {
    data: getData(["blue", "amber", "cyan", "emerald", "indigo"].map((color) => ({ color }))),
    valueFormatter: (value) => `${value} USD`,
  },
};
