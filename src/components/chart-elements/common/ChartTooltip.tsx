import React from "react";
import { tremorTwMerge } from "../../../lib";

import { Color, ValueFormatter } from "../../../lib";
import { BaseColors, border, getColorClassNames, sizing, spacing } from "lib";
import { colorPalette } from "lib/theme";
import { SelectionProps } from "components/chart-elements/LineChart/LineChart";

export const ChartTooltipFrame = ({ children }: { children: React.ReactNode }) => (
    <div
        className={tremorTwMerge(
            // common
            "rounded-tremor-default text-tremor-default",
            // light
            "bg-tremor-background shadow-tremor-dropdown border-tremor-border",
            // dark
            "dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown dark:border-dark-tremor-border",
            border.sm.all,
        )}
    >
        {children}
    </div>
);

export interface ChartTooltipRowProps {
    value: string;
    name: string;
    color: Color;
    textColor?: 'green' | 'red' | null
}

const getSelectionPayloadValue = (payload: any, dataKey: string) => (
    payload.find((e: any) => e.dataKey === dataKey)?.value ?? 0
)

export const ChartTooltipRow = ({ value, name, color, textColor }: ChartTooltipRowProps) => (
    <div className="flex items-center justify-between space-x-8">
        <div className="flex items-center space-x-2">
            <span
                className={tremorTwMerge(
                    // common
                    "shrink-0 rounded-tremor-full",
                    // light
                    "border-tremor-background shadow-tremor-card",
                    // dark
                    "dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
                    getColorClassNames(color, colorPalette.background).bgColor,
                    sizing.sm.height,
                    sizing.sm.width,
                    border.md.all,
                )}
            />
            <p
                className={tremorTwMerge(
                    // commmon
                    "text-right whitespace-nowrap",
                    // light
                    "text-tremor-content",
                    // dark
                    "dark:text-dark-tremor-content",
                )}
            >
                {name}
            </p>
        </div>
        <p
            className={tremorTwMerge(
                // common
                "font-medium tabular-nums text-right whitespace-nowrap",
                // light
                "text-tremor-content-emphasis",
                // dark
                "dark:text-dark-tremor-content-emphasis",
                textColor && `text-${textColor}-500`
            )}
        >
            {value}
        </p>
    </div>
);

export interface ChartTooltipProps {
    active: boolean | undefined;
    payload: any;
    label: string;
    categoryColors: Map<string, Color>;
    valueFormatter: ValueFormatter;
    selection?: SelectionProps;
}

const ChartTooltip = ({
    active,
    payload,
    label,
    categoryColors,
    valueFormatter,
    selection
}: ChartTooltipProps) => {
    const hasSelection = Boolean(selection?.leftArea && selection?.rightArea)

    if(hasSelection && selection?.leftArea?.activeLabel === selection?.rightArea?.activeLabel)
        return null

    if (active && payload ) {
        return (
            <ChartTooltipFrame>
                <div
                    className={tremorTwMerge(
                        // light
                        "border-tremor-border",
                        // dark
                        "dark:border-dark-tremor-border",
                        spacing.twoXl.paddingX,
                        spacing.sm.paddingY,
                        border.sm.bottom,
                    )}
                >
                    <p
                        className={tremorTwMerge(
                            // common
                            "font-medium",
                            // light
                            "text-tremor-content-emphasis",
                            // dark
                            "dark:text-dark-tremor-content-emphasis",
                        )}
                    >
                        {hasSelection ? (
                            selection?.leftArea?.chartX < selection?.rightArea?.chartX ? `${selection?.leftArea?.activeLabel} - ${selection?.rightArea?.activeLabel}` : `${selection?.rightArea?.activeLabel} - ${selection?.leftArea?.activeLabel}`
                        ) : (
                            label
                        )}
                    </p>
                </div>

                <div className={tremorTwMerge(spacing.twoXl.paddingX, spacing.sm.paddingY, "space-y-1")}>
                    {payload.map(({ value, name }: { value: number; name: string }, idx: number) => {
                        const isBeforeLeftValue = selection?.leftArea?.chartX > selection?.rightArea?.chartX
                        
                        const displayedValue = hasSelection ? (getSelectionPayloadValue(selection?.rightArea?.activePayload, name) - getSelectionPayloadValue(selection?.leftArea?.activePayload, name)) * (isBeforeLeftValue ? -1 : 1) : value
                        const percentage = hasSelection ? (
                            (100 - (isBeforeLeftValue ? (
                                getSelectionPayloadValue(selection?.leftArea?.activePayload, name) / getSelectionPayloadValue(selection?.rightArea?.activePayload, name) 
                            ) : (
                                getSelectionPayloadValue(selection?.rightArea?.activePayload, name) / getSelectionPayloadValue(selection?.leftArea?.activePayload, name)
                            )) * 100) * -1
                        ) : (
                            0
                        )
                        
                        const percentageValue = hasSelection ? `(${percentage.toFixed(2)}%)` : ''

                        return (
                            <ChartTooltipRow
                                key={`id-${idx}`}
                                value={`${valueFormatter(displayedValue)} ${percentageValue}`}
                                name={name}
                                color={categoryColors.get(name) ?? BaseColors.Blue}
                                textColor={hasSelection ? (displayedValue >= 0 ? 'green' : 'red') : null}
                            />
                        )
                    })}
                </div>
            </ChartTooltipFrame>
        );
    }
    return null;
};

export default ChartTooltip;
