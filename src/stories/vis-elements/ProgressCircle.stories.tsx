import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, ProgressCircle, Title, Text, Subtitle } from "components";

import { BaseColors, Sizes } from "lib/constants";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/VisElements/ProgressCircle",
  component: ProgressCircle,
} as ComponentMeta<typeof ProgressCircle>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TemplateColorsDemo: ComponentStory<typeof ProgressCircle> = (args) => (
  <>
    <Card className="mt-5 flex items-center space-x-6">
      <ProgressCircle {...args} />
      <div>
        <Title>Sales Goals</Title>
        <Text>Overview Q1-Q3 2023</Text>
      </div>
    </Card>
    {Object.values(BaseColors).map((color) => (
      <Card key={color} className="mt-5 flex items-center space-x-6">
        <ProgressCircle {...args} color={color} />
        <div>
          <Title>Sales Goals</Title>
          <Text>Overview Q1-Q3 2023</Text>
        </div>
      </Card>
    ))}
  </>
);

const TemplateDifferentSizes: ComponentStory<typeof ProgressCircle> = (args) => (
  <>
    <div className="flex flex-col gap-y-5">
      {Object.values(Sizes).map((size) => (
        <ProgressCircle {...args} size={size} key={size} />
      ))}
    </div>
  </>
);

const TemplateMisc: ComponentStory<typeof ProgressCircle> = () => {
  function formatNumber(num: number) {
    return num.toFixed(2);
  }
  return (
    <>
      <div className="flex flex-col gap-y-10 ml-10">
        <div className="flex flex-row gap-x-5 items-center">
          <ProgressCircle />
          <Subtitle>Not specify any args</Subtitle>
        </div>
        <div className="flex flex-row gap-x-5 items-center">
          <ProgressCircle value={0} />
          <Subtitle>Value 0</Subtitle>
        </div>
        <div className="flex flex-row gap-x-5 items-center">
          <ProgressCircle value={100} />
          <Subtitle>Value 100</Subtitle>
        </div>
        <div className="flex flex-row gap-x-5 items-center">
          <ProgressCircle value={42} />
          <Subtitle>Value 42</Subtitle>
        </div>
        <div className="flex flex-row gap-x-5 items-center">
          <ProgressCircle value={42.22123} />
          <Subtitle>Stange value</Subtitle>
        </div>
        <div className="flex flex-row gap-x-5 items-center">
          <ProgressCircle className="text-xs text-blue-600" value={42.22123}>
            {formatNumber(42.22123)}
          </ProgressCircle>
          <Subtitle>Value with custom formatter of 2 digits and classname</Subtitle>
        </div>
        <div className="flex flex-row gap-x-5 items-center">
          <ProgressCircle className="text-xs text-blue-600" value={134}>
            {formatNumber(134)}
          </ProgressCircle>
          <Subtitle>Value larger than 100</Subtitle>
        </div>
        <div className="flex flex-row gap-x-5 items-center">
          <ProgressCircle value={42} tooltip={"Progress..."} />
          <Subtitle>Showing Tooltip</Subtitle>
        </div>
      </div>
    </>
  );
};

export const Colors = TemplateColorsDemo.bind({});
Colors.args = {
  value: 42,
};

export const differentSizes = TemplateDifferentSizes.bind({});
differentSizes.args = {
  value: 86,
  tooltip: "Progress so far",
};

export const withoutAnimation = TemplateDifferentSizes.bind({});
withoutAnimation.args = {
  value: 56,
  showAnimation: false,
};

export const withChildrenSpan = TemplateColorsDemo.bind({});
withChildrenSpan.args = {
  value: 56,
  showAnimation: false,
  children: <span className="dark:text-white font-medium font-mono text-sm">56.3</span>,
};

export const withChildrenAvatar = TemplateColorsDemo.bind({});
withChildrenAvatar.args = {
  value: 76,
  children: (
    <div className="rounded-full flex items-center justify-center h-12 w-12 bg-gray-100">
      <span className="text-sm font-medium text-gray-500">JD</span>
    </div>
  ),
};

export const miscDemo = TemplateMisc.bind({});
