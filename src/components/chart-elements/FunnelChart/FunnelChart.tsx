import React from 'react';
import { ChartTooltipFrame, ChartTooltipRow } from '../common/ChartTooltip';
import { BaseColors, Color, colorPalette, defaultValueFormatter, getColorClassNames, tremorTwMerge } from 'lib';

type FormattedDataT = {
    value: number;
    normalizedValue: number;
    name: string;
    startX: number;
    startY: number;
    barHeight: number;
    nextValue: number;
    nextNormalizedValue: number;
    nextBarHeight: number;
    nextStartX: number;
};

type CalculateFrom = "first" | "previous";

type Tooltip = {
    x: number;
    y: number;
    data?: FormattedDataT;
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

    const isPreviousCalculation = calculateFrom === "previous";

    React.useLayoutEffect(() => {
        const handleResize = () => {
            if (svgRef.current) {
                const boundingBox = svgRef.current.getBoundingClientRect();
                
                setWidth(boundingBox.width);
                setHeight(boundingBox.height);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //TBD: Add calculation for an empty space at to of each bar when calculateFrom is "previous"
    const formattedData = React.useMemo(() => {
        if(realHeight <= 0) return [];
        return data.reduce((acc: FormattedDataT[], item, index) => {
            const prev = acc[index - 1];
            const value = item.value;
            const valueToCompareWith = isPreviousCalculation ? (prev?.value ?? value) : maxValue;
            const calculationHeight = isPreviousCalculation ? (prev?.barHeight ?? realHeight) : realHeight;
            
            const normalizedValue = value / valueToCompareWith;
            const barHeight = normalizedValue * calculationHeight;
            const startX = index * (barWidth + tickGap) + 0.5 * tickGap;
            const startY = calculationHeight - barHeight + (isPreviousCalculation ? realHeight - (prev?.barHeight ?? realHeight) : 0);
            const nextValue = data[index + 1]?.value;
            const nextNormalizedValue = nextValue / valueToCompareWith;
            const nextBarHeight = nextNormalizedValue * calculationHeight;
            const nextStartX = (index + 1) * (barWidth + tickGap) + 0.5 * tickGap;

            acc.push({
                value,
                normalizedValue,
                name: item.name,
                startX,
                startY,
                barHeight,
                nextValue,
                nextNormalizedValue,
                nextBarHeight,
                nextStartX
            });

            return acc
        },[]);
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
                        {/* Hover gray rect */}
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

                        {/* Draw gradient bar to fill space */}
                        {gradient ? (
                            <rect
                                x={item.startX}
                                y={realHeight - (isPreviousCalculation ? formattedData[index - 1]?.barHeight || realHeight : realHeight)}
                                width={barWidth}
                                height={realHeight - item.barHeight - (isPreviousCalculation ? realHeight - formattedData[index - 1]?.barHeight || 0 : 0)}
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

                        {/* hover trasnparent rect for tooltip */}
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
                            key={index}
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
                                name={`${(tooltip.data.normalizedValue * 100).toFixed(2)}%`}
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
