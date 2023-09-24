import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { Color, colorPalette, getColorClassNames, makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeProgressCircleClassName = makeClassName("ProgressBar");

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: Size;
  color?: Color;
  showLabel: boolean;
  showAnimation?: boolean;
  tooltip?: string;
}

const size2config: Record<
  Size,
  { width: number; height: number; textSize: string; fontWeight: string }
> = {
  xs: {
    width: 30,
    height: 30,
    textSize: "text-xs",
    fontWeight: "font-normal",
  },
  sm: {
    width: 38,
    height: 38,
    textSize: "text-sm",
    fontWeight: "font-normal",
  },
  md: {
    width: 64,
    height: 64,
    textSize: "text-md",
    fontWeight: "font-medium",
  },
  lg: {
    width: 104,
    height: 104,
    textSize: "text-3xl",
    fontWeight: "font-semibold",
  },
  xl: {
    width: 160,
    height: 160,
    textSize: "text-5xl",
    fontWeight: "font-semibold",
  },
};

const CustomCircle = (props: {
  className: string;
  strokeDasharray?: string | undefined;
  initialOffset?: number | undefined;
  strokeDashoffset?: number | undefined;
  transition?: string | undefined;
  strokeLinecap?: "round" | undefined;
}) => {
  const {
    className,
    strokeDasharray = undefined,
    initialOffset = undefined,
    strokeLinecap = undefined,
    strokeDashoffset = undefined,
    transition = undefined,
  } = props;
  return (
    <circle
      className={className}
      strokeWidth="12"
      stroke="currentColor"
      fill="transparent"
      shapeRendering="geometricPrecision"
      r="53" // make dynamic here:
      cx="60" // make dynamic here: e.g. {size2config[size].width / 2}
      cy="60" // make dynamic here: e.g. {size2config[size].height / 2}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={initialOffset}
      strokeLinecap={strokeLinecap}
      style={{
        strokeDashoffset: strokeDashoffset,
        transition: transition,
      }}
    />
  );
};

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>((props) => {
  const {
    value: inputValue,
    size = "sm",
    showLabel = true,
    color = "blue",
    showAnimation = true,
    tooltip,
    className,
    ...other
  } = props;
  const value = inputValue > 100 ? 100 : inputValue < 0 ? 0 : inputValue;
  const circumference = 332; // make dynamic here: 2 * Math.PI * 53; // 2 * pi * radius
  const valueInCircumference = (value / 100) * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;
  const initialOffset = circumference;
  const strokeDashoffset = initialOffset - valueInCircumference;

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
          fill="none"
          shapeRendering="crispEdges"
          height={size2config[size].height}
          width={size2config[size].width}
          viewBox="0 0 120 120" // make dynamic here, tried: viewBox={`0 0 ${size2config[size].width} ${size2config[size].width}`}
          strokeWidth="2"
          className="transform -rotate-90"
        >
          <CustomCircle
            className={tremorTwMerge(
              (color
                ? getColorClassNames(color, colorPalette.lightBackground).bgColor
                : "bg-tremor-brand-faint dark:bg-dark-tremor-brand-faint"
              ).replace("bg", "text"),
            )}
          />
          {value > 0 && (
            <CustomCircle
              className={tremorTwMerge(
                (color
                  ? getColorClassNames(color, colorPalette.background).bgColor
                  : "bg-tremor-brand dark:bg-dark-tremor-brand"
                ).replace("bg", "text"),
                showAnimation && "animate-gauge_fill",
              )}
              strokeDasharray={strokeDasharray}
              initialOffset={initialOffset}
              strokeDashoffset={strokeDashoffset}
              transition={"stroke-dasharray 1s ease 0s,stroke 1s ease 0s"}
              strokeLinecap="round"
            />
          )}
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
              {value}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
});

ProgressCircle.displayName = "ProgressCircle";

export default ProgressCircle;
