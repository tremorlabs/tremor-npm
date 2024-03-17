import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { FunnelChart } from "components";
import { CustomTooltipProps } from "components/chart-elements/common/CustomTooltipProps";
import { Color, currencyValueFormatter } from "lib";
import { valueFormatter } from "./helpers/utils";

const data = [
    { name: "/home", value: 1010 },
    { name: "/imprint", value: 351 },
    { name: "/cancellation", value: 271 },
    {
        name: `/special-offer`,
        value: 191,
    },
    { name: "/documentation", value: 10 },
];

const meta: Meta<typeof FunnelChart> = {
    title: "Visualizations/Chart/FunnelChart",
    component: FunnelChart,
    args: { data, className: "h-72" },
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

export const Variant: Story = {
    args: {
        gradient: false,
        evolutionGradient: true
    },
};

export const CustomColor: Story = {
    args: {
        color: "emerald"
    },
};

export const fromPrevious: Story = {
    args: {
        calculateFrom: "previous"
    },
};
