"use client";

import {
  Color,
  defaultValueFormatter,
  getColorClassNames,
  makeClassName,
  tremorTwMerge,
  ValueFormatter,
} from "lib";
import { colorPalette } from "lib/theme";
import React from "react";

const makeBarListClassName = makeClassName("BarList");

type Bar<T> = T & {
  key?: string;
  value: number;
  name: React.ReactNode;
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
  sortOrder?: "ascending" | "descending" | "none";
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
    if (sortOrder === "none") {
      return data;
    }
    return [...data].sort((a, b) => {
      return sortOrder === "ascending" ? a.value - b.value : b.value - a.value;
    });
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
              key={item.key ?? index}
              onClick={() => {
                onValueChange?.(item);
              }}
              className={tremorTwMerge(
                makeBarListClassName("bar"),
                // common
                "group rounded-tremor-small flex w-full items-center",
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
                  "bg-opacity-40 flex items-center rounded-sm transition-all",
                  rowHeight,
                  item.color || color
                    ? [
                        getColorClassNames(item.color ?? (color as Color), colorPalette.background)
                          .bgColor,
                        onValueChange ? "group-hover:bg-opacity-30" : "",
                      ]
                    : "bg-tremor-brand-subtle dark:bg-dark-tremor-brand-subtle/60",
                  onValueChange && !(item.color || color)
                    ? "group-hover:bg-tremor-brand-subtle/30 dark:group-hover:bg-dark-tremor-brand-subtle/70"
                    : "",
                  // margin
                  index === sortedData.length - 1 ? "mb-0" : "",
                  // duration
                  showAnimation ? "duration-500" : "",
                )}
                style={{ width: `${widths[index]}%`, transition: showAnimation ? "all 1s" : "" }}
              >
                <div className={tremorTwMerge("absolute left-2 flex max-w-full pr-4")}>
                  {Icon ? (
                    <Icon
                      className={tremorTwMerge(
                        makeBarListClassName("barIcon"),
                        // common
                        "mr-2 h-5 w-5 shrink-0",
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
                        "text-tremor-default truncate whitespace-nowrap hover:underline",
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
                        "text-tremor-default truncate whitespace-nowrap",
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
            key={item.key ?? index}
            className={tremorTwMerge(
              makeBarListClassName("labelWrapper"),
              "flex items-center justify-end",
              rowHeight,
              index === sortedData.length - 1 ? "mb-0" : "mb-1.5",
            )}
          >
            <p
              className={tremorTwMerge(
                makeBarListClassName("labelText"),
                // common
                "text-tremor-default truncate leading-none whitespace-nowrap",
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
