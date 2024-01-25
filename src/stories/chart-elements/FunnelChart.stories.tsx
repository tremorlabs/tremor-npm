import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { FunnelChart } from "components";
import { valueFormatter } from "./helpers/utils";

const data = [
    { name: "/home", value: 1010 },
    { name: "/imprint", value: 351 },
    { name: "/cancellation", value: 271 },
    {
        name: `/special-offer-august-getsahdkjhagskdfjhgakshjgdfkjahsgdfjkgasdjkhfgajkshgdfjkhagsdkjhfgajhksdgfjkhasdg
          fjkhagsdjhkgfasjkdgfjkasdhgkjgfdsk`,
        value: 191,
    },
    { name: "/documentation", value: 10 },
];

const meta: Meta<typeof FunnelChart> = {
    title: "Visualizations/Chart/FunnelChart",
    component: FunnelChart,
    args: { data },
    parameters: {
        sourceLink:
            "https://github.com/tremorlabs/tremor/tree/main/src/components/chart-elements/FunnelChart",
    },
};

export default meta;
type Story = StoryObj<typeof FunnelChart>;

export const Default: Story = {
    args: {},
};

export const WithVariantCenter: Story = {
    args: {
        variant: "center",
    },
};

export const WithValueAtTop: Story = {
    args: {
        valuePosition: "top"
    },
};

export const WithoutGradient: Story = {
    args: {
        showGradient: false
    },
};

export const WithoutName: Story = {
    args: {
        showName: false
    },
};

export const WithoutValue: Story = {
    args: {
        showValue: false
    },
};

export const WithoutPercentage: Story = {
    args: {
        showPercentage: false
    },
};

export const CustomColor: Story = {
    args: {
        color: "emerald"
    },
};

// export const OtherColor: Story = {
//     args: {
//         color: "orange-100"
//     },
// };

export const WithValueFormatter: Story = {
    args: {
        valueFormatter: (e) => `${e} users`
    },
};

export const CalculateFromPreviousValue: Story = {
    args: {
        calculateFrom: "previous",
        className: 'h-[600px]'
    },
};

export const CalculateFromPreviousValueAndCenter: Story = {
    args: {
        calculateFrom: "previous",
        variant: "center",
    },
};