import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card, Flex, SelectBox, Text, Title } from 'components';
import { SelectElementsFlexTemplate } from './helpers/SelectElementsFlexTemplate';
import { SimpleDropdown } from 'stories/input-elements/helpers/SimpleDropdown';
import { SimpleSelectBox } from './helpers/SimpleSelectBox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/SelectBox',
    component: SelectBox,
} as ComponentMeta<typeof SelectBox>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof SelectBox> = (args) => (
    <form>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <SimpleSelectBox { ...args } />
                <SimpleDropdown />
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <SimpleSelectBox { ...args } />
        </Card>
    </form>
);

const FlexTemplate: ComponentStory<typeof SelectBox> = (args) => (
    <>
        <Card>
            <Text marginTop="mt-2">Justify Start</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <SimpleSelectBox { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <SimpleSelectBox { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End with inner div</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <div>
                    <SimpleSelectBox { ...args } />
                </div>
            </Flex>
            <Text marginTop="mt-2">Justify Start with inner div</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <div>
                    <SimpleSelectBox { ...args } />
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

export const WithDefaultValue = ResponsiveTemplate.bind({});
WithDefaultValue.args = {
    defaultValue: 5
};

export const SelectElementsComparison = SelectElementsFlexTemplate.bind({});
