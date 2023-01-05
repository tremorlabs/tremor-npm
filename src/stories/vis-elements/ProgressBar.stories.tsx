import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProgressBar from "components/vis-elements/ProgressBar/ProgressBar";

import Card from "components/layout-elements/Card";
import Metric from "components/text-elements/Metric";

import { BaseColors } from "lib/primitives";
import { Flex } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/VisElements/ProgressBar",
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <>
    {Object.values(BaseColors).map((color) => (
      <Card>
        <Metric>$23.456</Metric>
        <Flex>
          <ProgressBar {...args} color={color} />
        </Flex>
      </Card>
    ))}
  </>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  percentageValue: 50,
  tooltip: "50%",
  marginTop: "mt-5",
  label: "90% helloasjdakshgdkjhags akjhsgdkhjagsdjhakg",
};
