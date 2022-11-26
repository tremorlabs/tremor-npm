import React from 'react';

import { ChartTooltipFrame, ChartTooltipRow } from 'components/chart-elements/common/ChartTooltip';
import { classNames, spacing } from 'lib';
import { ValueFormatter } from '../../../lib/inputTypes';

export interface DonutChartTooltipProps {
    active: boolean | undefined,
    payload: any,
    valueFormatter: ValueFormatter,
}

export const DonutChartTooltip = ({
    active,
    payload,
    valueFormatter,
}: DonutChartTooltipProps) => {
    if (active && payload[0]) {
        const payloadRow = payload[0];
        return (
            <ChartTooltipFrame>
                <div className={ classNames(
                    spacing.twoXl.paddingLeft,
                    spacing.twoXl.paddingRight,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                ) }>
                    <ChartTooltipRow
                        value={  valueFormatter(payloadRow.value) }
                        name={ payloadRow.name }
                        color={ payloadRow.payload.color }
                    />
                </div>
            </ChartTooltipFrame>
        );
    }
    return null;
};
