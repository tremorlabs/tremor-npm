import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CalendarIcon } from '@heroicons/react/solid';

import SelectBox from 'components/selection-elements/SelectBox/SelectBox';
import { SelectBoxItem } from 'components';
import Dropdown from 'components/selection-elements/Dropdown/Dropdown';
import DropdownItem from 'components/selection-elements/DropdownItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/SelectionElements/SelectBox',
    component: SelectBox,
} as ComponentMeta<typeof SelectBox>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof SelectBox> = (args) => (
    <div className="flex">
        <SelectBox handleSelect={ (value) => console.log('the new value is', value) }>
            <SelectBoxItem  value={1} name="Option One with icon" Icon={ CalendarIcon } />
            <SelectBoxItem  value={2} name="Option Two with icon" Icon={ CalendarIcon } />
            <SelectBoxItem  value={3} name="Option Three with icon" Icon={ CalendarIcon } />
        </SelectBox>
        {/* <Dropdown defaultValue={ 3 } handleSelect={ (value) => console.log('The selected value is', value) }>
            <DropdownItem value={ 5 } name={ 'Five' } Icon={ CalendarIcon } shortcut={ 'F' } />
            <DropdownItem value={ 3 } name={ 'Three' } Icon={ CalendarIcon } shortcut={ 'T' } />
            <DropdownItem value={ 1 } name={ 'One' } Icon={ CalendarIcon } shortcut={ 'O' } />
        </Dropdown>    */}
    </div>
);
  
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};
