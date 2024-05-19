"use client";
import React, { useMemo } from "react";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import {
  getColorClassNames,
  makeClassName,
  sumNumericArray,
  themeColorRange,
  tremorTwMerge,
} from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib";

const makeCategoryBarClassName = makeClassName("CategoryBar");

const getMarkerBgColor = (
  markerValue: number | undefined,
  values: number[],
  colors: Color[],
): string => {
  if (markerValue === undefined) return "";

  let prefixSum = 0;
  for (let i = 0; i < values.length; i++) {
    const currentWidthPercentage = values[i];
    const currentBgColor = getColorClassNames(colors[i], colorPalette.background).bgColor;

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
        makeCategoryBarClassName("labels"),
        // common
        "relative flex w-full text-tremor-default h-5 mb-2",
        // light
        "text-tremor-content",
        // dark
        "dark:text-dark-tremor-content",
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
      <div className={tremorTwMerge("absolute bottom-0 flex items-center left-0")}>0</div>
      <div className={tremorTwMerge("absolute bottom-0 flex items-center right-0")}>
        {sumValues}
      </div>
    </div>
  );
};

export interface CategoryBarProps extends React.HTMLAttributes<HTMLDivElement> {
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
      <div
        ref={ref}
        className={tremorTwMerge(makeCategoryBarClassName("root"), className)}
        {...other}
      >
        {showLabels ? <BarLabels values={values} /> : null}
        <div
          className={tremorTwMerge(
            makeCategoryBarClassName("barWrapper"),
            "relative w-full flex items-center h-2",
          )}
        >
          <div
            className={tremorTwMerge(
              // common
              "flex-1 flex items-center h-full overflow-hidden rounded-tremor-full",
            )}
          >
            {values.map((value, idx) => {
              const baseColor = colors[idx] ?? "gray";
              const percentage = (value / maxValue) * 100;
              return (
                <div
                  key={`item-${idx}`}
                  className={tremorTwMerge(
                    makeCategoryBarClassName("categoryBar"),
                    "h-full",
                    getColorClassNames(baseColor, colorPalette.background).bgColor,
                  )}
                  style={{ width: `${percentage}%` }}
                />
              );
            })}
          </div>
          {markerValue !== undefined ? (
            <div
              ref={tooltipProps.refs.setReference}
              className={tremorTwMerge(
                makeCategoryBarClassName("markerWrapper"),
                "absolute right-1/2 -translate-x-1/2 w-5",
              )}
              style={{
                left: `${markerPositionLeft}%`,
                transition: showAnimation ? "all 1s" : "",
              }}
              {...getReferenceProps}
            >
              <div
                className={tremorTwMerge(
                  makeCategoryBarClassName("marker"),
                  // common
                  "ring-2 mx-auto rounded-tremor-full h-4 w-1",
                  // light
                  "ring-tremor-brand-inverted",
                  // dark
                  "dark:ring-dark-tremor-brand-inverted",
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

export default CategoryBar;
