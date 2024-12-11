"use client";

import { Color, defaultValueFormatter, tremorTwMerge, ValueFormatter } from "lib";

import React from "react";

const barListColors: { [color in Color]: string } = {
  brand: "bg-tremor-brand-muted",
  slate: "bg-slate-200 dark:bg-slate-800",
  gray: "bg-gray-200 dark:bg-gray-800",
  zinc: "bg-zinc-200 dark:bg-zinc-800",
  neutral: "bg-neutral-200 dark:bg-neutral-800",
  stone: "bg-stone-200 dark:bg-stone-800",
  red: "bg-red-200 dark:bg-red-800",
  orange: "bg-orange-200 dark:bg-orange-800",
  amber: "bg-amber-200 dark:bg-amber-800",
  yellow: "bg-yellow-200 dark:bg-yellow-800",
  lime: "bg-lime-200 dark:bg-lime-800",
  green: "bg-green-200 dark:bg-green-800",
  emerald: "bg-emerald-200 dark:bg-emerald-800",
  teal: "bg-teal-200 dark:bg-teal-800",
  cyan: "bg-cyan-200 dark:bg-cyan-800",
  sky: "bg-sky-200 dark:bg-sky-800",
  blue: "bg-blue-200 dark:bg-blue-800",
  indigo: "bg-indigo-200 dark:bg-indigo-800",
  violet: "bg-violet-200 dark:bg-violet-800",
  purple: "bg-purple-200 dark:bg-purple-800",
  fuchsia: "bg-fuchsia-200 dark:bg-fuchsia-800",
  pink: "bg-pink-200 dark:bg-pink-800",
  rose: "bg-rose-200 dark:bg-rose-800",
};

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
    color = "brand",
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
      className={tremorTwMerge("flex justify-between space-x-6", className)}
      aria-sort={sortOrder}
      {...other}
    >
      <div className={tremorTwMerge("relative w-full space-y-1.5")}>
        {sortedData.map((item, index) => {
          const Icon = item.icon;

          return (
            <Component
              key={item.key ?? index}
              onClick={() => {
                onValueChange?.(item);
              }}
              className={tremorTwMerge(
                "group rounded-tremor-small flex w-full items-center",
                onValueChange ? "hover:bg-tremor-background-muted cursor-pointer" : "",
              )}
            >
              <div
                className={tremorTwMerge(
                  "flex items-center rounded-sm transition-all",
                  rowHeight,
                  barListColors[item.color ?? (color as Color)],
                  onValueChange && !(item.color || color)
                    ? "group-hover:bg-tremor-brand-subtle"
                    : "",
                  index === sortedData.length - 1 ? "mb-0" : "",
                  showAnimation ? "duration-500" : "",
                )}
                style={{ width: `${widths[index]}%`, transition: showAnimation ? "all 1s" : "" }}
              >
                <div className={tremorTwMerge("absolute left-2 flex max-w-full pr-4")}>
                  {Icon ? (
                    <Icon
                      className={tremorTwMerge("text-tremor-content-default mr-2 h-5 w-5 shrink-0")}
                    />
                  ) : null}
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.target ?? "_blank"}
                      rel="noreferrer"
                      className={tremorTwMerge(
                        "text-tremor-default text-tremor-content-emphasis truncate whitespace-nowrap hover:underline",
                        onValueChange ? "cursor-pointer" : "",
                      )}
                      onClick={(event) => event.stopPropagation()}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <p
                      className={tremorTwMerge(
                        "text-tremor-default text-tremor-content-emphasis truncate whitespace-nowrap",
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
      <div>
        {sortedData.map((item, index) => (
          <div
            key={item.key ?? index}
            className={tremorTwMerge(
              "flex items-center justify-end",
              rowHeight,
              index === sortedData.length - 1 ? "mb-0" : "mb-1.5",
            )}
          >
            <p
              className={tremorTwMerge(
                "text-tremor-default text-tremor-content-emphasis truncate leading-none whitespace-nowrap",
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
