import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AreaChart, Card, Title } from "components";
import {
    simpleBaseChartData as data,
    simpleBaseChartDataWithNulls,
    singleAndMultipleData,
} from "./helpers/testData";
import { valueFormatter } from "./helpers/utils";
import { Color, ValueFormatter, border, spacing, tremorTwMerge } from "lib";
import { CustomTooltipType } from "components/chart-elements/common/CustomTooltipProps";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Tremor/ChartElements/AreaChart",
    component: AreaChart,
} as ComponentMeta<typeof AreaChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof AreaChart> = (args) => {
    if (args.onValueChange?.length === 0) {
        args.onValueChange = undefined;
    }

    return (
        <>
            <Title>Mobile</Title>
            <div className="w-64">
                <Card>
                    <AreaChart {...args} />
                </Card>
            </div>
            <Title className="mt-5">Desktop</Title>
            <Card>
                <AreaChart {...args} />
            </Card>
        </>
    );
};

const DefaultTemplate: ComponentStory<typeof AreaChart> = ({ ...args }) => {
    if (args.onValueChange?.length === 0) {
        args.onValueChange = undefined;
    }

    return (
        <Card>
            <AreaChart {...args} />
        </Card>
    );
};

const args = { categories: ["Sales", "Successful Payments"], index: "month" };

export const DefaultResponsive = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
    ...args,
    data,
};

export const WithStacked = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithStacked.args = {
    ...args,
    data,
    stack: true,
};

export const WithValueFormatter = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithValueFormatter.args = {
    ...args,
    data,
    valueFormatter: valueFormatter,
    colors: ["red", "green"],
};

export const WithAutoMinValue = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithAutoMinValue.args = {
    ...args,
    data,
    autoMinValue: true,
};

export const WithMinValueAndMaxValue = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithMinValueAndMaxValue.args = {
    ...args,
    data,
    minValue: -1000,
    maxValue: 4000,
};

export const WithCustomColors = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomColors.args = {
    ...args,
    data,
    colors: ["blue", "green"],
};

export const WithNoGradient = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoGradient.args = {
    ...args,
    data,
    showGradient: false,
};

export const WithChangedCategoriesOrder = DefaultTemplate.bind({});
WithChangedCategoriesOrder.args = {
    ...args,
    data,
};

export const WithLessColorsThanCategories = DefaultTemplate.bind({});
WithLessColorsThanCategories.args = {
    ...args,
    data,
    colors: ["green"],
};

export const WithLongValues = ResponsiveTemplate.bind({});
WithLongValues.args = {
    ...args,
    data,
    categories: ["This is an edge case"],
    valueFormatter: valueFormatter,
};

export const WithMultipleCategories = ResponsiveTemplate.bind({});
WithMultipleCategories.args = {
    ...args,
    data,
    categories: ["Sales", "Successful Payments", "This is an edge case", "Test"],
    valueFormatter: valueFormatter,
};

export const WithNoData = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithNoData.args = {
    ...args,
};

export const WithNoDataText = DefaultTemplate.bind({});
WithNoDataText.args = {
    ...args,
    noDataText: "No data, try again later.",
};

export const WithNoCategories = DefaultTemplate.bind({});
WithNoCategories.args = {
    ...args,
    data,
    index: "month",
};

export const WithNoDataKey = DefaultTemplate.bind({});
WithNoDataKey.args = {
    ...args,
    data,
};

export const WithCurveTypeNatural = DefaultTemplate.bind({});
WithCurveTypeNatural.args = {
    ...args,
    data,
    curveType: "natural",
};

export const WithConnectNullsTrue = DefaultTemplate.bind({});
WithConnectNullsTrue.args = {
    ...args,
    data: simpleBaseChartDataWithNulls,
    connectNulls: true,
};

export const WithConnectNullsFalse = DefaultTemplate.bind({});
WithConnectNullsFalse.args = {
    ...args,
    data: simpleBaseChartDataWithNulls,
};

export const WithNoAnimation = DefaultTemplate.bind({});
WithNoAnimation.args = {
    data: data,
    showAnimation: false,
    categories: ["Sales", "Successful Payments"],
    index: "month",
};

export const WithDefaultAnimationDuration = DefaultTemplate.bind({});
WithDefaultAnimationDuration.args = {
    data: data,
    showAnimation: true,
    categories: ["Sales", "Successful Payments"],
    index: "month",
};

export const WithLongAnimationDuration = DefaultTemplate.bind({});
WithLongAnimationDuration.args = {
    data: data,
    showAnimation: true,
    animationDuration: 5000,
    categories: ["Sales", "Successful Payments"],
    index: "month",
};

export const WithShortAnimationDuration = DefaultTemplate.bind({});
WithShortAnimationDuration.args = {
    data: data,
    showAnimation: true,
    animationDuration: 100,
    categories: ["Sales", "Successful Payments"],
    index: "month",
};

export const WithOnValueChange = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithOnValueChange.args = {
    ...args,
    onValueChange: (v: any) => alert(JSON.stringify(v)),
    data,
};

export const WithOneDataValue = ResponsiveTemplate.bind({});
WithOneDataValue.args = {
    ...args,
    data: data.slice(0, 1),
};

export const WithOneDataValueAndOnValueChange = ResponsiveTemplate.bind({});
WithOneDataValueAndOnValueChange.args = {
    ...args,
    data: data.slice(0, 1),
    onValueChange: (v: any) => alert(JSON.stringify(v)),
};

export const WithOneAndMultipleDataValue = ResponsiveTemplate.bind({});
WithOneAndMultipleDataValue.args = {
    ...args,
    data: singleAndMultipleData,
};

export const WithOneAndMultipleDataValueAndOnValueChange = ResponsiveTemplate.bind({});
WithOneAndMultipleDataValueAndOnValueChange.args = {
    ...args,
    data: singleAndMultipleData,
    onValueChange: (v: any) => alert(JSON.stringify(v)),
};

//Custom tooltips
const customTooltipColors: Color[] = ['cyan']
const customTooltipIndex = 'month'
const customTootipValueFormatter: ValueFormatter = (e: number) => `$ ${e}`
const getBadgeColor = (percentage: number | undefined) => {
    if(!percentage || percentage === 0)
        return 'gray'
    else if(percentage > 0)
        return 'emerald'
    else
        return 'red'
}

export const WithTooltipVersionA = DefaultTemplate.bind({});
WithTooltipVersionA.args = {
    ...args,
    data,
    index: customTooltipIndex,
    categories: ['Sales'],
    colors: customTooltipColors,
    valueFormatter: customTootipValueFormatter,
    customTooltip: (props: CustomTooltipType) => {
        const { payload, active, label } = props
        if (!active) return null

        const categoryPayload = payload[0]
        const color = customTooltipColors[0]
        return (
            <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
                <div className="flex flex-1 space-x-2.5">
                    <div className="w-1.5 flex flex-col bg-cyan-500 rounded" />
                    <div className="w-full">
                        <p className="font-medium text-tremor-content-emphasis">{label}</p>
                        <div className="flex items-center justify-between space-x-8">
                            <p className="text-right text-tremor-content whitespace-nowrap">{categoryPayload.dataKey}</p>
                            <p className="font-medium tabular-nums text-right whitespace-nowrap text-tremor-content-emphasis">{customTootipValueFormatter(categoryPayload.value)}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export const WithTooltipVersionB = DefaultTemplate.bind({});
WithTooltipVersionB.args = {
    ...args,
    data,
    index: customTooltipIndex,
    categories: ['Sales'],
    colors: customTooltipColors,
    valueFormatter: customTootipValueFormatter,
    customTooltip: (props: CustomTooltipType) => {
        const { payload, active, label } = props
        if (!active) return null

        const categoryPayload = payload[0]

        const previousIndex = data.findIndex(e => e[customTooltipIndex] === label)
        const previousValues: any = previousIndex > 0 ? data[previousIndex - 1] : {}
        const prev = previousValues ? previousValues[categoryPayload.dataKey] : undefined
        const percentage = (categoryPayload.value - prev) / ((categoryPayload.value + prev) / 2) * 100 ?? undefined
        const color = getBadgeColor(percentage);
        
        return (
            <div className="transform w-56 flex items-center justify-between rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
                <span className="text-right text-tremor-content whitespace-nowrap">{categoryPayload.dataKey}</span>
                <div className="flex items-center space-x-2">
                    <span className="font-medium tabular-nums text-right whitespace-nowrap text-tremor-content-emphasis">{customTootipValueFormatter(categoryPayload.value)}</span>
                    {percentage ? (
                        <span className={`inline-flex px-2 py-0.5 bg-${color}-100 text-${color}-600 rounded`}>{percentage > 0 ? "+" : ""}{percentage.toFixed(1)}%</span>
                    ) : (
                        null
                    )}
                </div>
            </div>
        )
    }
};
