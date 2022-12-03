import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card } from 'components';
import SmartTable from 'components/list-elements/SmartTable/SmartTable';
import { simpleBaseChartData as data } from './helpers/testData';
export default {
    title: 'Tremor/ListElements/SmartTable',
    component: SmartTable,
} as ComponentMeta<typeof SmartTable>;

const Template: ComponentStory<typeof SmartTable> = (args) => (
    <Card>
        <SmartTable {...args} />
    </Card>
);

export const Default = Template.bind({});

Default.args = {
    data: data,
    categories: ['month', 'Sales', 'Successfull Payments'],
};
