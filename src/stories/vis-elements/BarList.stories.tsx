import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { CalendarIcon } from "assets";
import { BarList } from "components";
import { BarListProps } from "components/vis-elements/BarList/BarList";
import { BaseColors } from "lib";

const meta: Meta<typeof BarList> = {
  title: "Visualizations/Vis/BarList",
  component: BarList,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/vis-elements/BarList",
  },
};

export default meta;
type Story = StoryObj<typeof BarList>;

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

export const Default: Story = {
  args: {
    data: getData(),
    valueFormatter: (value) => `${value} USD`,
  },
};

export const Icon: Story = {
  args: {
    data: getData(Array(5).fill({ icon: CalendarIcon })),
    valueFormatter: (value) => `${value} USD`,
  },
};

export const Links: Story = {
  args: {
    data: getData(Array(4).fill({ href: "https://www.tremor.so/" })),
    valueFormatter: (value) => `${value} USD`,
  },
};

export const Colors: Story = {
  render: (args) => (
    <div className="space-y-2">
      {Object.values(BaseColors).map((color) => (
        <BarList key={color} {...args} color={color} />
      ))}
    </div>
  ),
  args: {
    data: getData(Array(3).fill({ href: "https://www.tremor.so/" })),
    valueFormatter: (value) => `${value} USD`,
  },
};

export const IndividualColors: Story = {
  render: (args) => <BarList {...args} />,
  args: {
    data: getData(["blue", "amber", "cyan", "emerald", "indigo"].map((color) => ({ color }))),
    valueFormatter: (value) => `${value} USD`,
  },
};
