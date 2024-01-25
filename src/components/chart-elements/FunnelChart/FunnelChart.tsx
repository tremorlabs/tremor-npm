"use client";
import React from "react";

import {
    constructCategoryColors,
    getYAxisDomain,
    hasOnlyOneValueForThisKey,
} from "../common/utils";

import {
    BaseColors,
    colorPalette,
    defaultValueFormatter,
    getColorClassNames,
    themeColorRange,
    tremorTwMerge,
    //   tremortremorTwMerge,
} from "lib";
import { Color, CurveType, FunnelValuePositionType, FunnelVariantType, ValueFormatter } from "../../../lib/inputTypes";

const geValuePositionClassnames = (position: FunnelValuePositionType) => {
    switch (position) {
        case "top":
            return "top-2"
        case "bottom":
            return "bottom-2"
        case "center":
            return "top-1/2 -translate-y-1/2"
        default:
            return ""
    }
}

const geValuePositionStyle = (val: number) => {
    switch (true) {
        case (val > 5 && val <= 50):
            return {
                top: `${val}%`,
                transform: `translateX(-50%) translateY(-50%)`
            }
        case (val > 50 && val <= 90):
            return {
                bottom: `${100 - val}%`,
                transform: `translateX(-50%) translateY(50%)`
            }
        case (val <= 5):
            return {
                top: `5%`,
                transform: `translateX(-50%)`
            }
        case (val > 90):
            return {
                bottom: `5%`,
                transform: `translateX(-50%)`
            }
    }
}

type CalculateFrom = "first" | "previous";

// const percentage = (bar.value / maxValue) * 100;
// const topBottomPercentage = (100 - percentage) / (variant === "center" ? 2 : 1);


const getBarHeightPercentage = (bar: DataT, comparedValue: number) => {
    const percentage = bar.value / comparedValue * 100;

    return percentage;
}


type FormattedData = DataT & {
    percentage: number;
    prevValue?: number;
    prevPercentage?: number;
    prevTopBottomPercentage?: number;
    topBottomPercentage?: number;
    prevEmptySpace?: number;
    emptySpace?: number;

}

type DataT = {
    value: number;
    name: string;
}

export interface FunnelChartProps extends React.HTMLAttributes<HTMLDivElement> {
    data: DataT[];
    variant?: FunnelVariantType;
    showName?: boolean;
    showValue?: boolean;
    valuePosition?: FunnelValuePositionType;
    showPercentage?: boolean;
    showGradient?: boolean;
    color?: Color;
    // color?: Color | string;
    valueFormatter?: ValueFormatter;
    calculateFrom?: CalculateFrom;
}

const FunnelChart = React.forwardRef<HTMLDivElement, FunnelChartProps>((props, ref) => {
    const {
        data,
        variant = "base",
        showName = true,
        showValue = true,
        valuePosition = variant === "center" ? "bottom" : "auto",
        showPercentage = true,
        showGradient = true,
        color,
        valueFormatter = defaultValueFormatter,
        calculateFrom = "first",
        className,
        ...other
    } = props;

    const maxValue = React.useMemo(() => {
        return Math.max(...data.map((e) => e.value));
    }, [data])

    const formattedData = React.useMemo(() => {
        return data.reduce((acc: FormattedData[], curr, index) => {
            const prev = acc[index - 1];
            const prevEmptySpace = prev ? prev.emptySpace : undefined;
            const prevValue = prev ? prev.value : undefined;
            const prevPercentage = prev ? prev.percentage : undefined;

            const percentage = getBarHeightPercentage(curr, (calculateFrom === "previous" ? (prevValue ?? curr.value) : maxValue));

            const prevTopBottomPercentage = prev ? prev.topBottomPercentage : undefined;
            const topBottomPercentage = (100 - percentage) / (variant === "center" ? 2 : 1);

            const emptySpace = 100 - ((100 - (prevEmptySpace ?? 0)) * (prevPercentage ?? 100) / 100);

            return [
                ...acc,
                {
                    ...curr,
                    percentage,
                    prevValue,
                    prevPercentage,
                    prevTopBottomPercentage,
                    topBottomPercentage,
                    prevEmptySpace,
                    emptySpace,
                }
            ]
        }, [])
    }, [data, maxValue])

    return (
        <div
            ref={ref}
            className={tremorTwMerge(
                "flex gap-2 w-full h-80",
                className
            )}
            {...other}
        >
            {formattedData.map((bar) => {
                const percentage = bar.percentage;
                const topBottomPercentage = bar.topBottomPercentage ?? 0;

                const emptySpace = variant === "center" ? (bar.emptySpace ?? 0) / 2 : bar.emptySpace;

                return (
                    <div
                        className={tremorTwMerge(
                            "h-full flex-1",
                        )}
                        style={{ width: `calc(${(100 / data.length)}% - ${8 * data.length - 1}px)` }}
                    >
                        <div
                            className={tremorTwMerge(
                                "relative w-full overflow-hidden",
                                showName ? "h-[calc(100%-28px)]" : "h-full",
                            )}
                        >
                            {calculateFrom === "previous" ? (
                                <div
                                    style={{ height: `${emptySpace}%` }}
                                />
                            ) : null}
                            <div
                                className="w-full"
                                style={{ height: `${calculateFrom === "previous" ? 100 - (bar.emptySpace ?? 0) : 100}%` }}
                            >

                                <div
                                    className={tremorTwMerge(
                                        "relative w-full",
                                        showGradient ? (
                                            tremorTwMerge(
                                                "bg-gradient-to-b",
                                                color ? (
                                                    getColorClassNames(color, colorPalette.lightBackground).fromColor
                                                ) : (
                                                    " from-tremor-brand-muted dark:from-dark-tremor-brand-faint"
                                                ),
                                                "to-transparent"
                                            )
                                        ) : "",
                                        "transition-all duration-500 ease-in-out"
                                    )}
                                    style={{ height: `${topBottomPercentage}%` }}
                                />
                                <div
                                    className={tremorTwMerge(
                                        "transition-all duration-500 ease-in-out",
                                        color ? getColorClassNames(color, colorPalette.background).bgColor : "bg-tremor-brand dark:bg-dark-tremor-brand"
                                    )}
                                    style={{ height: `${percentage}%` }}
                                ></div>
                                {variant === "center" ? (
                                    <>
                                    <div
                                        className={tremorTwMerge(
                                            "relative w-full",
                                            showGradient ? (
                                                tremorTwMerge(
                                                    "bg-gradient-to-t",
                                                    color ? (
                                                        getColorClassNames(color, colorPalette.lightBackground).fromColor
                                                    ) : (
                                                        " from-tremor-brand-muted dark:from-dark-tremor-brand-faint"
                                                    ),
                                                    "to-transparent"
                                                )
                                            ) : "",
                                            "transition-all duration-500 ease-in-out"
                                        )}
                                        style={{ height: `${topBottomPercentage}%` }}
                                    />
                                    {calculateFrom === "previous" ? (
                                        <div
                                            style={{ height: `${emptySpace}%` }}
                                        />
                                    ) : null}
                                    </>
                                ) : null}
                                {showValue ? (
                                    <div
                                        className={tremorTwMerge(
                                            "absolute left-1/2 transform -translate-x-1/2",
                                            "flex justify-center items-center",
                                            "bg-tremor-background dark:bg-dark-tremor-background text-2xl font-semibold border border-tremor-border dark:border-dark-tremor-border",
                                            "w-[80%] truncate p-1",
                                            "flex flex-col gap-1",
                                            "rounded-md text-sm",
                                            "shadow-md",
                                            "transition-all duration-500 ease-in-out",
                                            valuePosition === "auto" ? "" : geValuePositionClassnames(valuePosition),
                                        )}
                                        style={valuePosition === "auto" ? geValuePositionStyle(emptySpace ? (emptySpace + ((100 - emptySpace) * topBottomPercentage) / 100 ) : topBottomPercentage) : {}}
                                    >
                                        <span>
                                            {valueFormatter(bar.value)}
                                        </span>
                                        {showPercentage ? (
                                            <span
                                                className={tremorTwMerge(
                                                    "text-xs font-normal px-2 py-0.5 rounded-tremor-small",
                                                    color ? getColorClassNames(color, colorPalette.lightBackground).bgColor : "bg-tremor-brand-faint dark:bg-dark-tremor-brand-faint",
                                                    color ? getColorClassNames(color, colorPalette.background).textColor : "text-tremor-brand dark:text-dark-tremor-brand"
                                                )}
                                            >
                                                {`${percentage.toFixed(0)}%`}
                                            </span>
                                        ) : null}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        {showName ? (
                            <div
                                className={tremorTwMerge(
                                    "h-7 truncate px-2 text-center",
                                    "text-tremor-content dark:text-dark-tremor-content"
                                )}
                            >
                                {bar.name}
                            </div>
                        ) : null}
                    </div>
                )
            })}
        </div>
    );
});

FunnelChart.displayName = "FunnelChart";

export default FunnelChart;
