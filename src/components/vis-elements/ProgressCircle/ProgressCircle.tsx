import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { Color, colorPalette, getColorClassNames, makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeProgressCircleClassName = makeClassName("ProgressBar");

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  size?: Size;
  color?: Color;
  showAnimation?: boolean;
  tooltip?: string;
  radius?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

const size2config: Record<Size, { strokeWidth: number; radius: number }> = {
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

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>((props, ref) => {
  const {
    value: inputValue,
    size = "md",
    className,
    showAnimation = true,
    color,
    tooltip,
    radius: inputRadius,
    strokeWidth: inputStrokeWidth,
    children,
    ...other
  } = props;

  // sanitize input
  const value = inputValue === undefined ? 0 : inputValue;
  const radius = inputRadius ?? size2config[size].radius;
  const strokeWidth = inputStrokeWidth ?? size2config[size].strokeWidth;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = (value / 100) * circumference;
  const offset = circumference - strokeDashoffset;

  const { tooltipProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={ref}
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
          className="transform -rotate-90"
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
                ? `${
                    getColorClassNames(color, colorPalette.background).strokeColor
                  } opacity-20 dark:opacity-25`
                : "stroke-tremor-brand-muted/50 dark:stroke-dark-tremor-brand-muted",
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
        <div className={tremorTwMerge("absolute flex")}>{children}</div>
      </div>
    </>
  );
});

ProgressCircle.displayName = "ProgressCircle";

export default ProgressCircle;
