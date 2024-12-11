import React from "react";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { getColorClassNames, makeClassName, tremorTwMerge } from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib/inputTypes";

const makeProgressBarClassName = makeClassName("ProgressBar");

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
  tooltip?: string;
  showAnimation?: boolean;
  color?: Color;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
  const { value, label, color, tooltip, showAnimation = false, className, ...other } = props;
  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={ref}
        className={tremorTwMerge(
          makeProgressBarClassName("root"),
          "flex w-full items-center",
          className,
        )}
        {...other}
      >
        <div
          ref={tooltipProps.refs.setReference}
          className={tremorTwMerge(
            makeProgressBarClassName("progressBarWrapper"),
            "rounded-tremor-full bg-opacity-20 relative flex h-2 w-full items-center",
            color
              ? getColorClassNames(color, colorPalette.background).bgColor
              : "bg-tremor-brand-muted/50 dark:bg-dark-tremor-brand-muted",
          )}
          {...getReferenceProps}
        >
          <div
            className={tremorTwMerge(
              makeProgressBarClassName("progressBar"),
              "rounded-tremor-full h-full flex-col",
              color
                ? getColorClassNames(color, colorPalette.background).bgColor
                : "bg-tremor-brand dark:bg-dark-tremor-brand",
              showAnimation ? "transition-all duration-300 ease-in-out" : "",
            )}
            style={{
              width: `${value}%`,
            }}
          />
        </div>
        {label ? (
          <div
            className={tremorTwMerge(
              makeProgressBarClassName("labelWrapper"),
              "ml-2 w-16 truncate text-right",
              "text-tremor-content-emphasis",
              "dark:text-dark-tremor-content-emphasis",
            )}
          >
            <p
              className={tremorTwMerge(
                makeProgressBarClassName("label"),
                "text-tremor-default shrink-0 truncate whitespace-nowrap",
              )}
            >
              {label}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
