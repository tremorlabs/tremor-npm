import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ArrowUpIcon } from "assets";

import { BaseColors, Sizes as InputSizes } from "lib/constants";
import { Block, Card, ColGrid, Flex, Title } from "components";

import { IconVariants } from "components/icon-elements/Icon/Icon";

import Icon from "components/icon-elements/Icon/Icon";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/IconElements/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SizesTemplate: ComponentStory<typeof Icon> = (args) => (
  <Card>
    <ColGrid numCols={5}>
      {Object.values(IconVariants).map((variant) => (
        <Block>
          <Title>{variant}</Title>
          {Object.values(InputSizes).map((size) => (
            <Block className="mt-2">
              <Icon icon={args.icon} variant={variant} size={size} tooltip="Tooltip" />
            </Block>
          ))}
        </Block>
      ))}
    </ColGrid>
  </Card>
);

const ColorsTemplate: ComponentStory<typeof Icon> = (args) => (
  <ColGrid numColsLg={2} className="gap-x-2 gap-y-2">
    {Object.values(IconVariants).map((variant) => (
      <Card className="max-w-lg">
        <Title>{variant}</Title>
        <ColGrid numCols={5}>
          {Object.values(BaseColors).map((color) => (
            <Block className="mt-2">
              <Icon icon={args.icon} variant={variant} color={color} />
            </Block>
          ))}
        </ColGrid>
      </Card>
    ))}
  </ColGrid>
);

const ResponsiveFlexTemplate: ComponentStory<typeof Icon> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <Block className="space-y-2">
          {Object.values(IconVariants).map((variant) => (
            <Flex>
              <Icon {...args} variant={variant} />
              <Icon {...args} variant={variant} />
            </Flex>
          ))}
        </Block>
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <Block className="space-y-2">
        {Object.values(IconVariants).map((variant) => (
          <Flex>
            <Icon {...args} variant={variant} />
            <Icon {...args} variant={variant} />
          </Flex>
        ))}
      </Block>
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
