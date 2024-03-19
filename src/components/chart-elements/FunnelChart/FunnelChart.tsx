import React from 'react';
import { ChartTooltipFrame, ChartTooltipRow } from '../common/ChartTooltip';
import { BaseColors, Color, FunnelVariantType, colorPalette, defaultValueFormatter, getColorClassNames, tremorTwMerge } from 'lib';

type FormattedDataT = DataT & {
    normalizedValue: number;
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

const GLOBAL_PADDING = 20;
const Y_AXIS_LABELS = ["100%", "75%", "50%", "25%", "0%"];

export interface FunnelChartProps extends React.SVGProps<SVGSVGElement> {
    data: DataT[];
    tickGap?: number;
    evolutionGradient?: boolean;
    gradient?: boolean;
    valueFormatter?: (value: number) => string;
    calculateFrom?: CalculateFrom;
    color?: Color;
    variant?: FunnelVariantType;
    yAxisPadding?: number;
    showYAxis?: boolean;
    showGridLines?: boolean;
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
        variant = "base",
        showGridLines = true,
        showYAxis = true,
        yAxisPadding = showYAxis ? 45 : 0,
        ...other
    } = props;
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [tooltip, setTooltip] = React.useState<Tooltip>({ x: 0, y: 0 })

    const maxValue = Math.max(...data.map(item => item.value));

    const widthWithoutPadding = width - GLOBAL_PADDING - yAxisPadding;
    const barWidth = ((widthWithoutPadding - (data.length - 1) * tickGap) - tickGap) / data.length;
    const realHeight = height - GLOBAL_PADDING - 30

    const isPreviousCalculation = calculateFrom === "previous";
    const isVariantCenter = variant === "center"

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
        if (realHeight <= 0) return [];
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
        }, []);
    }, [data, width, realHeight, isPreviousCalculation, isVariantCenter]);

    return (
        <div className="relative">
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                className={tremorTwMerge('w-full h-full', className)}
                {...other}
            >
                {/* Draw Y axis labels and lines */}
                {Y_AXIS_LABELS.map((label, index) => (
                    <>
                        {showGridLines ? (
                            <line
                                key={index}
                                x1={yAxisPadding + GLOBAL_PADDING / 2}
                                y1={index * realHeight / 4 + GLOBAL_PADDING / 2}
                                x2={width - GLOBAL_PADDING / 2}
                                y2={index * realHeight / 4 + GLOBAL_PADDING / 2}
                                stroke="currentColor"
                                className={tremorTwMerge(
                                    // common
                                    "stroke-1",
                                    // light
                                    "stroke-tremor-border",
                                    // dark
                                    "dark:stroke-dark-tremor-border",
                                )}
                            />
                        ) : null}
                        <text
                            x={yAxisPadding - 10 + GLOBAL_PADDING / 2}
                            y={index * realHeight / 4 + 5 + GLOBAL_PADDING / 2}
                            textAnchor="end"
                            fontSize="0.75rem"
                            fill=""
                            stroke=""
                            className={tremorTwMerge(
                                // light
                                "fill-tremor-content",
                                // dark
                                "dark:fill-dark-tremor-content",
                            )}
                        >
                            {label}
                        </text>
                    </>
                ))}
                {formattedData.map((item, index) => (
                    <g key={index}>
                        {/* Hover gray rect */}
                        <rect
                            x={item.startX - 0.5 * tickGap + GLOBAL_PADDING / 2 + yAxisPadding}
                            y={GLOBAL_PADDING / 2}
                            width={barWidth + tickGap}
                            height={realHeight}
                            fill="currentColor"
                            className={tremorTwMerge(
                                "z-0 opacity-5",
                                tooltip.index === index ? 'text-tremor-background-emphasis' : 'text-transparent',
                            )}
                        />

                        {/* Draw gradient bar to fill space */}
                        {gradient ? (
                            <rect
                                x={item.startX + GLOBAL_PADDING / 2 + yAxisPadding}
                                y={realHeight - (isPreviousCalculation ? formattedData[index - 1]?.barHeight || realHeight : realHeight) + GLOBAL_PADDING / 2}
                                width={barWidth}
                                height={(realHeight - item.barHeight - (isPreviousCalculation ? realHeight - formattedData[index - 1]?.barHeight || 0 : 0)) / (isVariantCenter ? 2 : 1)}
                                fill={`url(#base-gradient)`}
                            />
                        ) : null}

                        {/* Draw bar */}
                        <rect
                            x={item.startX + GLOBAL_PADDING / 2 + yAxisPadding}
                            y={(isVariantCenter ? realHeight / 2 - item.barHeight / 2 : item.startY) + GLOBAL_PADDING / 2}
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

                        {/* Draw bottom gradient bar to fill space */}
                        {gradient && isVariantCenter ? (
                            <rect
                                x={item.startX + GLOBAL_PADDING / 2 + yAxisPadding}
                                y={realHeight / 2 + item.barHeight / 2 + GLOBAL_PADDING / 2}
                                width={barWidth}
                                height={(realHeight - item.barHeight) / 2}
                                fill={`url(#base-gradient-revert)`}
                            />
                        ) : null}

                        {/* Draw label */}
                        <text
                            x={item.startX + barWidth / 2 + GLOBAL_PADDING / 2 + yAxisPadding}
                            y={realHeight + 15 + GLOBAL_PADDING / 2}
                            textAnchor="middle"
                            fontSize="0.75rem"
                            fill=""
                            stroke=""
                            className={tremorTwMerge(
                                // light
                                "fill-tremor-content",
                                // dark
                                "dark:fill-dark-tremor-content",
                            )}
                            width={barWidth}
                        >
                            {item.name}
                        </text>

                        
                    </g>
                ))}
                {/* Draw gradient polygon between bars */}
                {formattedData.map((item, index) => (
                    <>
                        {index < data.length - 1 && evolutionGradient ? (
                            <>

                                {isVariantCenter ? (
                                    <>
                                        <polygon
                                            key={index}
                                            points={`
                                            ${item.startX + barWidth + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight / 2 + item.nextBarHeight / 4 + GLOBAL_PADDING / 2}
                                            ${item.nextStartX + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight / 2 + item.nextBarHeight / 4 + GLOBAL_PADDING / 2}
                                            ${item.nextStartX + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight / 2 - item.nextBarHeight / 2 + GLOBAL_PADDING / 2}
                                            ${item.startX + barWidth + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight / 2 - item.barHeight / 2 + GLOBAL_PADDING / 2}
                                        `}
                                            fill={`url(#base-gradient)`}
                                            className='z-10'
                                        />
                                        <polygon
                                            key={index}
                                            points={`
                                            ${item.startX + barWidth + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight / 2 + item.barHeight / 2 + GLOBAL_PADDING / 2}
                                            ${item.nextStartX + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight / 2 + item.nextBarHeight / 2 + GLOBAL_PADDING / 2}
                                            ${item.nextStartX + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight / 2 - item.nextBarHeight / 4 + GLOBAL_PADDING / 2}
                                            ${item.startX + barWidth + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight / 2 - item.nextBarHeight / 4 + GLOBAL_PADDING / 2}
                                        `}
                                            fill={`url(#base-gradient-revert)`}
                                            className='z-10'
                                        />
                                    </>
                                ) : (
                                    <polygon
                                        key={index}
                                        points={`
                                            ${item.startX + barWidth + GLOBAL_PADDING / 2 + yAxisPadding}, ${item.startY + GLOBAL_PADDING / 2} 
                                            ${item.nextStartX + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight - item.nextBarHeight + GLOBAL_PADDING / 2} 
                                            ${item.nextStartX + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight + GLOBAL_PADDING / 2} 
                                            ${item.startX + barWidth + GLOBAL_PADDING / 2 + yAxisPadding}, ${realHeight + GLOBAL_PADDING / 2}
                                        `}
                                        fill={`url(#base-gradient)`}
                                        className='z-10'
                                    />
                                )}
                            </>
                        ) : null}
                        {/* hover trasnparent rect for tooltip */}
                        <rect
                            x={item.startX - 0.5 * tickGap + GLOBAL_PADDING / 2 + yAxisPadding}
                            y={GLOBAL_PADDING / 2}
                            width={barWidth + tickGap}
                            height={realHeight}
                            fill="transparent"
                            onMouseEnter={() => setTooltip({ x: item.startX, y: item.startY, data: item, index })}
                            onMouseLeave={() => setTooltip({ x: 0, y: 0 })}
                        />
                    </>
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
                <linearGradient
                    id={"base-gradient-revert"}
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
                        stopOpacity={0}
                    />
                    <stop offset="95%" stopColor="currentColor" stopOpacity={0.4} />
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
