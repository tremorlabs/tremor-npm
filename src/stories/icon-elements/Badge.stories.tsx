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
  <Card className="max-w-2xl">
    <Grid numItems={5} className="gap-y-2">
      <p className="text-xs">Size</p>
      <p className="text-xs">Badge</p>
      <p className="text-xs">Badge + Icon</p>
      <p className="text-xs">BadgeDelta + Increase</p>
      <p className="text-xs">BadgeDelta + Decrease</p>
      <p className="text-xs">default</p>
      <Badge {...args} />
      <Badge {...args} icon={ArrowUpIcon} />
      <BadgeDelta {...args} deltaType="increase" />
      <BadgeDelta {...args} deltaType="decrease" />
      {Object.values(InputSizes).map((size) => (
        <>
          <p className="text-xs">{size}</p>
          <Badge {...args} size={size} />
          <Badge {...args} size={size} icon={ArrowUpIcon} />
          <BadgeDelta {...args} size={size} deltaType="increase" />
          <BadgeDelta {...args} size={size} deltaType="decrease" />
        </>
      ))}
    </Grid>
  </Card>
);

const ColorsTemplate: ComponentStory<typeof Badge> = (args) => (
  <Card className="max-w-sm">
    <Grid numItems={5} className="gap-y-2">
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
