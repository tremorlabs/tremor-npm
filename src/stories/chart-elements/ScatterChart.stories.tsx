import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { ScatterChart } from "components";
import { CustomTooltipType } from "components/chart-elements/common/CustomTooltipProps";
import { Color } from "lib";
import {
  simpleScatterChartData as data,
  simpleScatterChartData2 as data2,
} from "./helpers/testDataScatterChart";

const meta: Meta<typeof ScatterChart> = {
  title: "Visualizations/Chart/ScatterChart",
  component: ScatterChart,
  args: { x: "x", y: "y", size: "z", category: "location", data, className: "h-72" },
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/chart-elements/ScatterChart",
  },
};

export default meta;
type Story = StoryObj<typeof ScatterChart>;

export const Default: Story = {
  args: {},
};

export const NoSize: Story = {
  args: {
    size: undefined,
  },
};

export const CustomSizeRange: Story = {
  args: {
    sizeRange: [1, 10],
  },
};

export const OtherColors: Story = {
  args: {
    colors: ["red", "green", "blue", "yellow"],
  },
};

export const WithCustomValueFormatters: Story = {
  args: {
    valueFormatter: {
      x: (x) => `${x} m`,
      y: (y) => `${y} cm`,
      size: (size) => `${size} kg`,
    },
  },
};

export const AutoMinXValue: Story = {
  args: {
    autoMinXValue: true,
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

export const NoDataText: Story = {
  args: {
    data: [],
    noDataText: "No data, try again later.",
  },
};

export const OnValueChange: Story = {
  args: {
    onValueChange: (value) => alert(JSON.stringify(value)),
  },
};

export const IntervalTypePreserve: Story = {
  args: { intervalType: "preserveStartEnd" },
};

export const RichDataExample: Story = {
  args: {
    data: data2,
    x: "gdpPercap",
    y: "lifeExp",
    category: "continent",
    size: "population",
    valueFormatter: {
      x: (x) => `${x} $`,
      y: (y) => `${y} yrs`,
    },
    colors: ["red", "green", "blue"],
  },
};

export const LegendSlider: Story = {
  args: { enableLegendSlider: true },
};

export const PreserveStartEnd: Story = {
  args: { intervalType: "preserveStartEnd" },
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

export const RotateXLabel: Story = {
  args: {
    rotateLabelX: { angle: -45, verticalShift: 15, xAxisHeight: 50 },
  },
};

//Custom tooltips
const customTooltipColors: Color[] = ["red", "green", "blue", "yellow"];
const customTooltipIndex = "location";

export const CustomTooltip: Story = {
  args: {
    colors: customTooltipColors,
    category: customTooltipIndex,
    customTooltip: (props: CustomTooltipType) => {
      const { payload, active, label } = props;
      if (!active || !payload) return null;

      return (
        <div className="w-48 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
          <div className="flex flex-1 space-x-2.5">
            <div className={`w-1.5 flex flex-col bg-${payload?.[0]?.color}-500 rounded`} />
            <div className="w-full">
              <p className="mb-2 font-medium text-tremor-content-emphasis">{label}</p>
              {payload.map((payloadItem: any, index: number) => (
                <div key={index} className="flex items-center justify-between space-x-8">
                  <p className="text-right text-tremor-content whitespace-nowrap">
                    {payloadItem.name}
                  </p>
                  <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                    {payloadItem.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    },
  },
};
