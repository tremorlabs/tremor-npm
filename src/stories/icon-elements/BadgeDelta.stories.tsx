import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DeltaTypes as InputDeltaTypes, Sizes as InputSizes } from "lib/constants";

import { BadgeDelta, Card, Grid, Flex, Title } from "components";
import { ArrowUpIcon } from "assets";
import Badge from "components/icon-elements/Badge/Badge";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/IconElements/BadgeDelta",
  component: Badge,
} as ComponentMeta<typeof Badge>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SizesTemplate: ComponentStory<typeof BadgeDelta> = (args) => (
  <Card className="max-w-lg">
    <Grid numItems={4} className="gap-y-2">
      {Object.values(InputSizes).map((size) => (
        <>
          <BadgeDelta size={size} deltaType="increase" />
          <BadgeDelta size={size} deltaType="increase">
            {args.children}
          </BadgeDelta>

          <Badge size={size}>{args.children}</Badge>
          <Badge size={size} icon={ArrowUpIcon}>
            {args.children}
          </Badge>
        </>
      ))}
    </Grid>
  </Card>
);

const DeltaTypesTemplate: ComponentStory<typeof BadgeDelta> = () => (
  <Card className="max-w-sm">
    <Grid className="gap-y-1">
      {Object.values(InputDeltaTypes).map((deltaType) => (
        <BadgeDelta key={deltaType} deltaType={deltaType} />
      ))}
    </Grid>
  </Card>
);

const ResponsiveFlexTemplate: ComponentStory<typeof BadgeDelta> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <Flex>
          <BadgeDelta {...args} />
          <BadgeDelta {...args} />
        </Flex>
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <Flex>
        <BadgeDelta {...args} />
        <BadgeDelta {...args} />
      </Flex>
    </Card>
  </>
);

export const Sizes = SizesTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sizes.args = {
  children: "12.5%",
};

export const DeltaTypes = DeltaTypesTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DeltaTypes.args = {
  children: "12.5%",
};

export const WithFlexParent = ResponsiveFlexTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithFlexParent.args = {
  children: "12.5%",
  deltaType: "increase",
};
