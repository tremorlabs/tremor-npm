import React from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  borderRadius,
  defaultValueFormatter,
  fontSize,
  getColorClassNames,
  makeClassName,
  sizing,
  spacing,
} from "lib";
import { Color, ValueFormatter } from "../../../lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeBarListClassName = makeClassName("BarList");

type Bar = {
  key?: string;
  value: number;
  name: string;
  icon?: React.JSXElementConstructor<any>;
  href?: string;
  target?: string;
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
  data: Bar[];
  valueFormatter?: ValueFormatter;
  color?: Color;
  showAnimation?: boolean;
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
      className={twMerge(
        makeBarListClassName("root"),
        "flex justify-between",
        spacing.threeXl.spaceX,
        className,
      )}
      {...other}
    >
      <div className={twMerge(makeBarListClassName("bars"), "relative w-full")}>
        {data.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key ?? item.name}
              className={twMerge(
                makeBarListClassName("bar"),
                "flex items-center",
                rowHeight,
                getColorClassNames(color, colorPalette.lightBackground).bgColor,
                borderRadius.sm.all,
                idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
              )}
              style={{
                width: `${widths[idx]}%`,
                transition: showAnimation ? "all 2s" : "",
              }}
            >
              <div className={twMerge("absolute max-w-full flex", spacing.sm.left)}>
                {Icon ? (
                  <Icon
                    className={twMerge(
                      makeBarListClassName("barIcon"),
                      "flex-none",
                      sizing.lg.height,
                      sizing.lg.width,
                      spacing.md.marginRight,
                      getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.target ?? "_blank"}
                    rel="noreferrer"
                    className={twMerge(
                      makeBarListClassName("barLink"),
                      "whitespace-nowrap truncate text-blue-500",
                      "no-underline hover:underline visited:text-blue-500",
                      fontSize.sm,
                    )}
                  >
                    {item.name}
                  </a>
                ) : (
                  <p
                    className={twMerge(
                      makeBarListClassName("barText"),
                      "whitespace-nowrap truncate",
                      getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
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
      <div className={(makeBarListClassName("labels"), "text-right min-w-min")}>
        {data.map((item, idx) => (
          <div
            key={item.key ?? item.name}
            className={twMerge(
              makeBarListClassName("labelWrapper"),
              "flex justify-end items-center",
              rowHeight,
              idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
            )}
          >
            <p
              className={twMerge(
                makeBarListClassName("labelText"),
                "whitespace-nowrap truncate",
                getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
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

BarList.displayName = "BarList";

export default BarList;
