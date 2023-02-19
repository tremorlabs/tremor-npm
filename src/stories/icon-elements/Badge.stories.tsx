import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BaseColors } from "lib/constants";
import { Sizes as InputSizes } from "lib/constants";

import { BadgeDelta, Card, Grid, Flex, Title } from "components";
import { ArrowUpIcon } from "assets";
import Badge from "components/icon-elements/Badge/Badge";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/IconElements/Badge",
  component: Badge,
} as ComponentMeta<typeof Badge>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SizesTemplate: ComponentStory<typeof Badge> = (args) => (
  <Card className="max-w-md">
    <Grid numCols={4} className="gap-y-2">
      {Object.values(InputSizes).map((size) => (
        <>
          <Badge {...args} size={size} />
          <Badge {...args} size={size} icon={ArrowUpIcon} />
          <BadgeDelta {...args} size={size} deltaType="increase" />
          <BadgeDelta {...args} size={size} deltaType="increase" />
        </>
      ))}
    </Grid>
  </Card>
);

const ColorsTemplate: ComponentStory<typeof Badge> = (args) => (
  <Card className="max-w-sm">
    <Grid numCols={5} className="gap-y-2">
      {Object.values(BaseColors).map((color) => (
        <Badge {...args} key={color} color={color} icon={args.icon} />
      ))}
    </Grid>
  </Card>
);

const ResponsiveFlexTemplate: ComponentStory<typeof Badge> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <Flex>
          <Badge {...args} />
          <Badge {...args} />
        </Flex>
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <Flex>
        <Badge {...args} />
        <Badge {...args} />
      </Flex>
    </Card>
  </>
);

export const Sizes = SizesTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sizes.args = {
  children: "Live",
  tooltip: "Tooltip",
};

export const Colors = ColorsTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Colors.args = {
  children: "Live",
  tooltip: "Tooltip",
  icon: ArrowUpIcon,
};

export const WithFlexParent = ResponsiveFlexTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithFlexParent.args = {
  children: "Live",
  icon: ArrowUpIcon,
};
