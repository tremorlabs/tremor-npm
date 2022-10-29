import React from 'react';

import { ChartTooltipFrame, ChartTooltipRow } from 'components/chart-elements/common/ChartTooltip';
import { classNames, spacing } from 'lib';

export interface DonutChartTooltipProps {
    active: boolean | undefined,
    payload: any,
}

export const DonutChartTooltip = ({
    active,
    payload,
}: DonutChartTooltipProps) => {
    if (active && payload[0]) {
        const { value, name, color } = payload[0].payload;
        return (
            <ChartTooltipFrame>
                <div className={ classNames(
                    spacing.twoXl.paddingLeft,
                    spacing.twoXl.paddingRight,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                ) }>
                    <ChartTooltipRow value={ value } name={ name } color={ color } />
                </div>
            </ChartTooltipFrame>
        );
    }
    return null;
};
