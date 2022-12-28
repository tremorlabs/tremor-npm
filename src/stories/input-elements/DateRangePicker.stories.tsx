import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card, DateRangePicker } from 'components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/DateRangePicker',
    component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof DateRangePicker> = (args) => (
    <Card>
        <DateRangePicker { ...args } />
    </Card>
);

export const Default = ResponsiveTemplate.bind({});
Default.args = {
    startDate: new Date(2022, 5, 5),
    endDate: new Date(2022, 5, 10),
    minDate: new Date(2022, 5, 7),
    maxDate: new Date(2022, 5, 8),
};
