import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card, Metric } from 'components';
import Flex from 'components/layout-elements/Flex/Flex';
import { SimpleCard } from 'stories/layout-elements/helpers/SimpleCard';
import { SimpleText } from 'stories/layout-elements/helpers/SimpleText';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/LayoutElements/Flex',
    component: Flex,
} as ComponentMeta<typeof Flex>;
  
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TemplateMaxWidth: ComponentStory<typeof Flex> = (args) => (
    <Flex {...args}>
        <div>
            <SimpleCard maxWidth="max-w-sm" />
        </div>
        <div>
            <Card maxWidth="max-w-sm">
                <Metric>$ 40,000</Metric>
                <SimpleText />
            </Card>
        </div>
    </Flex>
);

const TemplateWFull: ComponentStory<typeof Flex> = (args) => (
    <Flex {...args}>
        <SimpleCard />
        <Card>
            <Metric>$ 40,000</Metric>
            <SimpleText />
        </Card>
    </Flex>
);
  
export const Default = TemplateMaxWidth.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const JustifyEnd = TemplateMaxWidth.bind({});
JustifyEnd.args = {
    justifyContent: 'justify-end',
};

export const JustifyStart = TemplateMaxWidth.bind({});
JustifyStart.args = {
    justifyContent: 'justify-start',
};


export const ItemsStart = TemplateMaxWidth.bind({});
ItemsStart.args = {
    alignItems: 'items-start',
};

export const ItemsEnd = TemplateMaxWidth.bind({});
ItemsEnd.args = {
    alignItems: 'items-end',
};

export const ItemsStretch = TemplateWFull.bind({});
ItemsStretch.args = {
    alignItems: 'items-stretch',
};

export const SpaceX = TemplateMaxWidth.bind({});
SpaceX.args = {
    justifyContent: 'justify-start',
    alignItems: 'items-baseline',
    spaceX: 'space-x-8',
};
