import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { 
    BadgeDelta,
    Card,
    DonutChart,
    Flex,
    List,
    ListItem,
    Title
} from 'components';
import { DeltaType } from 'lib';

import { simpleSingleCategoryData as data } from 'stories/chart-elements/helpers/testData';
import { valueFormatter } from 'stories/chart-elements/helpers/utils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/ChartElements/DonutChart',
    component: DonutChart,
} as ComponentMeta<typeof DonutChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof DonutChart> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <DonutChart { ...args } />
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <DonutChart { ...args } />
        </Card>
    </>
);

const DefaultTemplate: ComponentStory<typeof DonutChart>= ({ ...args }) => (
    <Card>
        <DonutChart { ...args } />
    </Card>
);

const BlockTemplate: ComponentStory<typeof DonutChart> = (args) => (
    <>
        <Title>Base Layer (Beta)</Title>
        <div className="tr-w-full tr-mt-4">
            <Card>
                <Title>Sales</Title>
                <DonutChart { ...args } />
                <div className="tr-mt-6">
                    <List>
                        {data.map((item) => (
                            <ListItem key={ item.city }>
                                <span> { item.city } </span>
                                <Flex spaceX="space-x-2" justifyContent="justify-end">
                                    <BadgeDelta
                                        deltaType={ item.deltaType as DeltaType }
                                        text={ item.delta }
                                        isIncreasePositive={true}
                                        size="xs"
                                    />
                                </Flex>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Card>
        </div>
    </>
);

export const DefaultResponsive = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
    data: data,
    category: 'sales',
    dataKey: 'city',
};

export const WithValueFormatter = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithValueFormatter.args = {
    data: data,
    valueFormatter: valueFormatter,
    category: 'sales',
    dataKey: 'city',
};

export const WithCustomLabel = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomLabel.args = {
    data: data,
    valueFormatter: valueFormatter,
    label: 'Hello there',
    category: 'sales',
    dataKey: 'city',
};

export const WithLabelDisabled = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabelDisabled.args = {
    data: data,
    valueFormatter: valueFormatter,
    label: 'Hello there',
    showLabel: false,
    category: 'sales',
    dataKey: 'city',
};

export const WithCustomColors = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomColors.args = {
    data: data,
    colors: ['blue', 'amber', 'sky', 'emerald', 'rose', 'orange'],
    category: 'sales',
    dataKey: 'city',
};

export const WithMoreDatapointsThanColors = DefaultTemplate.bind({});
WithMoreDatapointsThanColors.args = {
    data: [
        // extra long data array
        ...data,
        ...data,
    ],
    colors: ['blue', 'amber', 'sky', 'emerald', 'rose', 'orange'],
    category: 'sales',
    dataKey: 'city',
};

export const WithLongValues = ResponsiveTemplate.bind({});
WithLongValues.args = {
    data: data.map((dataPoint) => ({...dataPoint, sales: dataPoint.sales * 10000000})),
    valueFormatter: valueFormatter, 
    category: 'sales',
    dataKey: 'city',
};

export const WithVariantPie = DefaultTemplate.bind({});
WithVariantPie.args = {
    data: data,
    category: 'sales',
    variant: 'pie',
    dataKey: 'city',
};

export const WithNoData = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoData.args = {
};

export const BlockExample = BlockTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BlockExample.args = {
    data: data,
    category: 'sales',
    dataKey: 'city',
    valueFormatter: valueFormatter,
    marginTop: 'mt-6'
};
