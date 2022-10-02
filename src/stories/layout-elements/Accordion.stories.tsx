import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Accordion, Card, Flex, Text, Title } from 'components';
import { SimpleAccordion } from './helpers/SimpleAccordion';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/LayoutElements/Accordion',
    component: Accordion,
} as ComponentMeta<typeof Accordion>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof Accordion> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <SimpleAccordion { ...args } />
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <SimpleAccordion { ...args } />
        </Card>
    </>
);

const FlexTemplate: ComponentStory<typeof Accordion> = (args) => (
    <>
        <Card>
            <Text marginTop="mt-2">Justify Start</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <SimpleAccordion { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <SimpleAccordion { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End with inner div</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <div>
                    <SimpleAccordion { ...args } />
                </div>
            </Flex>
            <Text marginTop="mt-2">Justify Start with inner div</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <div>
                    <SimpleAccordion { ...args } />
                </div>
            </Flex> 
        </Card>
    </>
);
  
export const DefaultResponsive = ResponsiveTemplate.bind({});

export const WithFlexParent = FlexTemplate.bind({});

export const WithExpanded = ResponsiveTemplate.bind({});
WithExpanded.args = {
    expanded: true,
};

export const WithShadow = ResponsiveTemplate.bind({});
WithShadow.args = {
    shadow: true,
};
