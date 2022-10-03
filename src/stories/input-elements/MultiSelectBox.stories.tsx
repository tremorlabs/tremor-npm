import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card, Flex, MultiSelectBox, Text, Title } from 'components';
import { SelectElementsFlexTemplate } from './helpers/SelectElementsFlexTemplate';
import { SimpleMultiSelectBox } from './helpers/SimpleMultiSelectBox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/MultiSelectBox',
    component: MultiSelectBox,
} as ComponentMeta<typeof MultiSelectBox>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof MultiSelectBox> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <SimpleMultiSelectBox { ...args } />
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <SimpleMultiSelectBox { ...args } />
        </Card>
    </>
);

const FlexTemplate: ComponentStory<typeof MultiSelectBox> = (args) => (
    <>
        <Card>
            <Text marginTop="mt-2">Justify Start</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <SimpleMultiSelectBox { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <SimpleMultiSelectBox { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End with inner div</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <div>
                    <SimpleMultiSelectBox { ...args } />
                </div>
            </Flex>
            <Text marginTop="mt-2">Justify Start with inner div</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <div>
                    <SimpleMultiSelectBox { ...args } />
                </div>
            </Flex> 
        </Card>
    </>
);
  
export const DefaultResponsive = ResponsiveTemplate.bind({});

export const WithFlexParent = FlexTemplate.bind({});
WithFlexParent.args = {
    maxWidth: 'max-w-xs'
};

export const WithDefaultValues = ResponsiveTemplate.bind({});
WithDefaultValues.args = {
    defaultValues: [5, 1]
};

export const SelectElementsComparison = SelectElementsFlexTemplate.bind({});
