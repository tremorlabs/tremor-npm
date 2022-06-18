import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import MultiSelectBox from 'components/selection-elements/MultiSelectBox/MultiSelectBox';
import MultiSelectBoxItem from 'components/selection-elements/MultiSelectBoxItem/MultiSelectBoxItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/SelectionElements/MultiSelectBox',
    component: MultiSelectBox,
} as ComponentMeta<typeof MultiSelectBox>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof MultiSelectBox> = (args) => (
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
);
  
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};
