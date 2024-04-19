import React from "react";
import { ChartTooltipFrame, ChartTooltipRow } from "../common/ChartTooltip";
import {
  BaseColors,
  Color,
  FunnelVariantType,
  colorPalette,
  defaultValueFormatter,
  getColorClassNames,
  tremorTwMerge,
} from "lib";
import { CustomTooltipProps, EventProps } from "../common";
import NoData from "../common/NoData";
import { ArrowRightIcon } from "assets";

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
  data?: {
    className?: string;
    name: string;
    fill?: string;
    dataKey: string;
    color?: Color | string;
    value: number;
    payload?: any;
  };
  index?: number;
};

type DataT = {
  value: number;
  name: string;
};

const DEFAULT_X_AXIS_HEIGHT = 15;
const GLOBAL_PADDING = 20;
const HALF_PADDING = GLOBAL_PADDING / 2;
const Y_AXIS_LABELS = ["100%", "75%", "50%", "25%", "0%"];

export interface FunnelChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DataT[];
  evolutionGradient?: boolean;
  gradient?: boolean;
  valueFormatter?: (value: number) => string;
  calculateFrom?: CalculateFrom;
  color?: Color | string;
  variant?: FunnelVariantType;
  yAxisPadding?: number;
  showYAxis?: boolean;
  showXAxis?: boolean;
  showArrow?: boolean;
  showGridLines?: boolean;
  showTooltip?: boolean;
  onValueChange?: (value: EventProps) => void;
  customTooltip?: React.ComponentType<CustomTooltipProps>;
  noDataText?: string;
  rotateLabelX?: {
    angle: number;
    verticalShift?: number;
    xAxisHeight?: number;
  };
  barGap?: number | `${number}%`;
}

//#region Funnel Chart Primitive
// ============================================================================

const FunnelChartPrimitive = React.forwardRef<HTMLDivElement, FunnelChartProps>(
  (props: FunnelChartProps, ref) => {
    const {
      data,
      evolutionGradient = false,
      gradient = true,
      valueFormatter = defaultValueFormatter,
      className,
      calculateFrom = "first",
      color,
      variant = "base",
      showGridLines = true,
      showYAxis = calculateFrom === "previous" ? false : true,
      showXAxis = true,
      showArrow = true,
      yAxisPadding = showYAxis ? 45 : 0,
      showTooltip = true,
      onValueChange,
      customTooltip,
      noDataText,
      rotateLabelX,
      barGap = "20%",
      ...other
    } = props;
    const CustomTooltip = customTooltip;

    const svgRef = React.useRef<SVGSVGElement>(null);
    const tooltipRef = React.useRef<HTMLDivElement>(null);

    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [tooltip, setTooltip] = React.useState<Tooltip>({ x: 0, y: 0 });

    const [activeBar, setActiveBar] = React.useState<any | undefined>(undefined);
    const hasOnValueChange = !!onValueChange;

    function onBarClick(data: any, idx: number, event: React.MouseEvent) {
      event.stopPropagation();
      if (!hasOnValueChange) return;
      if (idx === activeBar?.index) {
        setActiveBar(undefined);
        onValueChange(undefined);
      } else {
        setActiveBar({ data, index: idx });
        onValueChange({
          eventType: "bar",
          categoryClicked: data.name,
          [data.name]: data.value,
          percentage: data.normalizedValue,
        });
      }
    }

    const maxValue = React.useMemo(() => Math.max(...data.map((item) => item.value)), [data]);

    const widthWithoutPadding = width - GLOBAL_PADDING - yAxisPadding;
    const gap = React.useMemo(() => {
      if (typeof barGap === "number") {
        return barGap;
      } else if (typeof barGap === "string" && barGap.endsWith("%")) {
        const percentage = parseFloat(barGap.slice(0, -1));
        const totalWidthForGaps = (widthWithoutPadding * percentage) / 100;
        const numberOfGaps = data.length - 1;
        return totalWidthForGaps / numberOfGaps;
      } else {
        console.error(
          'Invalid barGap value. It must be a number or a percentage string (e.g., "10%").',
        );
        return 30;
      }
    }, [widthWithoutPadding, data.length, barGap]);

    const barWidth = React.useMemo(
      () => (widthWithoutPadding - (data.length - 1) * gap - gap) / data.length,
      [widthWithoutPadding, gap, data.length],
    );
    const realHeight =
      height -
      GLOBAL_PADDING -
      (showXAxis ? (rotateLabelX?.xAxisHeight || DEFAULT_X_AXIS_HEIGHT) + 10 : 0);

    const isPreviousCalculation = calculateFrom === "previous";
    const isVariantCenter = variant === "center";

    React.useLayoutEffect(() => {
      const handleResize = () => {
        if (svgRef.current) {
          const boundingBox = svgRef.current.getBoundingClientRect();

          setWidth(boundingBox.width);
          setHeight(boundingBox.height);
        }
      };

      handleResize();

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [className]);

    React.useEffect(() => {
      const handleTooltipOverflows = () => {
        if (tooltipRef.current) {
          const boundingBox = tooltipRef.current.getBoundingClientRect();

          if (boundingBox.right > window.innerWidth) {
            tooltipRef.current.style.left = `${width - boundingBox.width}px`;
          }
        }
      };

      handleTooltipOverflows();
      window.addEventListener("resize", handleTooltipOverflows);
      return () => {
        window.removeEventListener("resize", handleTooltipOverflows);
      };
    }, [tooltip, width]);

    const formattedData = React.useMemo(() => {
      if (realHeight <= 0) return [];
      return data.reduce((acc: FormattedDataT[], item, index) => {
        const prev = acc[index - 1];
        const value = item.value;
        const valueToCompareWith = isPreviousCalculation ? prev?.value ?? maxValue : maxValue;
        const calculationHeight = isPreviousCalculation
          ? prev?.barHeight ?? realHeight
          : realHeight;

        const normalizedValue = value / valueToCompareWith;
        const barHeight = normalizedValue * calculationHeight;
        const startX = index * (barWidth + gap) + 0.5 * gap;
        const startY =
          calculationHeight -
          barHeight +
          (isPreviousCalculation ? realHeight - (prev?.barHeight ?? realHeight) : 0);
        const nextValue = data[index + 1]?.value;
        const nextNormalizedValue = nextValue / valueToCompareWith;
        const nextBarHeight = nextNormalizedValue * calculationHeight;
        const nextStartX = (index + 1) * (barWidth + gap) + 0.5 * gap;

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
          nextStartX,
        });

        return acc;
      }, []);
    }, [data, realHeight, isPreviousCalculation, barWidth, gap, maxValue]);

    const handleTooltip = (touch: React.Touch) => {
      const chartBoundingRect = svgRef.current?.getBoundingClientRect();
      if (!chartBoundingRect) return;
      const chartX = chartBoundingRect.x;
      const chartY = chartBoundingRect.y;
      const chartTop = chartY + window.scrollY;
      const chartLeft = chartX + window.scrollX + yAxisPadding + HALF_PADDING;
      const chartWidth = chartBoundingRect.width - yAxisPadding - HALF_PADDING;
      const chartHeight =
        chartBoundingRect.height - HALF_PADDING - (showXAxis ? DEFAULT_X_AXIS_HEIGHT : 0);
      const chartRight = chartLeft + chartWidth;
      const chartBottom = chartTop + chartHeight;

      if (
        touch.pageX < chartLeft ||
        touch.pageX > chartRight ||
        touch.pageY < chartTop ||
        touch.pageY > chartBottom
      ) {
        console.log("out of bounds");
        return setTooltip({ x: 0, y: 0 });
      }

      const pageX = touch.pageX - chartX - barWidth / 2 - yAxisPadding - HALF_PADDING;
      const closestBar = formattedData.reduce((acc, current) => {
        const currentDistance = Math.abs(current.startX - pageX);
        const accDistance = Math.abs(acc.startX - pageX);
        return currentDistance < accDistance ? current : acc;
      });
      const closestBarIndex = formattedData.findIndex((bar) => bar === closestBar);

      setTooltip({
        x: closestBar.startX,
        y: closestBar.startY,
        data: {
          dataKey: closestBar.name,
          name: closestBar.name,
          value: closestBar.value,
          color: color ?? BaseColors.Blue,
          className: tremorTwMerge(
            getColorClassNames(color ?? BaseColors.Blue, colorPalette.text).textColor,
            hasOnValueChange ? "cursor-pointer" : "cursor-default",
          ),
          fill: "",
          payload: closestBar,
        },
        index: closestBarIndex,
      });
    };

    return (
      <div
        ref={ref}
        className={tremorTwMerge("tremor-wrapper relative w-full h-80", className)}
        {...other}
      >
        {data?.length ? (
          <>
            <svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              className={tremorTwMerge("w-full h-full")}
              onMouseMove={(e) => {
                const fakeTouch = {
                  clientX: e.clientX,
                  clientY: e.clientY,
                  pageX: e.pageX,
                  pageY: e.pageY,
                } as React.Touch;
                handleTooltip(fakeTouch);
              }}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                handleTooltip(touch);
              }}
              onMouseLeave={() => setTooltip({ x: 0, y: 0 })}
              onTouchEnd={() => setTooltip({ x: 0, y: 0 })}
            >
              {/* Draw Y axis labels and lines */}
              {Y_AXIS_LABELS.map((label, index) => (
                <React.Fragment key={`y-axis-${index}`}>
                  {showGridLines ? (
                    <line
                      x1={yAxisPadding + HALF_PADDING}
                      y1={(index * realHeight) / 4 + HALF_PADDING}
                      x2={width - HALF_PADDING}
                      y2={(index * realHeight) / 4 + HALF_PADDING}
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
                    y={(index * realHeight) / 4 + 5 + HALF_PADDING}
                    textAnchor="end"
                    fill=""
                    stroke=""
                    className={tremorTwMerge(
                      // base
                      "text-tremor-label",
                      // light
                      "fill-tremor-content",
                      // dark
                      "dark:fill-dark-tremor-content",
                    )}
                  >
                    {label}
                  </text>
                </React.Fragment>
              ))}
              {formattedData.map((item, index) => (
                <g key={`bar-${index}`}>
                  {/* Hover gray rect */}
                  <rect
                    x={item.startX - gap * 0.5 + HALF_PADDING + yAxisPadding}
                    y={HALF_PADDING}
                    width={barWidth + gap}
                    height={realHeight}
                    fill="currentColor"
                    className={tremorTwMerge(
                      "z-0",
                      tooltip.index === index ? "text-[#d1d5db]/15" : "text-transparent",
                    )}
                  />

                  {/* Draw gradient bar to fill space */}
                  {gradient ? (
                    <rect
                      x={item.startX + HALF_PADDING + yAxisPadding}
                      y={
                        realHeight -
                        (isPreviousCalculation
                          ? formattedData[index - 1]?.barHeight || realHeight
                          : realHeight) +
                        HALF_PADDING
                      }
                      width={barWidth}
                      height={
                        (realHeight -
                          item.barHeight -
                          (isPreviousCalculation
                            ? realHeight - formattedData[index - 1]?.barHeight || 0
                            : 0)) /
                        (isVariantCenter ? 2 : 1)
                      }
                      fill={`url(#base-gradient)`}
                      className={tremorTwMerge(
                        !activeBar || activeBar.index === index ? "" : "opacity-30",
                      )}
                    />
                  ) : null}

                  {/* Draw bar */}
                  <rect
                    x={item.startX + HALF_PADDING + yAxisPadding}
                    y={
                      (isVariantCenter ? realHeight / 2 - item.barHeight / 2 : item.startY) +
                      HALF_PADDING
                    }
                    width={barWidth}
                    height={item.barHeight}
                    fill="currentColor"
                    className={tremorTwMerge(
                      getColorClassNames(color ?? BaseColors.Blue, colorPalette.text).textColor,
                      !activeBar || activeBar.index === index ? "" : "opacity-30",
                      hasOnValueChange ? "cursor-pointer" : "cursor-default",
                    )}
                    onClick={(e) => onBarClick(item, index, e)}
                  />

                  {/* Draw bottom gradient bar to fill space */}
                  {gradient && isVariantCenter ? (
                    <rect
                      x={item.startX + HALF_PADDING + yAxisPadding}
                      y={realHeight / 2 + item.barHeight / 2 + HALF_PADDING}
                      width={barWidth}
                      height={(realHeight - item.barHeight) / 2}
                      fill={`url(#base-gradient-revert)`}
                      className={tremorTwMerge(
                        !activeBar || activeBar.index === index ? "" : "opacity-30",
                      )}
                    />
                  ) : null}

                  {/* Draw label */}
                  {showXAxis ? (
                    <foreignObject
                      x={item.startX + HALF_PADDING + yAxisPadding}
                      y={realHeight + HALF_PADDING + 10}
                      width={barWidth}
                      height={rotateLabelX?.xAxisHeight || DEFAULT_X_AXIS_HEIGHT}
                      transform={
                        rotateLabelX
                          ? `rotate(${rotateLabelX?.angle}, ${
                              item.startX + barWidth / 2 + HALF_PADDING + yAxisPadding
                            }, ${
                              realHeight +
                              (rotateLabelX?.xAxisHeight || DEFAULT_X_AXIS_HEIGHT) / 2 +
                              HALF_PADDING +
                              (rotateLabelX?.verticalShift || 0)
                            })`
                          : undefined
                      }
                    >
                      <div
                        className={tremorTwMerge(
                          //common
                          "truncate text-center !text-tremor-label",
                          // light
                          "text-tremor-content",
                          // dark
                          "dark:text-dark-tremor-content",
                        )}
                        title={item.name}
                      >
                        {item.name}
                      </div>
                    </foreignObject>
                  ) : null}
                </g>
              ))}
              {/* Draw gradient polygon between bars */}
              {formattedData.map((item, index) => (
                <React.Fragment key={`gradient-${index}`}>
                  {index < data.length - 1 && evolutionGradient ? (
                    <>
                      {isVariantCenter ? (
                        <>
                          <polygon
                            points={`
                                    ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${
                                      realHeight / 2 + item.nextBarHeight / 4 + HALF_PADDING
                                    }
                                    ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${
                                      realHeight / 2 + item.nextBarHeight / 4 + HALF_PADDING
                                    }
                                    ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${
                                      realHeight / 2 - item.nextBarHeight / 2 + HALF_PADDING
                                    }
                                    ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${
                                      realHeight / 2 - item.barHeight / 2 + HALF_PADDING
                                    }
                                  `}
                            fill={`url(#base-gradient)`}
                            className={tremorTwMerge(
                              "z-10",
                              !activeBar || activeBar.index === index ? "" : "opacity-30",
                            )}
                          />
                          <polygon
                            points={`
                                    ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${
                                      realHeight / 2 + item.barHeight / 2 + HALF_PADDING
                                    }
                                    ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${
                                      realHeight / 2 + item.nextBarHeight / 2 + HALF_PADDING
                                    }
                                    ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${
                                      realHeight / 2 - item.nextBarHeight / 4 + HALF_PADDING
                                    }
                                    ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${
                                      realHeight / 2 - item.nextBarHeight / 4 + HALF_PADDING
                                    }
                                  `}
                            fill={`url(#base-gradient-revert)`}
                            className={tremorTwMerge(
                              "z-10",
                              !activeBar || activeBar.index === index ? "" : "opacity-30",
                            )}
                          />
                        </>
                      ) : (
                        <polygon
                          points={`
                                  ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${
                                    item.startY + HALF_PADDING
                                  } 
                                  ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${
                                    realHeight - item.nextBarHeight + HALF_PADDING
                                  } 
                                  ${item.nextStartX + HALF_PADDING + yAxisPadding}, ${
                                    realHeight + HALF_PADDING
                                  } 
                                  ${item.startX + barWidth + HALF_PADDING + yAxisPadding}, ${
                                    realHeight + HALF_PADDING
                                  }
                                `}
                          fill={`url(#base-gradient)`}
                          className={tremorTwMerge(
                            "z-10",
                            !activeBar || activeBar.index === index ? "" : "opacity-30",
                          )}
                        />
                      )}
                    </>
                  ) : null}
                  {/* Hover transparent rect for tooltip */}
                  {/*<rect
                    x={item.startX - 0.5 * gap + HALF_PADDING + yAxisPadding}
                    y={HALF_PADDING}
                    width={barWidth + gap}
                    height={realHeight}
                    fill="transparent"
                    onMouseEnter={() => handleTooltip(index, item)}
                    onTouchStart={() => handleTooltip(index, item)}
                    onTouchMove={(e) => {
                        const touch = e.touches[0];
                        const distance = barWidth + gap * 2 + yAxisPadding - touch.clientX;
                        const closestBar = formattedData.reduce((acc, current) => {
                            const currentDistance = Math.abs(current.startX + distance);
                            const accDistance = Math.abs(acc.startX + distance);
                            return currentDistance < accDistance ? current : acc;
                        });
                        const closestBarIndex = formattedData.findIndex((bar) => bar === closestBar);

                        handleTooltip(closestBarIndex, closestBar);
                    }}
                    onMouseLeave={() => setTooltip({ x: 0, y: 0 })}
                    onTouchEnd={() => setTooltip({ x: 0, y: 0 })}
                    onClick={(e) => onBarClick(item, index, e)}
                    className={tremorTwMerge(
                      hasOnValueChange ? "cursor-pointer" : "cursor-default",
                    )}
                /> */}
                  {/* Add arrow between labels */}
                  {index < data.length - 1 && showXAxis && showArrow && gap >= 14 ? (
                    <foreignObject
                      x={item.startX + barWidth + HALF_PADDING + yAxisPadding - 6 + gap / 2}
                      y={realHeight + HALF_PADDING + 11}
                      width={12}
                      height={rotateLabelX?.xAxisHeight || DEFAULT_X_AXIS_HEIGHT}
                    >
                      <div
                        className={tremorTwMerge(
                          // light
                          "text-tremor-content",
                          // dark
                          "dark:text-dark-tremor-content",
                        )}
                      >
                        <ArrowRightIcon className="size-3.5 shrink-0" />
                      </div>
                    </foreignObject>
                  ) : null}
                </React.Fragment>
              ))}
              <linearGradient
                id={"base-gradient"}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
                className={tremorTwMerge(
                  getColorClassNames(color ?? BaseColors.Blue, colorPalette.text).textColor,
                )}
              >
                <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
                <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id={"base-gradient-revert"}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
                className={tremorTwMerge(
                  getColorClassNames(color ?? BaseColors.Blue, colorPalette.text).textColor,
                )}
              >
                <stop offset="5%" stopColor="currentColor" stopOpacity={0} />
                <stop offset="95%" stopColor="currentColor" stopOpacity={0.4} />
              </linearGradient>
            </svg>
            {showTooltip ? (
              <div
                ref={tooltipRef}
                className={tremorTwMerge(
                  "absolute top-0 pointer-events-none",
                  tooltip.data ? "visible" : "hidden",
                )}
                tabIndex={-1}
                role="dialog"
                style={{
                  left: tooltip.x + barWidth * 0.66,
                }}
              >
                {CustomTooltip ? (
                  <CustomTooltip
                    payload={tooltip.data ? [tooltip.data] : []}
                    active={!!tooltip.data}
                    label={tooltip.data?.name}
                  />
                ) : (
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
                          name={`${(tooltip.data.payload.normalizedValue * 100).toFixed(2)}%`}
                          color={color ?? BaseColors.Blue}
                        />
                      ) : null}
                    </div>
                  </ChartTooltipFrame>
                )}
              </div>
            ) : null}
          </>
        ) : (
          <NoData noDataText={noDataText} />
        )}
      </div>
    );
  },
);

FunnelChartPrimitive.displayName = "FunnelChart";

//#region Data Validation
// ============================================================================

const validateData = (data: DataT[], calculatedFrom?: CalculateFrom): string | null => {
  if (data && data.length > 0) {
    if (calculatedFrom === "previous" && data[0].value <= 0) {
      return `The value of the first item "${data[0].name}" is not greater than 0. This is not allowed when setting the "calculateFrom" prop to "previous". Please enter a value greater than 0.`;
    }

    for (const item of data) {
      if (item.value < 0) {
        return `Item "${item.name}" has a negative value: ${item.value}. This is not allowed. The value must be greater than or equal to 0.`;
      }
    }
  }
  return null;
};

//#region  Exports
// ============================================================================

const FunnelChart = ({ data, ...props }: FunnelChartProps) => {
  const errorMessage = data ? validateData(data, props.calculateFrom) : null;
  return errorMessage ? (
    <NoData className="h-full w-full p-6" noDataText={`Calculation error: ${errorMessage}`} />
  ) : (
    <FunnelChartPrimitive data={data} {...props} />
  );
};

export default FunnelChart;
