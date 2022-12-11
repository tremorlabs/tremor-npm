import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';

import { Card, LineChart, Title } from 'components';
import { BarChartProps } from 'components/chart-elements/BarChart/BarChart';
import { PickOfType } from 'lib';
import { simpleBaseChartData as data } from './helpers/testData';
import { valueFormatter } from 'stories/chart-elements/helpers/utils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/ChartElements/LineChart',
    component: LineChart,
} as ComponentMeta<typeof LineChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

type DataEntry = typeof data[0]

const ResponsiveTemplate = (<T extends PickOfType<T, unknown>,>(): Story<BarChartProps<T>> => (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <LineChart { ...args } />
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <LineChart { ...args } />
        </Card>
    </>
))<DataEntry>();

const DefaultTemplate = (<T extends PickOfType<T, unknown>,>(): Story<BarChartProps<T>> => (args) => (
    <Card>
        <LineChart { ...args } />
    </Card>
))<DataEntry>();

export const DefaultResponsive = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
    data: data,
    categories: [ 'Sales', 'Successful Payments' ],
    dataKey: 'month',
};

export const WithAutoMinValue = ResponsiveTemplate.bind({});
WithAutoMinValue.args = {
    data: data,
    categories: [ 'Sales', 'Successful Payments' ],
    dataKey: 'month',
    autoMinValue: true,
};

export const WithValueFormatter = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithValueFormatter.args = {
    data: data,
    categories: [ 'Sales', 'Successful Payments' ],
    dataKey: 'month',
    valueFormatter: valueFormatter,
    colors: ['blue', 'green']
};

export const WithCustomColors = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomColors.args = {
    data: data,
    categories: [ 'Sales', 'Successful Payments' ],
    dataKey: 'month',
    colors: ['blue', 'green']
};

export const WithNoGradient = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoGradient.args = {
    data: data,
    categories: [ 'Sales', 'Successful Payments' ],
    dataKey: 'month',
    showGradient: false
};

export const WithChangedCategoriesOrder = DefaultTemplate.bind({});
WithChangedCategoriesOrder.args = {
    data: data,
    categories: [ 'Successful Payments', 'Sales' ],
    dataKey: 'month',
};

export const WithLessColorsThanCategories = DefaultTemplate.bind({});
WithLessColorsThanCategories.args = {
    data: data,
    categories: [ 'Sales', 'Successful Payments' ],
    dataKey: 'month',
    colors: ['green']
};

export const WithLongValues = ResponsiveTemplate.bind({});
WithLongValues.args = {
    data: data,
    categories: [ 'This is an edge case' ],
    dataKey: 'month',
    valueFormatter: valueFormatter, 
};

export const WithMultipleCategories = ResponsiveTemplate.bind({});
WithMultipleCategories.args = {
    data: data,
    categories: [ 'Sales', 'Successful Payments', 'This is an edge case', 'Test' ],
    dataKey: 'month',
    valueFormatter: valueFormatter, 
};

export const WithNoData = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoData.args = {
    categories: [ 'Sales', 'Successful Payments' ],
    dataKey: 'month',
};

export const WithNoCategories = DefaultTemplate.bind({});
WithNoCategories.args = {
    data: data,
    dataKey: 'month',
};

export const WithNoDataKey = DefaultTemplate.bind({});
WithNoDataKey.args = {
    data: data,
    categories: [ 'Sales', 'Successful Payments' ],
};
