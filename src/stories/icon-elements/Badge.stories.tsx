import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BaseColors } from 'lib/primitives';
import { Sizes as InputSizes } from 'lib/primitives';

import { BadgeDelta, Card, ColGrid, Flex, Title } from 'components';
import { ArrowUpIcon } from 'assets';
import Badge from 'components/icon-elements/Badge/Badge';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/IconElements/Badge',
    component: Badge,
} as ComponentMeta<typeof Badge>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SizesTemplate: ComponentStory<typeof Badge> = (args) => (
    <Card maxWidth="max-w-md">
        <ColGrid numCols={ 4 } gapY="gap-y-2">
            { Object.values(InputSizes).map(size => (
                <>
                    <Badge size={ size } text={ args.text } tooltip={ args.tooltip } />
                    <Badge size={ size } text={ args.text } tooltip={ args.tooltip } Icon={ ArrowUpIcon } />
                    <BadgeDelta size={ size } text={ args.text } deltaType="increase" />
                    <BadgeDelta size={ size } deltaType="increase" />
                </>
            )) }
        </ColGrid>
    </Card>
);

const ColorsTemplate: ComponentStory<typeof Badge> = (args) => (
    <Card maxWidth="max-w-sm">
        <ColGrid numCols={ 5 } gapY="gap-y-2">
            { Object.values(BaseColors).map(color => (
                <Badge color={ color } text={ args.text } Icon={ args.Icon } />
            )) }
        </ColGrid>
    </Card>
);

const ResponsiveFlexTemplate: ComponentStory<typeof Badge> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <Flex>
                    <Badge { ...args } />
                    <Badge { ...args } />
                </Flex>
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <Flex>
                <Badge { ...args } />
                <Badge { ...args } />
            </Flex>
        </Card>
    </>
);

export const Sizes = SizesTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sizes.args = {
    text: 'Live',
    tooltip: 'Tooltip',
};

export const Colors = ColorsTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Colors.args = {
    text: 'Live',
    tooltip: 'Tooltip',
    Icon: ArrowUpIcon,
};

export const WithFlexParent = ResponsiveFlexTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithFlexParent.args = {
    text: 'Live',
    Icon: ArrowUpIcon,
};
