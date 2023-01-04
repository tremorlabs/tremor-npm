import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, Card, DateRangePicker, DateRangePickerValue, Text, Title } from 'components';
import { dateRangePickerData } from 'stories/input-elements/helpers/testData';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/DateRangePicker',
    component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const UncontrolledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
    const [value, setValue] = useState<DateRangePickerValue>([null, null]);
    const startDate = value?.[0];
    const endDate = value?.[1];

    return (
        <Card>
            <DateRangePicker
                { ...args }
                // defaultValue={ value}
                onValueChange={ (value) => setValue(value) }
            />
            <Title>Filtered Data</Title>
            <Text>StartDate: { String(startDate) } </Text>
            <Text>EndDate: { String(endDate) } </Text>
            <div>
                { dateRangePickerData.filter(
                    (datapoint) => (
                        (startDate && endDate) && (datapoint.date >= startDate && datapoint.date <= endDate))).map(
                    datapoint => (
                        <p>{ String(datapoint.date) }</p>
                    ))}
            </div>
        </Card>
    );
};

const ControlledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
    const [value, setValue] = useState<DateRangePickerValue>([null, null]);

    const startDate = value[0];
    const endDate = value[1];

    return (
        <Card>
            <DateRangePicker
                { ...args }
                value={ value }
                onValueChange={ (v) => setValue(v) }
            />
            <Button text="Reset" onClick={ () => { setValue([null, null]); }} />
            <Button text="Today" onClick={ () => { setValue([null, null, 'tdy']); }} />
            <Title>Filtered Data</Title>
            <Text>StartDate: { String(startDate) } </Text>
            <Text>EndDate: { String(endDate) } </Text>
            <div>
                { dateRangePickerData.filter(
                    (datapoint) => (
                        (startDate && endDate) && (datapoint.date >= startDate && datapoint.date <= endDate))).map(
                    datapoint => (
                        <p>{ String(datapoint.date) }</p>
                    ))}
            </div>
        </Card>
    );
};

export const UncontrolledDefault = UncontrolledTemplate.bind({});

export const UncontrolledWithDefaultDateRange = UncontrolledTemplate.bind({});
UncontrolledWithDefaultDateRange.args = {
    defaultValue: [new Date(2022, 10, 1), new Date()],
};

export const UncontrolledWithDefaultSelectOption = UncontrolledTemplate.bind({});
UncontrolledWithDefaultSelectOption.args = {
    defaultValue: [undefined, undefined, 't'],
};

export const UncontrolledWithDefaultValue = UncontrolledTemplate.bind({});
UncontrolledWithDefaultValue.args = {
    defaultValue: [new Date(2022, 10, 1), new Date(), 't'],
};

export const ControlledDefault = ControlledTemplate.bind({});

export const ControlledWithDefaultDateRange = ControlledTemplate.bind({});
ControlledWithDefaultDateRange.args = {
    value: [new Date(2022, 10, 1), new Date()],
};

export const ControlledWithDefaultSelectOption = ControlledTemplate.bind({});
ControlledWithDefaultSelectOption.args = {
    value: [undefined, undefined, 't'],
};

export const ControlledWithDefaultValue = ControlledTemplate.bind({});
ControlledWithDefaultValue.args = {
    value: [new Date(2022, 10, 1), new Date(), 't'],
};
