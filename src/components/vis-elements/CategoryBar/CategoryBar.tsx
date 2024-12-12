"use client";
import { bgColors } from "components/spark-elements/common/style";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { Color, sumNumericArray, themeColorRange, tremorTwMerge } from "lib";
import React, { useMemo } from "react";

const getMarkerBgColor = (
  markerValue: number | undefined,
  values: number[],
  colors: Color[],
): string => {
  if (markerValue === undefined) return "";

  let prefixSum = 0;
  for (let i = 0; i < values.length; i++) {
    const currentWidthPercentage = values[i];
    const currentBgColor = bgColors[colors[i] as Color];

    prefixSum += currentWidthPercentage;
    if (prefixSum >= markerValue) return currentBgColor;
  }

  return "";
};

const getPositionLeft = (value: number | undefined, maxValue: number): number =>
  value ? (value / maxValue) * 100 : 0;

const BarLabels = ({ values }: { values: number[] }) => {
  const sumValues = useMemo(() => sumNumericArray(values), [values]);
  let prefixSum = 0;
  let sumConsecutiveHiddenLabels = 0;
  return (
    <div
      className={tremorTwMerge(
        "text-tremor-default text-tremor-content-default relative mb-2 flex h-5 w-full",
      )}
    >
      {values.slice(0, values.length).map((widthPercentage, idx) => {
        prefixSum += widthPercentage;
        const showLabel =
          (widthPercentage >= 0.1 * sumValues || sumConsecutiveHiddenLabels >= 0.09 * sumValues) &&
          sumValues - prefixSum >= 0.15 * sumValues &&
          prefixSum >= 0.1 * sumValues;
        sumConsecutiveHiddenLabels = showLabel
          ? 0
          : (sumConsecutiveHiddenLabels += widthPercentage);

        const widthPositionLeft = getPositionLeft(widthPercentage, sumValues);

        return (
          <div
            key={`item-${idx}`}
            className="flex items-center justify-end"
            style={{ width: `${widthPositionLeft}%` }}
          >
            <span
              className={tremorTwMerge(showLabel ? "block" : "hidden", "left-1/2 translate-x-1/2")}
            >
              {prefixSum}
            </span>
          </div>
        );
      })}
      <div className={tremorTwMerge("absolute bottom-0 left-0 flex items-center")}>0</div>
      <div className={tremorTwMerge("absolute right-0 bottom-0 flex items-center")}>
        {sumValues}
      </div>
    </div>
  );
};

interface CategoryBarProps extends React.HTMLAttributes<HTMLDivElement> {
  values: number[];
  colors?: Color[];
  markerValue?: number;
  showLabels?: boolean;
  tooltip?: string;
  showAnimation?: boolean;
}

const CategoryBar = React.forwardRef<HTMLDivElement, CategoryBarProps>((props, ref) => {
  const {
    values = [],
    colors = themeColorRange,
    markerValue,
    showLabels = true,
    tooltip,
    showAnimation = false,
    className,
    ...other
  } = props;

  const markerBgColor = useMemo(
    () => getMarkerBgColor(markerValue, values, colors),
    [markerValue, values, colors],
  );

  const { tooltipProps, getReferenceProps } = useTooltip();

  const maxValue = useMemo(() => sumNumericArray(values), [values]);

  const markerPositionLeft: number = useMemo(
    () => getPositionLeft(markerValue, maxValue),
    [markerValue, maxValue],
  );

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div ref={ref} className={tremorTwMerge(className)} {...other}>
        {showLabels ? <BarLabels values={values} /> : null}
        <div className={tremorTwMerge("relative flex h-2 w-full items-center")}>
          <div
            className={tremorTwMerge(
              "rounded-tremor-full flex h-full flex-1 items-center overflow-hidden",
            )}
          >
            {values.map((value, idx) => {
              const baseColor = colors[idx] ?? "gray";
              const percentage = (value / maxValue) * 100;
              return (
                <div
                  key={`item-${idx}`}
                  className={tremorTwMerge("h-full", bgColors[baseColor as Color])}
                  style={{ width: `${percentage}%` }}
                />
              );
            })}
          </div>
          {markerValue !== undefined ? (
            <div
              ref={tooltipProps.refs.setReference}
              className={tremorTwMerge("absolute right-1/2 w-5 -translate-x-1/2")}
              style={{
                left: `${markerPositionLeft}%`,
                transition: showAnimation ? "all 1s" : "",
              }}
              {...getReferenceProps}
            >
              <div
                className={tremorTwMerge(
                  "rounded-tremor-full ring-tremor-brand-inverted mx-auto h-4 w-1 ring-2",
                  markerBgColor,
                )}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
});

CategoryBar.displayName = "CategoryBar";

export { CategoryBar, type CategoryBarProps };
