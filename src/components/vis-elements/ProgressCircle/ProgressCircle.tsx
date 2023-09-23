import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { Color, colorPalette, getColorClassNames, tremorTwMerge } from "lib";
import React from "react";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type ProgressCircleProps = {
  value: number;
  size?: Size;
  color?: Color;
  showValue: boolean;
  showAnimation?: boolean;
  tooltip?: string;
};

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>((props, ref) => {
  const {
    value: inputValue,
    size = "sm",
    showValue = true,
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

  const sizes = {
    xs: {
      width: "24",
      height: "24",
      textSize: "text-xs",
    },
    sm: {
      width: "36",
      height: "36",
      textSize: "text-sm",
    },
    md: {
      width: "72",
      height: "72",
      textSize: "text-md",
    },
    lg: {
      width: "144",
      height: "144",
      textSize: "text-3xl",
    },
    xl: {
      width: "256",
      height: "256",
      textSize: "text-5xl",
    },
  };

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={tooltipProps.refs.setReference}
        className="flex flex-col items-center justify-center"
      >
        <svg
          fill="none"
          shapeRendering="crispEdges"
          height={sizes[size].height}
          width={sizes[size].width}
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
        {showValue ? (
          <div
            className={tremorTwMerge(
              "absolute flex",
              showAnimation && "opacity-0 animate-gauge_fadeIn",
            )}
          >
            <span
              className={`text-tremor-content-emphasis dark:text-tremor-content-emphasis ${sizes[size].textSize}`}
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
