import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArrowUpIcon } from 'assets';

import { BaseColors, Sizes as InputSizes } from 'lib/primitives';
import { Block, Card, ColGrid, Flex, Title } from 'components';

import { IconVariants } from 'components/icon-elements/Icon/Icon';

import Icon from 'components/icon-elements/Icon/Icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/IconElements/Icon',
    component: Icon,
} as ComponentMeta<typeof Icon>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SizesTemplate: ComponentStory<typeof Icon> = (args) => (
    <Card>
        <ColGrid numCols={5}>
            {Object.values(IconVariants).map(variant => (
                <Block>
                    <Title>{variant}</Title>
                    {Object.values(InputSizes).map((size) => (
                        <Block marginTop="mt-2">
                            <Icon icon={args.icon} variant={variant} size={size} />
                        </Block>
                    ))}
                </Block>
            ))}
        </ColGrid>
    </Card>
);

const ColorsTemplate: ComponentStory<typeof Icon> = (args) => (
    <ColGrid numColsLg={2} gapX="gap-x-2" gapY="gap-y-2">
        {Object.values(IconVariants).map(variant => (
            <Card maxWidth="max-w-lg">
                <Title>{variant}</Title>
                <ColGrid numCols={5}>
                    {Object.values(BaseColors).map((color) => (
                        <Block marginTop="mt-2">
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
        <div className="tr-w-64">
            <Card>
                <Block spaceY="space-y-2">
                    {Object.values(IconVariants).map(variant => (
                        <Flex>
                            <Icon {...args} variant={variant} />
                            <Icon {...args} variant={variant} />
                        </Flex>
                    ))}
                </Block>
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <Block spaceY="space-y-2">
                {Object.values(IconVariants).map(variant => (
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
