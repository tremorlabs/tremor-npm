import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card, Text, TextInput } from 'components';
import { CalendarIcon } from 'assets';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/TextInput',
    component: TextInput,
} as ComponentMeta<typeof TextInput>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof TextInput> = (args) => {
    const [value, setValue] = useState(args.defaultValue);
    return (
        <Card>
            <TextInput { ...args } handleChange={ (v) => setValue(v) } />
            <Text>{ value }</Text>
        </Card>
    );
};

export const Default = Template.bind({});
Default.args = {};

export const WithIcon = Template.bind({});
WithIcon.args = {
    icon: CalendarIcon
};

export const WithNoPlaceholder = Template.bind({});
WithNoPlaceholder.args = {
    placeholder: '',
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
    defaultValue: 'Hello',
};

export const WithError = Template.bind({});
WithError.args = {
    defaultValue: 'Hello',
    error: true,
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
    defaultValue: 'Hello',
    error: true,
    errorMessage: 'Something is wrong',
};

export const WithDisabled = Template.bind({});
WithDisabled.args = {
    defaultValue: 'Hello',
    disabled: true,
};
