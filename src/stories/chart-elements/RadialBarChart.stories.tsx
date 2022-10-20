import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Card, RadialBarChart, Title} from 'components';
import {radialBarChartData as data} from './helpers/testData';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/ChartElements/RadialBarChart',
    component: RadialBarChart,
} as ComponentMeta<typeof RadialBarChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof RadialBarChart> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <RadialBarChart {...args} />
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <RadialBarChart {...args} />
        </Card>
    </>
);

const DefaultTemplate: ComponentStory<typeof RadialBarChart> = ({...args}) => (
    <Card>
        <RadialBarChart {...args} />
    </Card>
);


export const DefaultResponsive = ResponsiveTemplate.bind({});

//More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
    data,
    dataKey: 'pv'
};

export const WithCustomColors = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomColors.args = {
    dataKey: 'pv',
    data,
    colors: ['amber', 'emerald', 'green', 'indigo', 'gray', 'red', 'yellow']
};


export const WithNoData = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoData.args = {
    dataKey: 'pv',
};

export const WithNoLegend = DefaultTemplate.bind({});
WithNoLegend.args = {
    data: data,
    dataKey: 'pv',
    showLegend: false
};

export const WithNoLabels = DefaultTemplate.bind({});
WithNoLabels.args = {
    data: data,
    dataKey: 'pv',
    showLabel: false
};

export const OnlyHalfCircle = DefaultTemplate.bind({});
OnlyHalfCircle.args = {
    data: data,
    dataKey: 'pv',
    startAngle: 180,
    endAngle: 0
};
