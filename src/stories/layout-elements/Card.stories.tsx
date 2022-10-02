import React from 'react';

import { AccordionList, Block, Card, ColGrid, Flex, Metric, Text, Title } from 'components';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SimpleAccordion } from './helpers/SimpleAccordion';
import { BaseColors, HorizontalPosition, VerticalPosition } from 'lib';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/LayoutElements/Card',
    component: Card,
} as ComponentMeta<typeof Card>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SimpleCard = (args: any) => (
    <Card {...args}>
        <Metric>23,000</Metric>
        <Text>Sample Text</Text>
    </Card>
);

const ResponsiveTemplate: ComponentStory<typeof Card> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <SimpleCard { ...args } />
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <SimpleCard { ...args } />
    </>
);

const FlexTemplate: ComponentStory<typeof Card> = (args) => (
    <>
        <Flex alignItems="items-stretch" spaceX="space-x-2">
            <SimpleCard { ...args } />
            <SimpleCard { ...args } />
            <Card { ...args }>
                <Metric>$ 30,000</Metric>
            </Card>
        </Flex>
        <Flex alignItems="items-stretch" marginTop="mt-5" spaceX="space-x-2">
            <Block spaceY="space-y-2">
                <SimpleCard { ...args } />
                <SimpleCard { ...args } />
                <SimpleCard { ...args } />
            </Block>
            <SimpleCard { ...args } />
        </Flex>
    </>
);

const DecorationPositionsTemplate: ComponentStory<typeof Card> = (args) => (
    <ColGrid numCols={ 2 } gapX="gap-x-2" gapY="gap-y-2">
        {   
            ['left', 'top', 'right', 'bottom', 'mistyped'].map((
                position,
            ) => (
                <Card { ...args } decoration={ position as (HorizontalPosition | VerticalPosition | '') }>
                    <Title>{ `Decoration ${position}` }</Title>
                </Card>
            ))
        }
    </ColGrid>
);

const DecorationColorsTemplate: ComponentStory<typeof Card> = (args) => (
    <ColGrid numCols={ 3 } gapX="gap-x-2" gapY="gap-y-2">
        {   
            Object.values(BaseColors).map((
                color,
            ) => (
                <Card { ...args } decoration="top" decorationColor={ color }>
                    <Title>{ `Decoration Color: ${color}` }</Title>
                </Card>
            ))
        }
    </ColGrid>
);



export const Default = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const DecorationPositions = DecorationPositionsTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const DecorationColors = DecorationColorsTemplate.bind({});

export const WithFlexItemsStretch = FlexTemplate.bind({});
