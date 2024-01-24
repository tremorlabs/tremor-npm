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
import { Color, CurveType, FunnelValuePositionType, FunnelVariantType } from "../../../lib/inputTypes";

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
        className,
        ...other
    } = props;

    const maxValue = Math.max(...data.map((data) => data.value))

    return (
        <div
            ref={ref}
            className={tremorTwMerge(
                "flex gap-2 w-full h-80",
                className
            )}
            {...other}
        >
            {data.map((bar) => {
                const percentage = (bar.value / maxValue) * 100;
                const topBottomPercentage = (100 - percentage) / (variant === "center" ? 2 : 1);

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
                                    // "absolute bottom-0 left-0 right-0",
                                    // "bg-blue-500",
                                    "transition-all duration-500 ease-in-out",
                                    color ? getColorClassNames(color, colorPalette.background).bgColor : "bg-tremor-brand dark:bg-dark-tremor-brand"
                                )}
                                style={{ height: `${percentage}%` }}
                            ></div>
                            {variant === "center" ? (
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
                                    // style={valuePosition === "auto" ?  {
                                    //     top: `${topBottomPercentage > 5 ? (topBottomPercentage < 85 ? topBottomPercentage : 85) : 5}%`, 
                                    //     transform:  topBottomPercentage > 5 ? `translateY(-50%) translateX(-50%)` : `translateX(-50%)`
                                    // } : {}}
                                    style={valuePosition === "auto" ? geValuePositionStyle(topBottomPercentage) : {}}
                                >
                                    <span>
                                        {bar.value}
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
                        {showName ? (
                            <div
                                className='h-7 truncate px-2'
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
