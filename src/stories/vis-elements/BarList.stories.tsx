import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BarList, Card } from "components";
import { BaseColors } from "lib";
import { CalendarIcon } from "assets";
import { BarListProps } from "components/vis-elements/BarList/BarList";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/VisElements/BarList",
  component: BarList,
} as ComponentMeta<typeof BarList>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof BarList> = (args) => (
  <Card>
    <BarList {...args} />
  </Card>
);

const ColorsTemplate: ComponentStory<typeof BarList> = (args) => (
  <div className="space-y-2">
    {Object.values(BaseColors).map((color) => (
      <Card key={color}>
        <BarList {...args} color={color} />
      </Card>
    ))}
  </div>
);

const IndividualColorsTemplate: ComponentStory<typeof BarList> = (args) => (
  <div className="space-y-2">
    <Card>
      <BarList {...args} />
    </Card>
  </div>
);

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

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  data: getData(),
  valueFormatter: (value) => `${value} USD`,
};

export const WithIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithIcon.args = {
  data: getData(Array(5).fill({ icon: CalendarIcon })),
  valueFormatter: (value) => `${value} USD`,
};

export const WithLinks = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLinks.args = {
  data: getData(Array(4).fill({ href: "https://www.tremor.so/" })),
  valueFormatter: (value) => `${value} USD`,
};

export const Colors = ColorsTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Colors.args = {
  data: getData(Array(3).fill({ href: "https://www.tremor.so/" })),
  valueFormatter: (value) => `${value} USD`,
};

export const IndividualColors = IndividualColorsTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
IndividualColors.args = {
  data: getData(["blue", "amber", "cyan", "emerald", "indigo"].map((color) => ({ color }))),
  valueFormatter: (value) => `${value} USD`,
};
