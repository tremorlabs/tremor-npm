import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, Card, DateRangePicker } from 'components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/DateRangePicker',
    component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const UncontrolledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
    return (
        <Card>
            <DateRangePicker { ...args } />
        </Card>
    );
};

const ControlledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
    const [value, setValue] = useState<(Date | null | any)[]>([undefined, undefined]);
    return (
        <Card>
            <DateRangePicker { ...args }
                value={ value }
                onValueChange={ (v) => { setValue(v); console.log(v); }}
            />
            <Button text="Reset" onClick={ () => { setValue([null, null]); }} />
        </Card>
    );
};

export const Uncontrolled = UncontrolledTemplate.bind({});
Uncontrolled.args = {
    onValueChange: ([sd, ed]) => console.log(sd, ed),
    defaultValue: [new Date(2022, 5, 5), new Date(2022, 5, 10), 'tdy'],
    enableYearPagination: true,
    enableDropdown: true,
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
    enableYearPagination: true,
};
