import React from "react";
import { tremorTwMerge } from "lib";

import { defaultValueFormatter, getColorClassNames, makeClassName, sizing, spacing } from "lib";
import { Color, ValueFormatter } from "../../../lib";
import { colorPalette } from "lib/theme";

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
    color,
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
      className={tremorTwMerge(
        makeBarListClassName("root"),
        "flex justify-between",
        spacing.threeXl.spaceX,
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
                "flex items-center rounded-tremor-sm bg-tremor-brand-muted",
                rowHeight,
                color && getColorClassNames(color, colorPalette.lightBackground).bgColor,
                idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
              )}
              style={{
                width: `${widths[idx]}%`,
                transition: showAnimation ? "all 1s" : "",
              }}
            >
              <div className={tremorTwMerge("absolute max-w-full flex", spacing.sm.left)}>
                {Icon ? (
                  <Icon
                    className={tremorTwMerge(
                      makeBarListClassName("barIcon"),
                      "flex-none text-tremor-content",
                      sizing.lg.height,
                      sizing.lg.width,
                      spacing.md.marginRight,
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
                      "whitespace-nowrap truncate text-blue-500",
                      "no-underline hover:underline visited:text-blue-500 text-tremor-sm",
                    )}
                  >
                    {item.name}
                  </a>
                ) : (
                  <p
                    className={tremorTwMerge(
                      makeBarListClassName("barText"),
                      "whitespace-nowrap truncate text-tremor-sm text-tremor-content-emphasis",
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
              idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
            )}
          >
            <p
              className={tremorTwMerge(
                makeBarListClassName("labelText"),
                "whitespace-nowrap truncate text-tremor-sm text-tremor-content-emphasis",
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
