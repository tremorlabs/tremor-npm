import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { Color, colorPalette, getColorClassNames, makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeProgressCircleClassName = makeClassName("ProgressBar");

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: Size;
  color?: Color;
  showValue: boolean;
  showAnimation?: boolean;
  tooltip?: string;
}

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>((props, ref) => {
  const {
    value: inputValue,
    size = "sm",
    showValue = true,
    color = "blue",
    showAnimation = true,
    tooltip,
    className,
    ...other
  } = props;
  const value = inputValue > 100 ? 100 : inputValue < 0 ? 0 : inputValue; // clean up input
  const circumference = 332; //2 * Math.PI * 53; // 2 * pi * radius
  const valueInCircumference = (value / 100) * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;
  const initialOffset = circumference;
  const strokeDashoffset = initialOffset - valueInCircumference;

  const sizes = {
    xs: {
      width: "30",
      height: "30",
      textSize: "text-xs",
    },
    sm: {
      width: "38",
      height: "38",
      textSize: "text-sm",
    },
    md: {
      width: "64",
      height: "64",
      textSize: "text-md",
    },
    lg: {
      width: "104",
      height: "104",
      textSize: "text-lg",
    },
    xl: {
      width: "160",
      height: "160",
      textSize: "text-xl",
    },
  };

  const { tooltipProps, getReferenceProps } = useTooltip();

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
