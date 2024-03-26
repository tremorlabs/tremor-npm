import React from "react";
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

type Bar<T> = T & {
  key?: string;
  value: number;
  name: string;
  icon?: React.JSXElementConstructor<any>;
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

export interface BarListProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  data: Bar<T>[];
  valueFormatter?: ValueFormatter;
  color?: Color;
  showAnimation?: boolean;
  onValueChange?: (payload: Bar<T>) => void;
}

function BarListInner<T>(props: BarListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
  const {
    data = [],
    color,
    valueFormatter = defaultValueFormatter,
    showAnimation = false,
    onValueChange,
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
          const Icon = item.icon;

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
              <div
                className={tremorTwMerge(
                  "absolute max-w-full flex left-2",
                  onValueChange ? "cursor-pointer" : "",
                )}
                onClick={() => {
                  onValueChange?.(item);
                }}
              >
                {Icon ? (
                  <Icon
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
                ) : null}
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.target ?? "_blank"}
                    rel="noreferrer"
                    className={tremorTwMerge(
                      makeBarListClassName("barLink"),
                      // common
                      "whitespace-nowrap hover:underline truncate text-tremor-default",
                      onValueChange ? "cursor-pointer" : "",
                      // light
                      "text-tremor-content-emphasis",
                      // dark
                      "dark:text-dark-tremor-content-emphasis",
                    )}
                    onClick={() => {
                      onValueChange?.(item);
                    }}
                  >
                    {item.name}
                  </a>
                ) : (
                  <p
                    className={tremorTwMerge(
                      makeBarListClassName("barText"),
                      // common
                      "whitespace-nowrap truncate text-tremor-default",
                      onValueChange ? "cursor-pointer" : "",
                      // light
                      "text-tremor-content-emphasis",
                      // dark
                      "dark:text-dark-tremor-content-emphasis",
                    )}
                    onClick={() => {
                      onValueChange?.(item);
                    }}
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
}

BarListInner.displayName = "BarList";

const BarList = React.forwardRef(BarListInner) as <T>(
  p: BarListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof BarListInner>;

export default BarList;
