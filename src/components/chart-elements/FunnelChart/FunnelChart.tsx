import React from 'react';
import { ChartTooltipFrame, ChartTooltipRow } from '../common/ChartTooltip';
import { BaseColors, Color, colorPalette, defaultValueFormatter, getColorClassNames, tremorTwMerge } from 'lib';

type CalculateFrom = "first" | "previous";

type Tooltip = {
    x: number;
    y: number;
    data?: DataT;
    index?: number;
};

type DataT = {
    value: number;
    name: string;
}

export interface FunnelChartProps extends React.SVGProps<SVGSVGElement> {
    data: DataT[];
    tickGap?: number;
    evolutionGradient?: boolean;
    gradient?: boolean;
    valueFormatter?: (value: number) => string;
    calculateFrom?: CalculateFrom;
    color?: Color;
};

const FunnelChart = React.forwardRef<SVGSVGElement, FunnelChartProps>((props: FunnelChartProps, ref) => {
    const {
        data,
        tickGap = 30,
        gradient = true,
        evolutionGradient = false,
        valueFormatter = defaultValueFormatter,
        className,
        calculateFrom = "first",
        color,
        ...other
    } = props;
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [tooltip, setTooltip] = React.useState<Tooltip>({ x: 0, y: 0 })

    const maxValue = Math.max(...data.map(item => item.value));

    const barWidth = ((width - (data.length - 1) * tickGap) - tickGap) / data.length;
    const realHeight = height - 30

    React.useLayoutEffect(() => {
        const handleResize = () => {
            if (svgRef.current) {
                setWidth(svgRef.current.getBoundingClientRect().width);
                setHeight(svgRef.current.getBoundingClientRect().height);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [svgRef]);

    //TBD: Add calculation for an empty space at to of each bar when calculateFrom is "previous"
    const formattedData = React.useMemo(() => {
        return data.map((item, index) => {
            const value = item.value;
            const normalizedValue = value / maxValue;
            const barHeight = normalizedValue * realHeight;
            const startX = index * (barWidth + tickGap) + 0.5 * tickGap;
            const startY = realHeight - barHeight;
            const nextValue = data[index + 1]?.value;
            const nextNormalizedValue = nextValue / maxValue;
            const nextBarHeight = nextNormalizedValue * realHeight;
            const nextStartX = (index + 1) * (barWidth + tickGap) + 0.5 * tickGap;

            return {
                value,
                name: item.name,
                startX,
                startY,
                barHeight,
                nextValue,
                nextNormalizedValue,
                nextBarHeight,
                nextStartX,
            };
        });
    }, [data, width, realHeight]);

    return (
        <div className="relative">
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                className={tremorTwMerge('w-full h-full', className)}
                {...other}
            >
                {formattedData.map((item, index) => (
                    <g key={index}>
                        {/* hover gray rect */}
                        <rect
                            x={item.startX - 0.5 * tickGap}
                            y={0}
                            width={barWidth + tickGap}
                            height={realHeight}
                            fill="currentColor"
                            className={tremorTwMerge(
                                "z-0",
                                tooltip.index === index ? 'text-tremor-background-muted' : 'text-transparent',
                            )}
                        />

                        {/* TBD: Draw empty rect when calculateFrom is "previous" */}

                        {/* Draw gradient bar to fill space */}
                        {gradient ? (
                            <rect
                                x={item.startX}
                                y={0}
                                width={barWidth}
                                height={realHeight - item.barHeight}
                                fill={`url(#base-gradient)`}
                            />
                        ) : null}

                        {/* Draw bar */}
                        <rect
                            x={item.startX}
                            y={item.startY}
                            width={barWidth}
                            height={item.barHeight}
                            fill='currentColor'
                            // className='text-tremor-brand'
                            className={tremorTwMerge(
                                getColorClassNames(
                                    color ?? BaseColors.Blue,
                                    colorPalette.text,
                                ).textColor
                            )}
                        />

                        {/* Draw gradient polygon between bars */}
                        {index < data.length - 1 && evolutionGradient ? (
                            <polygon
                                points={`
                                    ${item.startX + barWidth},
                                    ${item.startY} ${item.nextStartX},
                                    ${realHeight - item.nextBarHeight} ${item.nextStartX},
                                    ${realHeight} ${item.startX + barWidth},
                                    ${realHeight}
                                `}
                                fill={`url(#base-gradient)`}
                                className='z-10'
                            />
                        ) : null}

                        {/* Draw label */}
                        <text x={item.startX + barWidth / 2} y={realHeight + 15} textAnchor="middle" fontSize="12px" className='truncate' width={barWidth}>
                            {item.name}
                        </text>

                        {/* hover gray rect */}
                        <rect
                            x={item.startX - 0.5 * tickGap}
                            y={0}
                            width={barWidth + tickGap}
                            height={realHeight}
                            fill="transparent"
                            onMouseEnter={() => setTooltip({ x: item.startX, y: item.startY, data: item, index })}
                            onMouseLeave={() => setTooltip({ x: 0, y: 0 })}
                        />
                    </g>
                ))}
                {formattedData.map((item, index) => (
                    index < data.length - 1 && evolutionGradient ? (
                        <polygon
                            points={`
                                ${item.startX + barWidth},
                                ${item.startY} ${item.nextStartX},
                                ${realHeight - item.nextBarHeight} ${item.nextStartX},
                                ${realHeight} ${item.startX + barWidth},
                                ${realHeight}
                            `}
                            fill={`url(#base-gradient)`}
                            className='z-10'
                        />
                    ) : null
                ))}

                <linearGradient
                    id={"base-gradient"}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                    className={tremorTwMerge(
                        getColorClassNames(
                            color ?? BaseColors.Blue,
                            colorPalette.text,
                        ).textColor
                    )}
                >
                    <stop
                        offset="5%"
                        stopColor="currentColor"
                        stopOpacity={
                            0.4
                        }
                    />
                    <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
            </svg>
            {/* TBD: Deal with tooltip that can overflow */}
            {tooltip.data ? (
                <div
                    className="absolute top-0"
                    style={{
                        left: tooltip.x + barWidth * 0.66,
                    }}
                >
                    <ChartTooltipFrame>
                        <div
                            className={tremorTwMerge(
                                // light
                                "border-tremor-border border-b px-4 py-2",
                                // dark
                                "dark:border-dark-tremor-border",
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
                                {tooltip.data.name}
                            </p>
                        </div>

                        <div className={tremorTwMerge("px-4 py-2 space-y-1")}>
                            <ChartTooltipRow
                                value={valueFormatter(tooltip.data.value)}
                                name={tooltip.data.name}
                                color={color ?? BaseColors.Blue}
                            />
                        </div>
                    </ChartTooltipFrame>
                </div>
            ) : null}
        </div>
    );
});

FunnelChart.displayName = 'FunnelChart';

export default FunnelChart;
