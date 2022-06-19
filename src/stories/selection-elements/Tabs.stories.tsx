import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Tab from 'components/selection-elements/Tab/Tab';
import TabList from 'components/selection-elements/TabList/TabList';
import { LocationMarkerIcon } from '@heroicons/react/solid';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/SelectionElements/TabList',
    component: TabList,
} as ComponentMeta<typeof TabList>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof TabList> = (args) => (
    <TabList defaultValue={ 1 } handleSelect={ (value) => console.log(value) }>
        <Tab value={ 1 } name="Location A" Icon = { LocationMarkerIcon } />
        <Tab value={ 2 } name="This is an edge case. This is an edge case. This is an edge case." />
        <Tab value={ 3 } name="Location C" />
    </TabList>
);
  
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};
