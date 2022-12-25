import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, Card, Datepicker, Dropdown, DropdownItem, Flex, Text, Title } from 'components';
import { SelectElementsFlexTemplate } from './helpers/SelectElementsFlexTemplate';
import { SimpleDropdown } from './helpers/SimpleDropdown';
import { SimpleSelectBox } from 'stories/input-elements/helpers/SimpleSelectBox';

import { CalendarIcon } from 'assets';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/Dropdown',
    component: Dropdown,
} as ComponentMeta<typeof Dropdown>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof Dropdown> = (args) => (
    <form>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <Datepicker />
                <SimpleDropdown { ...args } />
                <SimpleSelectBox icon={ CalendarIcon } />
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <SimpleDropdown { ...args } />
        </Card>
        <Title marginTop="mt-5">With Black Background</Title>
        <Card>
            <div className="tr-flex tr-items-center tr-bg-black tr-h-24">
                <SimpleDropdown { ...args } />
            </div>
        </Card>
    </form>
);

const FlexTemplate: ComponentStory<typeof Dropdown> = (args) => (
    <>
        <Card>
            <Text marginTop="mt-2">Justify Start</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <SimpleDropdown { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <SimpleDropdown { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End with inner div</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <div>
                    <SimpleDropdown { ...args } />
                </div>
            </Flex>
            <Text marginTop="mt-2">Justify Start with inner div</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <div>
                    <SimpleDropdown { ...args } />
                </div>
            </Flex> 
        </Card>
    </>
);

const WithControlledStateTemplate: ComponentStory<typeof Dropdown> = () => {
    const [value, setValue] = useState<number | null>(5);
    return (
        <Card>
            <Dropdown value={value} onValueChange={ (value) => { setValue(value); alert(value); } }>
                <DropdownItem value={5} text={'Five'} />
                <DropdownItem value={3} text={'Three'} />
                <DropdownItem value={1} text={'One'} />
            </Dropdown>
            <Button text="Reset" onClick={ () => setValue(null) } />
            <Button text="Set to One" onClick={ () => setValue(1) } />
        </Card>
    );
};

  
export const DefaultResponsive = ResponsiveTemplate.bind({});

export const WithFlexParent = FlexTemplate.bind({});
WithFlexParent.args = {
    maxWidth: 'max-w-xs'
};

export const WithDefaultValue = ResponsiveTemplate.bind({});
WithDefaultValue.args = {
    defaultValue: 5
};

export const WithIcon = ResponsiveTemplate.bind({});
WithIcon.args = {
    defaultValue: 5,
    icon: CalendarIcon,
};

export const SelectElementsComparison = SelectElementsFlexTemplate.bind({});

export const WithControlledState = WithControlledStateTemplate.bind({});
