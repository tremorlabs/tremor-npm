"use client";

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

export interface BarListProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  data: Bar<T>[];
  valueFormatter?: ValueFormatter;
  color?: Color;
  showAnimation?: boolean;
  onValueChange?: (payload: Bar<T>) => void;
  sortOrder?: "ascending" | "descending";
}

function BarListInner<T>(props: BarListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
  const {
    data = [],
    color,
    valueFormatter = defaultValueFormatter,
    showAnimation = false,
    onValueChange,
    sortOrder = "descending",
    className,
    ...other
  } = props;

  const Component = onValueChange ? "button" : "div";
  const sortedData = React.useMemo(() => {
    if (sortOrder) {
      return [...data].sort((a, b) => {
        return sortOrder === "ascending" ? a.value - b.value : b.value - a.value;
      });
    }
    return data;
  }, [data, sortOrder]);

  const widths = React.useMemo(() => {
    const maxValue = Math.max(...sortedData.map((item) => item.value), 0);
    return sortedData.map((item) =>
      item.value === 0 ? 0 : Math.max((item.value / maxValue) * 100, 2),
    );
  }, [sortedData]);

  const rowHeight = "h-8";

  return (
    <div
      ref={ref}
      className={tremorTwMerge(
        makeBarListClassName("root"),
        "flex justify-between space-x-6",
        className,
      )}
      aria-sort={sortOrder}
      {...other}
    >
      <div className={tremorTwMerge(makeBarListClassName("bars"), "relative w-full space-y-1.5")}>
        {sortedData.map((item, index) => {
          const Icon = item.icon;

          return (
            <Component
              key={item.key ?? item.name}
              onClick={() => {
                onValueChange?.(item);
              }}
              className={tremorTwMerge(
                makeBarListClassName("bar"),
                // common
                "group w-full flex items-center rounded-tremor-small",
                onValueChange
                  ? [
                      "cursor-pointer",
                      // hover
                      "hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-subtle/40",
                    ]
                  : "",
              )}
            >
              <div
                className={tremorTwMerge(
                  "flex items-center rounded transition-all bg-opacity-40",
                  rowHeight,
                  item.color || color
                    ? [
                        getColorClassNames(item.color ?? (color as Color), colorPalette.background)
                          .bgColor,
                        onValueChange ? "group-hover:bg-opacity-30" : "",
                      ]
                    : "bg-tremor-brand-subtle dark:bg-dark-tremor-brand-subtle/60",
                  onValueChange && !(item.color || color)
                    ? "group-hover:bg-tremor-brand-subtle/30 group-hover:dark:bg-dark-tremor-brand-subtle/70"
                    : "",
                  // margin and duration
                  index === sortedData.length - 1 ? "mb-0" : "",
                  showAnimation ? "duration-500" : "",
                )}
                style={{ width: `${widths[index]}%`, transition: showAnimation ? "all 1s" : "" }}
              >
                <div className={tremorTwMerge("absolute left-2 pr-4 flex max-w-full")}>
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
                      onClick={(event) => event.stopPropagation()}
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
            </Component>
          );
        })}
      </div>
      <div className={makeBarListClassName("labels")}>
        {sortedData.map((item, index) => (
          <div
            key={item.key ?? item.name}
            className={tremorTwMerge(
              makeBarListClassName("labelWrapper"),
              "flex justify-end items-center",
              rowHeight,
              index === sortedData.length - 1 ? "mb-0" : "mb-1.5",
            )}
          >
            <p
              className={tremorTwMerge(
                makeBarListClassName("labelText"),
                // common
                "whitespace-nowrap leading-none truncate text-tremor-default",
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
