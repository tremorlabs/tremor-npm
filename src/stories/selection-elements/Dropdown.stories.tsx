import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Dropdown from 'components/selection-elements/Dropdown/Dropdown';
import DropdownItem from 'components/selection-elements/DropdownItem';

import { CalendarIcon } from '@heroicons/react/solid';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/SelectionElements/Dropdown',
    component: Dropdown,
} as ComponentMeta<typeof Dropdown>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Dropdown> = (args) => (
        <Dropdown defaultValue={ 3 } handleSelect={ (value) => console.log('The selected value is', value) }>
            <DropdownItem value={ 5 } name={ 'This is an edge case' } Icon={ CalendarIcon } shortcut={ 'F' } />
            <DropdownItem value={ 3 } name={ 'Three' } Icon={ CalendarIcon } shortcut={ 'T' } />
            <DropdownItem value={ 1 } name={ 'One' } Icon={ CalendarIcon } shortcut={ 'O' } />
        </Dropdown>    
);
  
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {

};
