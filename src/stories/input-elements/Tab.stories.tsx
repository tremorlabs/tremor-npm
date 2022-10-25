import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Block, Card, Flex, Tab, TabList, Text, Title } from 'components';
import { BaseColors } from 'lib';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/TabList',
    component: TabList,
} as ComponentMeta<typeof TabList>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SimpleTabList = (args: any) => (
    <TabList { ...args }>
        <Tab
            value={ 5 }
            text={ 'This is a very Long Tab Value that is used as an edge case' }
        />
        <Tab value={ 3 } text={ 'Three' } />
        <Tab value={ 1 } text={ 'One' } />
    </TabList>
);

const ResponsiveTemplate: ComponentStory<typeof TabList> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <SimpleTabList { ...args } />
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <SimpleTabList { ...args } />
        </Card>
    </>
);

const FlexTemplate: ComponentStory<typeof TabList> = (args) => (
    <>
        <Card>
            <Text marginTop="mt-2">Justify Start</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <SimpleTabList { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <SimpleTabList { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End with inner div</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <div>
                    <SimpleTabList { ...args } />
                </div>
            </Flex>
            <Text marginTop="mt-2">Justify Start with inner div</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <div>
                    <SimpleTabList { ...args } />
                </div>
            </Flex> 
        </Card>
    </>
);

const ColorsTemplate: ComponentStory<typeof TabList> = (args) => (
    <>
        <Card>
            <Block spaceY="space-y-2">
                { Object.values(BaseColors).map(color => (
                    <SimpleTabList { ...args } color={ color } /> 
                ))}
            </Block>
        </Card>
    </>
);
  
export const DefaultResponsive = ResponsiveTemplate.bind({});
DefaultResponsive.args = {
    handleSelect: (value) => console.log(value),
};

export const WithFlexParent = FlexTemplate.bind({});

export const WithDefaultValue = ResponsiveTemplate.bind({});
WithDefaultValue.args = {
    defaultValue: 5,
};

export const Colors = ColorsTemplate.bind({});
Colors.args = {
    defaultValue: 5
};
