import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { Color, tremorTwMerge } from "lib";
import React from "react";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
  tooltip?: string;
  showAnimation?: boolean;
  color?: Color;
}

const trackColors: { [color in Color]: string } = {
  brand: "bg-tremor-brand-muted",
  slate: "bg-slate-200 dark:bg-slate-500/20",
  gray: "bg-gray-200 dark:bg-gray-500/20",
  zinc: "bg-zinc-200 dark:bg-zinc-500/20",
  neutral: "bg-neutral-200 dark:bg-neutral-500/20",
  stone: "bg-stone-200 dark:bg-stone-500/20",
  red: "bg-red-200 dark:bg-red-500/20",
  orange: "bg-orange-200 dark:bg-orange-500/20",
  amber: "bg-amber-200 dark:bg-amber-500/20",
  yellow: "bg-yellow-200 dark:bg-yellow-500/20",
  lime: "bg-lime-200 dark:bg-lime-500/20",
  green: "bg-green-200 dark:bg-green-500/20",
  emerald: "bg-emerald-200 dark:bg-emerald-500/20",
  teal: "bg-teal-200 dark:bg-teal-500/20",
  cyan: "bg-cyan-200 dark:bg-cyan-500/20",
  sky: "bg-sky-200 dark:bg-sky-500/20",
  blue: "bg-blue-200 dark:bg-blue-500/20",
  indigo: "bg-indigo-200 dark:bg-indigo-500/20",
  violet: "bg-violet-200 dark:bg-violet-500/20",
  purple: "bg-purple-200 dark:bg-purple-500/20",
  fuchsia: "bg-fuchsia-200 dark:bg-fuchsia-500/20",
  pink: "bg-pink-200 dark:bg-pink-500/20",
  rose: "bg-rose-200 dark:bg-rose-500/20",
};

const progressColors: { [color in Color]: string } = {
  brand: "bg-tremor-brand-default",
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  zinc: "bg-zinc-500",
  neutral: "bg-neutral-500",
  stone: "bg-stone-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  lime: "bg-lime-500",
  green: "bg-green-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  cyan: "bg-cyan-500",
  sky: "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  purple: "bg-purple-500",
  fuchsia: "bg-fuchsia-500",
  pink: "bg-pink-500",
  rose: "bg-rose-500",
};

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, label, color = "brand", tooltip, showAnimation = false, className, ...other }, ref) => {
    const { tooltipProps, getReferenceProps } = useTooltip();

    return (
      <>
        <Tooltip text={tooltip} {...tooltipProps} />
        <div ref={ref} className={tremorTwMerge("flex w-full items-center", className)} {...other}>
          <div
            ref={tooltipProps.refs.setReference}
            className={tremorTwMerge(
              "rounded-tremor-full relative flex h-2 w-full items-center",
              trackColors[color as Color],
            )}
            {...getReferenceProps}
          >
            <div
              className={tremorTwMerge(
                "rounded-tremor-full h-full flex-col",
                showAnimation ? "transition-all duration-300 ease-in-out" : "",
                progressColors[color as Color],
              )}
              style={{
                width: `${value}%`,
              }}
            />
          </div>
          {label ? (
            <div
              className={tremorTwMerge(
                "text-tremor-content-emphasis ml-2 w-16 truncate text-right",
              )}
            >
              <p
                className={tremorTwMerge("text-tremor-default shrink-0 truncate whitespace-nowrap")}
              >
                {label}
              </p>
            </div>
          ) : null}
        </div>
      </>
    );
  },
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar, type ProgressBarProps };
