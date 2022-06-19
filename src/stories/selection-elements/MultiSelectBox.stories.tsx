import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CalendarIcon } from '@heroicons/react/solid';
import MultiSelectBox from 'components/selection-elements/MultiSelectBox/MultiSelectBox';
import MultiSelectBoxItem from 'components/selection-elements/MultiSelectBoxItem/MultiSelectBoxItem';
import SelectBox from 'components/selection-elements/SelectBox/SelectBox';
import { SelectBoxItem } from 'components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/SelectionElements/MultiSelectBox',
    component: MultiSelectBox,
} as ComponentMeta<typeof MultiSelectBox>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof MultiSelectBox> = (args) => (
    <div className="flex items-center space-x-2">
        <MultiSelectBox>
        {/* <MultiSelectBox defaultValues={ [1, 2] }> */}
            <MultiSelectBoxItem name="Option 1" value={ 1 } />
            <MultiSelectBoxItem name="Option 2" value={ 2 } />
            <MultiSelectBoxItem name="Option 3" value={ 3 } />
            <MultiSelectBoxItem name="Option 4" value={ 4 } />
            <MultiSelectBoxItem name="Option 5" value={ 5 } />
            <MultiSelectBoxItem name="Option 6" value={ 6 } />
            <MultiSelectBoxItem name="Option 6" value={ 7 } />
        </MultiSelectBox>
        <SelectBox handleSelect={ (value) => console.log('the new value is', value) }>
            <SelectBoxItem  value={1} name="Option One with icon" Icon={ CalendarIcon } />
            <SelectBoxItem  value={2} name="Option Two with icon" Icon={ CalendarIcon } />
            <SelectBoxItem  value={3} name="Option Three with icon" Icon={ CalendarIcon } />
        </SelectBox>
    </div>
);
  
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};
