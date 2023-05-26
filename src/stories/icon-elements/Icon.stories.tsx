import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ArrowUpIcon } from "assets";

import { BaseColors, Sizes as InputSizes } from "lib/constants";
import { Card, Grid, Flex, Title } from "components";

import { IconVariants } from "components/icon-elements/Icon/Icon";

import Icon from "components/icon-elements/Icon/Icon";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/IconElements/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SizesTemplate: ComponentStory<typeof Icon> = (args) => (
  <div>
    <Card>
      <Grid numItems={5}>
        {Object.values(IconVariants).map((variant) => (
          <div key={variant}>
            <text>{variant}</text>
            {Object.values(InputSizes).map((size) => (
              <div key={size} className="mt-2">
                <Icon icon={args.icon} variant={variant} size={size} tooltip="Tooltip" />
              </div>
            ))}
          </div>
        ))}
      </Grid>
    </Card>
    <Card className="bg-gray-950">
      <Grid numItems={5}>
        {Object.values(IconVariants).map((variant) => (
          <div key={variant}>
            <text>{variant}</text>
            {Object.values(InputSizes).map((size) => (
              <div key={size} className="mt-2">
                <Icon icon={args.icon} variant={variant} size={size} tooltip="Tooltip" />
              </div>
            ))}
          </div>
        ))}
      </Grid>
    </Card>
  </div>
);

const ColorsTemplate: ComponentStory<typeof Icon> = (args) => (
  <Grid numItemsLg={2} className="gap-x-2 gap-y-2">
    {Object.values(IconVariants).map((variant) => (
      <Card key={variant} className="max-w-lg">
        <text>{variant}</text>
        <Grid numItems={5}>
          {Object.values(BaseColors).map((color) => (
            <div key={color} className="mt-2">
              <Icon icon={args.icon} variant={variant} color={color} />
            </div>
          ))}
        </Grid>
      </Card>
    ))}
  </Grid>
);

const ResponsiveFlexTemplate: ComponentStory<typeof Icon> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <div className="space-y-2">
          {Object.values(IconVariants).map((variant) => (
            <Flex key={variant}>
              <Icon {...args} variant={variant} />
              <Icon {...args} variant={variant} />
            </Flex>
          ))}
        </div>
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <div className="space-y-2">
        {Object.values(IconVariants).map((variant) => (
          <Flex key={variant}>
            <Icon {...args} variant={variant} />
            <Icon {...args} variant={variant} />
          </Flex>
        ))}
      </div>
    </Card>
  </>
);

export const Sizes = SizesTemplate.bind({});
Sizes.args = { icon: ArrowUpIcon };

export const Colors = ColorsTemplate.bind({});
Colors.args = { icon: ArrowUpIcon };

export const WithFlexParent = ResponsiveFlexTemplate.bind({});
WithFlexParent.args = { icon: ArrowUpIcon };

// More on args: https://storybook.js.org/docs/react/writing-stories/args
