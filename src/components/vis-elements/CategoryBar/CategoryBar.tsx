"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Color } from "../../../lib";
import {
  colorClassNames,
  makeClassName,
  borderRadius,
  fontSize,
  getColorClassNames,
  sizing,
  spacing,
  sumNumericArray,
  themeColorRange,
} from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

const makeCategoryBarClassName = makeClassName("CategoryBar");

const getMarkerBgColor = (
  percentageValue: number | undefined,
  categoryPercentageValues: number[],
  colors: Color[],
): string => {
  if (percentageValue === undefined) return "";

  let prefixSum = 0;
  for (let i = 0; i < categoryPercentageValues.length; i++) {
    const currentWidthPercentage = categoryPercentageValues[i];
    const currentBgColor = colorClassNames[colors[i]][colorPalette.background].bgColor;

    prefixSum += currentWidthPercentage;
    if (prefixSum >= percentageValue) return currentBgColor;
  }

  return "";
};

const BarLabels = ({ categoryPercentageValues }: { categoryPercentageValues: number[] }) => {
  const sumValues = sumNumericArray(categoryPercentageValues);
  let prefixSum = 0;
  let sumConsecutveHiddenLabels = 0;
  return (
    <div
      className={twMerge(
        makeCategoryBarClassName("labels"),
        "relative flex w-full",
        getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
        spacing.sm.marginBottom,
        sizing.lg.height,
        fontSize.sm,
      )}
    >
      {categoryPercentageValues
        .slice(0, categoryPercentageValues.length)
        .map((widthPercentage, idx) => {
          prefixSum += widthPercentage;
          const showLabel =
            (widthPercentage >= 0.1 * sumValues || sumConsecutveHiddenLabels >= 0.09 * sumValues) &&
            sumValues - prefixSum >= 0.15 * sumValues &&
            prefixSum >= 0.1 * sumValues;
          sumConsecutveHiddenLabels = showLabel
            ? 0
            : (sumConsecutveHiddenLabels += widthPercentage);

          return (
            <div
              key={`item-${idx}`}
              className="flex items-center justify-end"
              style={{ width: `${widthPercentage}%` }}
            >
              <span className={twMerge(showLabel ? "block" : "hidden", "left-1/2 translate-x-1/2")}>
                {prefixSum}
              </span>
            </div>
          );
        })}
      <div className={twMerge("absolute bottom-0 flex items-center", spacing.none.left)}>0</div>
      <div className={twMerge("absolute bottom-0 flex items-center", spacing.none.right)}>
        {sumValues}
      </div>
    </div>
  );
};

export interface CategoryBarProps extends React.HTMLAttributes<HTMLDivElement> {
  categoryPercentageValues: number[];
  colors?: Color[];
  percentageValue?: number;
  showLabels?: boolean;
  tooltip?: string;
  showAnimation?: boolean;
}

const CategoryBar = React.forwardRef<HTMLDivElement, CategoryBarProps>((props, ref) => {
  const {
    categoryPercentageValues = [],
    colors = themeColorRange,
    percentageValue,
    showLabels = true,
    tooltip,
    showAnimation = true,
    className,
    ...other
  } = props;

  const markerBgColor = getMarkerBgColor(percentageValue, categoryPercentageValues, colors);

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div ref={ref} className={twMerge(makeCategoryBarClassName("root"), className)} {...other}>
        {showLabels ? <BarLabels categoryPercentageValues={categoryPercentageValues} /> : null}
        <div
          className={twMerge(
            makeCategoryBarClassName("barWrapper"),
            "relative w-full flex items-center",
            sizing.xs.height,
          )}
        >
          <div
            className={twMerge(
              "flex-1 flex items-center h-full overflow-hidden",
              borderRadius.md.all,
            )}
          >
            {categoryPercentageValues.map((percentageValue, idx) => {
              return (
                <div
                  key={`item-${idx}`}
                  className={twMerge(
                    makeCategoryBarClassName("categoryBar"),
                    "h-full",
                    colorClassNames[colors[idx]][colorPalette.background].bgColor,
                  )}
                  style={{ width: `${percentageValue}%` }}
                />
              );
            })}
          </div>
          {percentageValue !== undefined ? (
            <div
              ref={tooltipProps.refs.setReference}
              className={twMerge(
                makeCategoryBarClassName("markerWrapper"),
                "absolute right-1/2 -translate-x-1/2",
                sizing.lg.width,
              )}
              style={{
                left: `${percentageValue}%`,
                transition: showAnimation ? "all 2s" : "",
              }}
              {...getReferenceProps}
            >
              <div
                className={twMerge(
                  makeCategoryBarClassName("marker"),
                  "ring-2 mx-auto",
                  markerBgColor,
                  getColorClassNames("white").ringColor,
                  sizing.md.height,
                  sizing.twoXs.width,
                  borderRadius.lg.all,
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
