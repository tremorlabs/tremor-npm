import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { DonutChart } from "components";

import {
  simpleSingleCategoryData as data,
  simpleBaseChartData as data2,
} from "stories/chart-elements/helpers/testData";
import { currencyValueFormatter } from "lib";
import { CustomTooltipType } from "components/chart-elements/common/CustomTooltipProps";

const meta: Meta<typeof DonutChart> = {
  title: "Tremor/ChartElements/DonutChart",
  component: DonutChart,
  args: { category: "sales", index: "city", data },
  // parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;
//   if (args.onValueChange?.length === 0) {
//     args.onValueChange = undefined;
//   }
//   return (
//     <>
//       <Title>Base Layer (Beta)</Title>
//       <div className="w-full mt-4">
//         <Card>
//           <Title>Sales</Title>
//           <DonutChart className="mt-5" {...args} />
//           <div className="mt-6">
//             <List>
//               {data.map((item) => (
//                 <ListItem key={item.city}>
//                   <span> {item.city} </span>
//                   <Flex className="space-x-2" justifyContent="end">
//                     <BadgeDelta
//                       deltaType={item.deltaType as DeltaType}
//                       isIncreasePositive={true}
//                       size="xs"
//                     >
//                       {item.delta}
//                     </BadgeDelta>
//                   </Flex>
//                 </ListItem>
//               ))}
//             </List>
//           </div>
//         </Card>
//       </div>
//     </>
//   );
// };

export const Default: Story = {
  args: {},
};

export const ValueFormatter: Story = {
  args: { valueFormatter: currencyValueFormatter },
};

export const WithCustomLabel: Story = {
  args: { valueFormatter: currencyValueFormatter, label: "Hello there" },
};

export const WithLabelDisabled: Story = {
  args: { valueFormatter: currencyValueFormatter, label: "Hello there", showLabel: false },
};

export const WithOtherColors: Story = {
  args: { colors: ["blue", "amber", "sky", "emerald", "rose", "orange"] },
};

export const WithMoreDatapointsThanColors: Story = {
  args: {
    data: [
      // extra long data array
      ...data,
      ...data,
    ],
    colors: ["blue", "amber", "sky", "emerald", "rose", "orange"],
  },
};

export const WithLongValues: Story = {
  args: {
    data: data.map((dataPoint) => ({
      ...dataPoint,
      sales: dataPoint.sales * 10000000,
    })),
    valueFormatter: currencyValueFormatter,
  },
};

export const WithVariantPie: Story = {
  args: { variant: "pie" },
};

export const WithNoData: Story = {
  args: { data: [] },
};

export const WithNoDataText: Story = {
  args: { data: [], noDataText: "No data, try again later." },
};

export const Animation: Story = {
  args: {
    showAnimation: true,
  },
};

export const LongAnimation: Story = {
  args: {
    showAnimation: true,
    animationDuration: 5000,
  },
};

export const WithOnValueChangeExample: Story = {
  args: { onValueChange: (value) => alert(JSON.stringify(value)) },
};

export const WithOnValueChangePieExample: Story = {
  args: { variant: "pie", onValueChange: (value) => alert(JSON.stringify(value)) },
};

//Custom tooltips
export const WithCustomTooltipSimple: Story = {
  args: {
    data: data2,
    index: "month",
    category: "Sales",
    valueFormatter: currencyValueFormatter,
    customTooltip: (props: CustomTooltipType) => {
      const { payload, active, label } = props;
      if (!active || !payload) return null;
      const categoryPayload = payload?.[0];
      if (!categoryPayload) return null;
      return (
        <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
          <div className="flex flex-1 space-x-2.5">
            <div className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`} />
            <div className="w-full">
              <div className="flex items-center justify-between space-x-8">
                <p className="text-right text-tremor-content whitespace-nowrap">
                  {categoryPayload.name}
                </p>
                <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                  {currencyValueFormatter(categoryPayload.value as number)}
                </p>
              </div>
              <p>{label}</p>
              <p>{categoryPayload.dataKey}</p>
            </div>
          </div>
        </div>
      );
    },
  },
};
