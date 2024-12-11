import { Color, tremorTwMerge } from "lib";
import React from "react";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  size?: Size;
  color?: Color;
  showAnimation?: boolean;
  tooltip?: string;
  radius?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

const sizeConfig: Record<Size, { strokeWidth: number; radius: number }> = {
  xs: {
    radius: 15,
    strokeWidth: 3,
  },
  sm: {
    radius: 19,
    strokeWidth: 4,
  },
  md: {
    radius: 32,
    strokeWidth: 6,
  },
  lg: {
    radius: 52,
    strokeWidth: 8,
  },
  xl: {
    radius: 80,
    strokeWidth: 10,
  },
};

const trackColors: { [color in Color]: string } = {
  brand: "stroke-tremor-brand-muted",
  slate: "stroke-slate-200 dark:stroke-slate-500/20",
  gray: "stroke-gray-200 dark:stroke-gray-500/20",
  zinc: "stroke-zinc-200 dark:stroke-zinc-500/20",
  neutral: "stroke-neutral-200 dark:stroke-neutral-500/20",
  stone: "stroke-stone-200 dark:stroke-stone-500/20",
  red: "stroke-red-200 dark:stroke-red-500/20",
  orange: "stroke-orange-200 dark:stroke-orange-500/20",
  amber: "stroke-amber-200 dark:stroke-amber-500/20",
  yellow: "stroke-yellow-200 dark:stroke-yellow-500/20",
  lime: "stroke-lime-200 dark:stroke-lime-500/20",
  green: "stroke-green-200 dark:stroke-green-500/20",
  emerald: "stroke-emerald-200 dark:stroke-emerald-500/20",
  teal: "stroke-teal-200 dark:stroke-teal-500/20",
  cyan: "stroke-cyan-200 dark:stroke-cyan-500/20",
  sky: "stroke-sky-200 dark:stroke-sky-500/20",
  blue: "stroke-blue-200 dark:stroke-blue-500/20",
  indigo: "stroke-indigo-200 dark:stroke-indigo-500/20",
  violet: "stroke-violet-200 dark:stroke-violet-500/20",
  purple: "stroke-purple-200 dark:stroke-purple-500/20",
  fuchsia: "stroke-fuchsia-200 dark:stroke-fuchsia-500/20",
  pink: "stroke-pink-200 dark:stroke-pink-500/20",
  rose: "stroke-rose-200 dark:stroke-rose-500/20",
};

const strokeColors: { [color in Color]: string } = {
  brand: "stroke-tremor-brand-default",
  slate: "stroke-slate-500",
  gray: "stroke-gray-500",
  zinc: "stroke-zinc-500",
  neutral: "stroke-neutral-500",
  stone: "stroke-stone-500",
  red: "stroke-red-500",
  orange: "stroke-orange-500",
  amber: "stroke-amber-500",
  yellow: "stroke-yellow-500",
  lime: "stroke-lime-500",
  green: "stroke-green-500",
  emerald: "stroke-emerald-500",
  teal: "stroke-teal-500",
  cyan: "stroke-cyan-500",
  sky: "stroke-sky-500",
  blue: "stroke-blue-500",
  indigo: "stroke-indigo-500",
  violet: "stroke-violet-500",
  purple: "stroke-purple-500",
  fuchsia: "stroke-fuchsia-500",
  pink: "stroke-pink-500",
  rose: "stroke-rose-500",
};

function getLimitedValue(input: number | undefined) {
  if (input === undefined) {
    return 0;
  } else if (input > 100) {
    return 100;
  } else {
    return input;
  }
}

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(
  (
    {
      value: inputValue,
      size = "md",
      className,
      showAnimation = true,
      color = "brand",
      radius: inputRadius,
      strokeWidth: inputStrokeWidth,
      children,
      ...other
    },
    ref,
  ) => {
    // sanitize input
    const value = getLimitedValue(inputValue);
    const radius = inputRadius ?? sizeConfig[size].radius;
    const strokeWidth = inputStrokeWidth ?? sizeConfig[size].strokeWidth;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = (value / 100) * circumference;
    const offset = circumference - strokeDashoffset;

    return (
      <div
        ref={ref}
        className={tremorTwMerge("flex flex-col items-center justify-center", className)}
        {...other}
      >
        <svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className="-rotate-90 transform"
        >
          <circle
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            stroke=""
            strokeLinecap="round"
            className={tremorTwMerge("transition-colors ease-linear", trackColors[color as Color])}
          />
          {value >= 0 ? (
            <circle
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + " " + circumference}
              strokeDashoffset={offset}
              fill="transparent"
              stroke=""
              strokeLinecap="round"
              className={tremorTwMerge(
                "transition-colors ease-linear",
                strokeColors[color as Color],
                showAnimation ? "transition-all duration-300 ease-in-out" : "",
              )}
            />
          ) : null}
        </svg>
        <div className={tremorTwMerge("absolute flex")}>{children}</div>
      </div>
    );
  },
);

ProgressCircle.displayName = "ProgressCircle";

export { ProgressCircle, type ProgressCircleProps };
