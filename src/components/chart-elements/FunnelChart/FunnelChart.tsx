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
const HALF_PADDING = GLOBAL_PADDING / 2;
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
    showTooltip?: boolean;
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
        showYAxis = calculateFrom === "previous" ? false : true,
        yAxisPadding = showYAxis ? 45 : 0,
        showTooltip = true,
        ...other
    } = props;
    const svgRef = React.useRef<SVGSVGElement>(null);
    const tooltipRef = React.useRef<HTMLDivElement>(null);

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

    React.useEffect(() => {
        const handleTooltipOverflows = () => {
            if (tooltipRef.current) {
                const boundingBox = tooltipRef.current.getBoundingClientRect();
                
                if (boundingBox.right > window.innerWidth) {
                    tooltipRef.current.style.left = `${width - boundingBox.width}px`;
                }
            }
        }

        handleTooltipOverflows();
        window.addEventListener('resize', handleTooltipOverflows);
        return () => {
            window.removeEventListener('resize', handleTooltipOverflows);
        };
    }, [tooltip, width]);

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
        <div className="tremor-wrapper relative">
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
                                x1={yAxisPadding + HALF_PADDING}
                                y1={index * realHeight / 4 + HALF_PADDING}
                                x2={width - HALF_PADDING}
                                y2={index * realHeight / 4 + HALF_PADDING}
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
                            x={yAxisPadding - 10 + HALF_PADDING}
                            y={index * realHeight / 4 + 5 + HALF_PADDING}
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
                            x={item.startX - 0.5 * tickGap + HALF_PADDING + yAxisPadding}
                            y={HALF_PADDING}
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
                                x={item.startX + HALF_PADDING + yAxisPadding}
                                y={realHeight - (isPreviousCalculation ? formattedData[index - 1]?.barHeight || realHeight : realHeight) + HALF_PADDING}
                                width={barWidth}
                                height={(realHeight - item.barHeight - (isPreviousCalculation ? realHeight - formattedData[index - 1]?.barHeight || 0 : 0)) / (isVariantCenter ? 2 : 1)}
                                fill={`url(#base-gradient)`}
                            />
                        ) : null}

                        {/* Draw bar */}
                        <rect
                            x={item.startX + HALF_PADDING + yAxisPadding}
                            y={(isVariantCenter ? realHeight / 2 - item.barHeight / 2 : item.startY) + HALF_PADDING}
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
                                x={item.startX + HALF_PADDING + yAxisPadding}
                                y={realHeight / 2 + item.barHeight / 2 + HALF_PADDING}
                                width={barWidth}
                                height={(realHeight - item.barHeight) / 2}
                                fill={`url(#base-gradient-revert)`}
                            />
                        ) : null}

                        {/* Draw label */}
                        <text
                            x={item.startX + barWidth / 2 + HALF_PADDING + yAxisPadding}
                            y={realHeight + 15 + HALF_PADDING}
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
                                            ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${realHeight / 2 + item.nextBarHeight / 4 + HALF_PADDING}
                                            ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${realHeight / 2 + item.nextBarHeight / 4 + HALF_PADDING}
                                            ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${realHeight / 2 - item.nextBarHeight / 2 + HALF_PADDING}
                                            ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${realHeight / 2 - item.barHeight / 2 + HALF_PADDING}
                                        `}
                                            fill={`url(#base-gradient)`}
                                            className='z-10'
                                        />
                                        <polygon
                                            key={index}
                                            points={`
                                            ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${realHeight / 2 + item.barHeight / 2 + HALF_PADDING}
                                            ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${realHeight / 2 + item.nextBarHeight / 2 + HALF_PADDING}
                                            ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${realHeight / 2 - item.nextBarHeight / 4 + HALF_PADDING}
                                            ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${realHeight / 2 - item.nextBarHeight / 4 + HALF_PADDING}
                                        `}
                                            fill={`url(#base-gradient-revert)`}
                                            className='z-10'
                                        />
                                    </>
                                ) : (
                                    <polygon
                                        key={index}
                                        points={`
                                            ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${item.startY + HALF_PADDING} 
                                            ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${realHeight - item.nextBarHeight + HALF_PADDING} 
                                            ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${realHeight + HALF_PADDING} 
                                            ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${realHeight + HALF_PADDING}
                                        `}
                                        fill={`url(#base-gradient)`}
                                        className='z-10'
                                    />
                                )}
                            </>
                        ) : null}
                        {/* hover trasnparent rect for tooltip */}
                        <rect
                            x={item.startX - 0.5 * tickGap + HALF_PADDING + yAxisPadding}
                            y={HALF_PADDING}
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
            {showTooltip ? (
                <div
                    ref={tooltipRef}
                    className={tremorTwMerge(
                        "absolute top-0 pointer-events-none",
                        tooltip.data ? "visible" : "hidden",
                    )}
                    tabIndex={-1}
                    role='dialog'
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
                                {tooltip?.data?.name}
                            </p>
                        </div>

                        <div className={tremorTwMerge("px-4 py-2 space-y-1")}>
                            {tooltip.data ? (
                                <ChartTooltipRow
                                    value={valueFormatter(tooltip.data.value)}
                                    name={`${(tooltip.data.normalizedValue * 100).toFixed(2)}%`}
                                    color={color ?? BaseColors.Blue}
                                />
                            ) : null}
                        </div>
                    </ChartTooltipFrame>
                </div>
            ) : null}
        </div>
    );
});

FunnelChart.displayName = 'FunnelChart';

export default FunnelChart;
