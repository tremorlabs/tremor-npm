import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { Color, Sizes, colorPalette, getColorClassNames, tremorTwMerge } from "lib";
import React from "react";

type Size = (typeof Sizes)[number];

export type ProgressCircleProps = {
  value: number;
  size?: Size;
  color?: Color;
  showLabel: boolean;
  showAnimation?: boolean;
  tooltip?: string;
};

const size2config: Record<
  Size,
  { width: string; height: string; textSize: string; fontWeight: string }
> = {
  xs: {
    width: "30px",
    height: "30px",
    textSize: "text-xs",
    fontWeight: "font-normal",
  },
  sm: {
    width: "38px",
    height: "38px",
    textSize: "text-sm",
    fontWeight: "font-normal",
  },
  md: {
    width: "64px",
    height: "64px",
    textSize: "text-md",
    fontWeight: "font-medium",
  },
  lg: {
    width: "104px",
    height: "104px",
    textSize: "text-3xl",
    fontWeight: "font-semibold",
  },
  xl: {
    width: "160px",
    height: "160px",
    textSize: "text-5xl",
    fontWeight: "font-semibold",
  },
};

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>((props, ref) => {
  const {
    value: inputValue,
    size = "sm",
    showLabel = true,
    color = "blue",
    showAnimation = true,
    tooltip,
  } = props;
  const value = inputValue > 100 ? 100 : inputValue < 0 ? 0 : inputValue; // clean up input
  const circumference = 332; //2 * Math.PI * 53; // 2 * pi * radius
  const valueInCircumference = (value / 100) * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;
  const initialOffset = circumference;
  const strokeDashoffset = initialOffset - valueInCircumference;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={tooltipProps.refs.setReference}
        className="flex flex-col items-center justify-center relative"
      >
        <svg
          fill="none"
          shapeRendering="crispEdges"
          height={size2config[size].height}
          width={size2config[size].width}
          viewBox="0 0 120 120"
          strokeWidth="2"
          className="transform -rotate-90"
        >
          <circle
            className={tremorTwMerge(
              (color
                ? getColorClassNames(color, colorPalette.lightBackground).bgColor
                : "bg-tremor-brand-faint dark:bg-dark-tremor-brand-faint"
              ).replace("bg", "text"),
            )}
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            shapeRendering="geometricPrecision"
            r="53"
            cx="60"
            cy="60"
          />
          <circle
            className={tremorTwMerge(
              (color
                ? getColorClassNames(color, colorPalette.background).bgColor
                : "bg-tremor-brand dark:bg-dark-tremor-brand"
              ).replace("bg", "text"),
              showAnimation && "animate-gauge_fill",
            )}
            strokeWidth="12"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={initialOffset}
            shapeRendering="geometricPrecision"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="53"
            cx="60"
            cy="60"
            style={{
              strokeDashoffset: strokeDashoffset,
              transition: "stroke-dasharray 1s ease 0s,stroke 1s ease 0s",
            }}
          />
        </svg>
        {showLabel ? (
          <div
            className={tremorTwMerge(
              "absolute flex",
              showAnimation && "opacity-0 animate-gauge_fadeIn",
            )}
          >
            <p
              className={`text-black ${size2config[size].textSize} ${size2config[size].fontWeight}`}
            >
              {value}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
});

ProgressCircle.displayName = "ProgressCircle";

export default ProgressCircle;
