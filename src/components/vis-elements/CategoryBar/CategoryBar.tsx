import React from "react";

import "tippy.js/dist/tippy.css";
import Tooltip from "@tippyjs/react";

import { Color, MarginTop } from "../../../lib";
import {
  borderRadius,
  classNames,
  defaultColors,
  fontSize,
  getColorTheme,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
  sizing,
  spacing,
  sumNumericArray,
  themeColorRange,
} from "lib";

const getMarkerBgColor = (
  percentageValue: number | undefined,
  categoryPercentageValues: number[],
  colors: Color[]
): string => {
  if (percentageValue === undefined) return "";

  let prefixSum = 0;
  for (let i = 0; i < categoryPercentageValues.length; i++) {
    const currentWidthPercentage = categoryPercentageValues[i];
    const currentBgColor = getColorVariantsFromColorThemeValue(
      getColorTheme(colors[i]).background
    ).bgColor;

    prefixSum += currentWidthPercentage;
    if (prefixSum >= percentageValue) return currentBgColor;
  }

  return "";
};

const BarLabels = ({
  categoryPercentageValues,
}: {
  categoryPercentageValues: number[];
}) => {
  const sumValues = sumNumericArray(categoryPercentageValues);
  let prefixSum = 0;
  let sumConsecutveHiddenLabels = 0;
  return (
    <div
      className={classNames(
        "tremor-base tr-relative tr-flex tr-w-full",
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        spacing.sm.marginBottom,
        sizing.lg.height,
        fontSize.sm
      )}
    >
      {categoryPercentageValues
        .slice(0, categoryPercentageValues.length)
        .map((widthPercentage, idx) => {
          prefixSum += widthPercentage;
          const showLabel =
            (widthPercentage >= 0.1 * sumValues ||
              sumConsecutveHiddenLabels >= 0.09 * sumValues) &&
            sumValues - prefixSum >= 0.15 * sumValues &&
            prefixSum >= 0.1 * sumValues;
          sumConsecutveHiddenLabels = showLabel
            ? 0
            : (sumConsecutveHiddenLabels += widthPercentage);

          return (
            <div
              key={`item-${idx}`}
              className="tr-flex tr-items-center tr-justify-end"
              style={{ width: `${widthPercentage}%` }}
            >
              <span
                className={classNames(
                  showLabel ? "tr-block" : "tr-hidden",
                  "tr-left-1/2 tr-translate-x-1/2"
                )}
              >
                {prefixSum}
              </span>
            </div>
          );
        })}
      <div
        className={classNames(
          "tr-absolute tr-bottom-0 tr-flex tr-items-center",
          spacing.none.left
        )}
      >
        0
      </div>
      <div
        className={classNames(
          "tr-absolute tr-bottom-0 tr-flex tr-items-center",
          spacing.none.right
        )}
      >
        {sumValues}
      </div>
    </div>
  );
};

export interface CategoryBarProps {
  categoryPercentageValues: number[];
  colors?: Color[];
  percentageValue?: number;
  showLabels?: boolean;
  tooltip?: string;
  showAnimation?: boolean;
  marginTop?: MarginTop;
}

const CategoryBar = ({
  categoryPercentageValues = [],
  colors = themeColorRange,
  percentageValue,
  showLabels = true,
  tooltip,
  showAnimation = true,
  marginTop = "mt-0",
}: CategoryBarProps) => {
  const markerBgColor = getMarkerBgColor(
    percentageValue,
    categoryPercentageValues,
    colors
  );

  return (
    <div className={classNames(parseMarginTop(marginTop))}>
      {showLabels ? (
        <BarLabels categoryPercentageValues={categoryPercentageValues} />
      ) : null}
      <div
        className={classNames(
          "tr-relative tr-w-full tr-flex tr-items-center",
          sizing.xs.height
        )}
      >
        <div
          className={classNames(
            "tr-flex-1 tr-flex tr-items-center tr-h-full tr-overflow-hidden",
            borderRadius.md.all
          )}
        >
          {categoryPercentageValues.map((percentageValue, idx) => {
            return (
              <div
                key={`item-${idx}`}
                className={classNames(
                  "tr-h-full",
                  getColorVariantsFromColorThemeValue(
                    getColorTheme(colors[idx]).background
                  ).bgColor
                )}
                style={{ width: `${percentageValue}%` }}
              />
            );
          })}
        </div>
        {percentageValue !== undefined ? (
          <Tooltip content={tooltip} className={tooltip ? "" : "tr-hidden"}>
            <div
              className={classNames(
                "tr-absolute tr-right-1/2 -tr-translate-x-1/2",
                sizing.lg.width // wide transparent wrapper for tooltip activation
              )}
              style={{
                left: `${percentageValue}%`,
                transition: showAnimation ? "all 2s" : "",
              }}
            >
              <div
                className={classNames(
                  "tr-ring-2 tr-mx-auto",
                  markerBgColor,
                  getColorVariantsFromColorThemeValue(defaultColors.white)
                    .ringColor,
                  sizing.md.height,
                  sizing.twoXs.width,
                  borderRadius.lg.all
                )}
              />
            </div>
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryBar;
