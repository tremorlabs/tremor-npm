import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { AreaChart } from "components";
import { CustomTooltipProps } from "components/chart-elements/common/CustomTooltipProps";
import { Color, currencyValueFormatter } from "lib";
import {
  simpleBaseChartData as data,
  longBaseChartData,
  longIndexBaseChartData,
  simpleBaseChartDataWithNulls,
  simpleBaseChartWithNegativeValues,
  singleAndMultipleData,
} from "./helpers/testData";
import { valueFormatter } from "./helpers/utils";

const meta: Meta<typeof AreaChart> = {
  title: "Visualizations/Chart/AreaChart",
  component: AreaChart,
  args: { categories: ["Sales", "Successful Payments"], index: "month", data, className: "h-72" },
};

export default meta;
type Story = StoryObj<typeof AreaChart>;

export const Default: Story = {
  args: {},
};

export const DefaultNegativeValues: Story = {
  args: {
    data: simpleBaseChartWithNegativeValues,
  },
};

export const Stacked: Story = {
  args: {
    stack: true,
  },
};

export const ValueFormatter: Story = {
  args: { valueFormatter: valueFormatter, yAxisWidth: 60 },
};

export const AutoMinValue: Story = {
  args: { autoMinValue: true },
};

export const MinValueAndMaxValue: Story = {
  args: { minValue: -1000, maxValue: 4000 },
};

export const OtherColors: Story = {
  args: { colors: ["rose", "purple"] },
};

export const NoGradient: Story = {
  args: { showGradient: false },
};

export const ChangedCategoriesOrder: Story = {
  args: { categories: ["Successful Payments", "Sales"] },
};

export const LongValues: Story = {
  args: { categories: ["This is an edge case"] },
};

export const MultipleCategories: Story = {
  args: {
    categories: ["Sales", "Successful Payments"],
    yAxisWidth: 110,
  },
};

export const NoData: Story = {
  args: { data: [] },
};

export const NoDataText: Story = {
  args: { data: [], noDataText: "No data, try again later." },
};

export const NoCategories: Story = {
  args: { categories: undefined },
};

export const NoIndex: Story = {
  args: { index: undefined },
};

export const CurveTypeNatural: Story = {
  args: { curveType: "natural" },
};

export const ConnectNullsTrue: Story = {
  args: { data: simpleBaseChartDataWithNulls, connectNulls: true },
};

export const ConnectNullsFalse: Story = {
  args: { data: simpleBaseChartDataWithNulls, connectNulls: false },
};

export const Animation: Story = {
  args: { showAnimation: true },
};

export const LongAnimationDuration: Story = {
  args: { showAnimation: true, animationDuration: 5000 },
};

export const OnValueChange: Story = {
  args: { onValueChange: (v: any) => alert(JSON.stringify(v)) },
};

export const OneDataValue: Story = {
  args: { data: data.slice(0, 1) },
};

export const OneDataValueAndOnValueChange: Story = {
  args: { data: data.slice(0, 1), onValueChange: (v: any) => alert(JSON.stringify(v)) },
};

export const SingleAndMultipleData: Story = {
  args: { data: singleAndMultipleData },
};

export const SingleAndMultipleDataAndOnValueChange: Story = {
  args: { data: singleAndMultipleData, onValueChange: (v: any) => alert(JSON.stringify(v)) },
};

export const PreserveStartEnd: Story = {
  args: { intervalType: "preserveStartEnd" },
};

export const LongDataInput: Story = {
  args: { data: longBaseChartData },
};

export const LongDataInputAndPreserveStartEnd: Story = {
  args: { data: longBaseChartData, intervalType: "preserveStartEnd" },
};

export const LongIndexName: Story = {
  args: { data: longIndexBaseChartData },
};

export const LongIndexNameAndPreserveStartEnd: Story = {
  args: { data: longIndexBaseChartData, intervalType: "preserveStartEnd" },
};

export const MultipleZeroValues: Story = {
  args: {
    data: [
      {
        month: "May 21",
        Sales: 2390,
        "Successful Payments": 0,
      },
      {
        month: "Jun 21",
        Sales: 2390,
        "Successful Payments": 0,
      },
      {
        month: "Jul 21",
        Sales: 3490,
        "Successful Payments": 0,
      },
    ],
  },
};

export const RotateXLabels: Story = {
  args: {
    data: longBaseChartData,
    rotateLabelX: { angle: -45, verticalShift: 15, xAxisHeight: 50 },
  },
};

export const LegendSlider: Story = {
  args: {
    enableLegendSlider: true,
    categories: ["Sales", "Successful Payments", "Test"],
  },
};

export const NoAxes: Story = {
  args: {
    showXAxis: false,
    showYAxis: false,
  },
};

export const NoYAxisStartEndOnly: Story = {
  args: { showYAxis: false, startEndOnly: true },
};

//Custom tooltips
const customTooltipColors: Color[] = ["cyan"];
const customTooltipIndex = "month";
const getBadgeColor = (percentage: number | undefined) => {
  if (!percentage || percentage === 0) return "gray";
  else if (percentage > 0) return "emerald";
  else return "red";
};

export const CustomTooltipSimple: Story = {
  args: {
    yAxisWidth: 65,
    index: customTooltipIndex,
    categories: ["Sales"],
    colors: customTooltipColors,
    valueFormatter: currencyValueFormatter,
    customTooltip: (props: CustomTooltipProps) => {
      const { payload, active, label } = props;
      if (!active || !payload) return null;

      const categoryPayload = payload?.[0];
      if (!categoryPayload) return null;
      return (
        <div className="rounded-tremor-default text-tremor-default bg-tremor-background shadow-tremor-dropdown border-tremor-border w-56 border p-2">
          <div className="flex flex-1 space-x-2.5">
            <div className={`flex w-1.5 flex-col bg-${categoryPayload.color}-500 rounded-sm`} />
            <div className="w-full">
              <p className="text-tremor-content-emphasis font-medium">{label}</p>
              <div className="flex items-center justify-between space-x-8">
                <p className="text-tremor-content text-right whitespace-nowrap">
                  {categoryPayload.dataKey}
                </p>
                <p className="text-tremor-content-emphasis text-right font-medium whitespace-nowrap">
                  {currencyValueFormatter(categoryPayload.value as number)}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
};

export const CustomTooltipPreviousDay: Story = {
  args: {
    yAxisWidth: 65,
    index: customTooltipIndex,
    categories: ["Sales"],
    colors: customTooltipColors,
    valueFormatter: currencyValueFormatter,
    customTooltip: (props: CustomTooltipProps) => {
      const { payload, active, label } = props;
      if (!active || !payload) return null;

      const categoryPayload = payload?.[0];
      if (!categoryPayload) return null;
      const value = categoryPayload.value as number;
      const dataKey = categoryPayload.dataKey as number;

      const previousIndex = data.findIndex((e) => e[customTooltipIndex] === label);
      const previousValues: any = previousIndex > 0 ? data[previousIndex - 1] : {};
      const prev = previousValues ? previousValues[dataKey] : undefined;
      const percentage = ((value - prev) / prev) * 100;
      const color = getBadgeColor(percentage);

      return (
        <div className="rounded-tremor-default text-tremor-default bg-tremor-background shadow-tremor-dropdown border-tremor-border flex w-56 translate-y-14 items-center justify-between border p-2">
          <span className="text-tremor-content text-right whitespace-nowrap">{dataKey}</span>
          <div className="flex items-center space-x-2">
            <span className="text-tremor-content-emphasis text-right font-medium whitespace-nowrap">
              {currencyValueFormatter(value)}
            </span>
            {percentage ? (
              <span
                className={`inline-flex px-1.5 py-0.5 text-xs bg-${color}-100 text-${color}-600 rounded-sm`}
              >
                {percentage > 0 ? "+" : ""}
                {percentage.toFixed(1)}%
              </span>
            ) : null}
          </div>
        </div>
      );
    },
  },
};

export const CustomTooltipComplex: Story = {
  args: {
    yAxisWidth: 65,
    index: customTooltipIndex,
    categories: ["Sales"],
    colors: customTooltipColors,
    valueFormatter: currencyValueFormatter,
    customTooltip: (props: CustomTooltipProps) => {
      const { payload, active, label } = props;
      if (!active || !payload) return null;

      const categoryPayload = payload?.[0];
      if (!categoryPayload) return null;
      const value = categoryPayload.value as number;
      const dataKey = categoryPayload.dataKey as number;

      const previousIndex = data.findIndex((e) => e[customTooltipIndex] === label);
      const previousValues: any = previousIndex > 0 ? data[previousIndex - 1] : {};
      const prev = previousValues ? previousValues[dataKey] : undefined;
      const percentage = ((value - prev) / prev) * 100;
      const badgeColor = getBadgeColor(percentage);

      return (
        <div className="rounded-tremor-default bg-tremor-background shadow-tremor-dropdown border-tremor-border border p-2">
          <div className="flex flex-1 space-x-2.5">
            <div className={`flex w-1 flex-col bg-${categoryPayload.color}-500 rounded-sm`} />
            <div className="w-full">
              <p className="text-tremor-default text-tremor-content-emphasis font-medium">
                {dataKey}
              </p>
              <p className="text-tremor-default text-tremor-content-subtle">{label}</p>
              <p className="text-tremor-content-emphasis mt-2 font-medium whitespace-nowrap">
                {currencyValueFormatter(value)}
              </p>
              {percentage ? (
                <div className="mt-1 flex items-end space-x-2">
                  <div
                    className={`text-tremor-default inline-flex px-1.5 py-0.5 bg-${badgeColor}-100 text-${badgeColor}-600 rounded-sm`}
                  >
                    {percentage > 0 ? "+" : null}
                    {percentage.toFixed(1)}%
                  </div>
                  <div className="text-tremor-default text-tremor-content-subtle whitespace-nowrap">
                    from previous month
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    },
  },
};

export const Padding: Story = {
  args: {
    padding: { left: 0, right: 0 },
  },
};

// keep because of if statement
// const ResponsiveTemplate: ComponentStory<typeof AreaChart> = (args) => {
//   if (args.onValueChange?.length === 0) {
//     args.onValueChange = undefined;
//   }

//   return (
//     <>
//       <Title>Desktop</Title>
//       <Card>
//         <AreaChart {...args} yAxisWidth={60} />
//       </Card>
//       <Title className="mt-5">Mobile</Title>
//       <div className="w-64">
//         <Card>
//           <AreaChart {...args} yAxisWidth={60} />
//         </Card>
//       </div>
//     </>
//   );
// };

// const DefaultTemplate: ComponentStory<typeof AreaChart> = ({ ...args }) => {
//   if (args.onValueChange?.length === 0) {
//     args.onValueChange = undefined;
//   }

//   return (
//     <Card>
//       <AreaChart {...args} yAxisWidth={60} />
//     </Card>
//   );
//

export const tickGap: Story = {
  args: {
    data: longBaseChartData,
    tickGap: 200,
  },
};

export const AxisLabels: Story = {
  args: {
    xAxisLabel: "Month of Year",
    yAxisLabel: "Amount (USD)",
  },
};
