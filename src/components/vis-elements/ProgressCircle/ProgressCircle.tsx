import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import {
  Color,
  ValueFormatter,
  colorPalette,
  defaultValueFormatter,
  getColorClassNames,
  makeClassName,
  tremorTwMerge,
} from "lib";
import React from "react";

const makeProgressCircleClassName = makeClassName("ProgressBar");

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: Size;
  color?: Color;
  showLabel: boolean;
  showAnimation?: boolean;
  radius: number;
  tooltip?: string;
  strokeWidth: number;
  progress: number;
  valueFormatter: ValueFormatter;
}

const size2config: Record<
  Size,
  { textSize: string; fontWeight: string; strokeWidth: number; radius: number }
> = {
  xs: {
    radius: 15,
    textSize: "text-xs",
    fontWeight: "font-normal",
    strokeWidth: 3,
  },
  sm: {
    radius: 19,
    textSize: "text-sm",
    fontWeight: "font-normal",
    strokeWidth: 4,
  },
  md: {
    radius: 32,
    textSize: "text-md",
    fontWeight: "font-medium",
    strokeWidth: 6,
  },
  lg: {
    radius: 52,
    textSize: "text-3xl",
    fontWeight: "font-semibold",
    strokeWidth: 8,
  },
  xl: {
    radius: 80,
    textSize: "text-5xl",
    fontWeight: "font-semibold",
    strokeWidth: 10,
  },
};

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>((props) => {
  const {
    value,
    size = "md",
    className,
    showLabel = true,
    showAnimation = true,
    color,
    valueFormatter = defaultValueFormatter,
    tooltip,
    ...other
  } = props;
  const radius = size2config[size].radius;
  const strokeWidth = size2config[size].strokeWidth;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = (value / 100) * circumference;
  const offset = circumference - strokeDashoffset;

  const { tooltipProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={tooltipProps.refs.setReference}
        className={tremorTwMerge(
          makeProgressCircleClassName("root"),
          "flex flex-col items-center justify-center",
          className,
        )}
        {...other}
      >
        <svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className="tansform -rotate-90"
        >
          <circle
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            stroke=""
            strokeLinecap="round"
            className={tremorTwMerge(
              color
                ? getColorClassNames(color, colorPalette.lightBackground).strokeColor
                : "stroke-tremor-brand-faint dark:stroke-dark-tremor-brand-faint",
            )}
          />
          {value > 0 ? (
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
                color
                  ? getColorClassNames(color, colorPalette.background).strokeColor
                  : "stroke-tremor-brand dark:stroke-dark-tremor-brand",
              )}
            >
              {showAnimation && (
                <>
                  <animate
                    attributeName="stroke-dashoffset"
                    from={circumference}
                    to={offset}
                    dur="0.5s"
                    calcMode={"spline"}
                    keySplines="0.42, 0, 1, 1"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    from="0"
                    to="1"
                    dur="0.5s"
                    calcMode={"spline"}
                    keySplines="0.42, 0, 1, 1"
                  />
                </>
              )}
            </circle>
          ) : null}
        </svg>
        {showLabel ? (
          <div
            className={tremorTwMerge(
              "absolute flex",
              showAnimation && "opacity-0 animate-gauge_fadeIn",
            )}
          >
            <span
              className={`text-tremor-content-emphasis dark:text-tremor-content-emphasis ${size2config[size].textSize}`}
            >
              {valueFormatter(value)}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
});

ProgressCircle.displayName = "ProgressCircle";

export default ProgressCircle;
