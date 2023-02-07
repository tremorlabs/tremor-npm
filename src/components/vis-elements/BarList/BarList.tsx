import React from "react";
import clsx from "clsx";

import {
  BaseColors,
  borderRadius,
  defaultColors,
  defaultValueFormatter,
  fontSize,
  getColor,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";
import { Color, MarginTop, ValueFormatter } from "../../../lib";

type BarListData = {
  key?: string;
  value: number;
  name: string;
  icon?: React.ElementType;
  href?: string;
};

const getWidthsFromValues = (dataValues: number[]) => {
  let maxValue = -Infinity;
  dataValues.forEach((value) => {
    maxValue = Math.max(maxValue, value);
  });

  return dataValues.map((value) => {
    if (value === 0) return 0;
    return Math.max((value / maxValue) * 100, 1);
  });
};

export interface BarListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BarListData[];
  valueFormatter?: ValueFormatter;
  color?: Color;
  showAnimation?: boolean;
  marginTop?: MarginTop;
}

const BarList = React.forwardRef<HTMLDivElement, BarListProps>((props, ref) => {
  const {
    data = [],
    color = BaseColors.Blue,
    valueFormatter = defaultValueFormatter,
    showAnimation = true,
    className,
    ...other
  } = props;

  const widths = getWidthsFromValues(data.map((item) => item.value));

  const rowHeight = sizing.threeXl.height;

  return (
    <div
      ref={ref}
      className={clsx("flex justify-between", spacing.threeXl.spaceX, className)}
      {...other}
    >
      <div className="relative w-full">
        {data.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key ?? item.name}
              className={clsx(
                "flex items-center",
                rowHeight,
                getColorVariantsFromColorThemeValue(getColor(color).lightBackground).bgColor,
                borderRadius.sm.all,
                idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
              )}
              style={{
                width: `${widths[idx]}%`,
                transition: showAnimation ? "all 2s" : "",
              }}
            >
              <div className={clsx("absolute max-w-full flex", spacing.sm.left)}>
                {Icon ? (
                  <Icon
                    className={clsx(
                      "flex-none",
                      sizing.lg.height,
                      sizing.lg.width,
                      spacing.md.marginRight,
                      getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={clsx(
                      "whitespace-nowrap truncate text-blue-500",
                      "no-underline hover:underline visited:text-blue-500",
                      fontSize.sm,
                    )}
                  >
                    {item.name}
                  </a>
                ) : (
                  <p
                    className={clsx(
                      "whitespace-nowrap truncate",
                      getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                      fontSize.sm,
                    )}
                  >
                    {item.name}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-right min-w-min">
        {data.map((item, idx) => (
          <div
            key={item.key ?? item.name}
            className={clsx(
              "flex justify-end items-center",
              rowHeight,
              idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
            )}
          >
            <p
              className={clsx(
                "whitespace-nowrap truncate",
                getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                fontSize.sm,
              )}
            >
              {valueFormatter(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default BarList;
