import React, { cloneElement, isValidElement } from "react";
import {
  Color,
  defaultValueFormatter,
  getColorClassNames,
  makeClassName,
  tremorTwMerge,
  ValueFormatter,
} from "lib";
import { colorPalette } from "lib/theme";

const makeBarListClassName = makeClassName("BarList");

type Bar = {
  key?: string;
  value: number;
  name: string;
  icon?: React.JSXElementConstructor<any> | React.ReactElement;
  href?: string;
  target?: string;
  color?: Color;
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
    color,
    valueFormatter = defaultValueFormatter,
    showAnimation = false,
    className,
    ...other
  } = props;

  const widths = getWidthsFromValues(data.map((item) => item.value));

  const rowHeight = "h-9";

  return (
    <div
      ref={ref}
      className={tremorTwMerge(
        makeBarListClassName("root"),
        "flex justify-between space-x-6",
        className,
      )}
      {...other}
    >
      <div className={tremorTwMerge(makeBarListClassName("bars"), "relative w-full")}>
        {data.map((item, idx) => {
          let Icon;
          if (item.icon) {
            if (isValidElement(item.icon)) {
              Icon = cloneElement(item.icon as React.ReactElement, {
                className: tremorTwMerge(
                  makeBarListClassName("barIcon"),
                  // common
                  "flex-none h-5 w-5 mr-2",
                  // light
                  "text-tremor-content",
                  // dark
                  "dark:text-dark-tremor-content",
                ),
              });
            } else {
              const IconElm = item.icon as React.ElementType;
              Icon = (
                <IconElm
                  className={tremorTwMerge(
                    makeBarListClassName("barIcon"),
                    // common
                    "flex-none h-5 w-5 mr-2",
                    // light
                    "text-tremor-content",
                    // dark
                    "dark:text-dark-tremor-content",
                  )}
                />
              );
            }
          }

          return (
            <div
              key={item.key ?? item.name}
              className={tremorTwMerge(
                makeBarListClassName("bar"),
                // common
                "flex items-center rounded-tremor-small bg-opacity-30",
                rowHeight,
                item.color || color
                  ? getColorClassNames(item.color ?? (color as Color), colorPalette.background)
                      .bgColor
                  : "bg-tremor-brand-subtle dark:bg-dark-tremor-brand-subtle dark:bg-opacity-30",
                idx === data.length - 1 ? "mb-0" : "mb-2",
              )}
              style={{
                width: `${widths[idx]}%`,
                transition: showAnimation ? "all 1s" : "",
              }}
            >
              <div className={tremorTwMerge("absolute max-w-full flex left-2")}>
                {Icon}
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.target ?? "_blank"}
                    rel="noreferrer"
                    className={tremorTwMerge(
                      makeBarListClassName("barLink"),
                      // common
                      "whitespace-nowrap hover:underline truncate text-tremor-default",
                      // light
                      "text-tremor-content-emphasis",
                      // dark
                      "dark:text-dark-tremor-content-emphasis",
                    )}
                  >
                    {item.name}
                  </a>
                ) : (
                  <p
                    className={tremorTwMerge(
                      makeBarListClassName("barText"),
                      // common
                      "whitespace-nowrap truncate text-tremor-default",
                      // light
                      "text-tremor-content-emphasis",
                      // dark
                      "dark:text-dark-tremor-content-emphasis",
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
            className={tremorTwMerge(
              makeBarListClassName("labelWrapper"),
              "flex justify-end items-center",
              rowHeight,
              idx === data.length - 1 ? "mb-0" : "mb-2",
            )}
          >
            <p
              className={tremorTwMerge(
                makeBarListClassName("labelText"),
                // common
                "whitespace-nowrap truncate text-tremor-default",
                // light
                "text-tremor-content-emphasis",
                // dark
                "dark:text-dark-tremor-content-emphasis",
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
