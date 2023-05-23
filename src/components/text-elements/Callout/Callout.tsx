import React from "react";
import { tremorTwMerge } from "lib";

import { border, getColorClassNames, makeClassName, sizing, spacing } from "lib";
import { Color } from "../../../lib";
import { colorPalette } from "lib/theme";

const makeCalloutClassName = makeClassName("Callout");

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ElementType;
  color?: Color;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const { title, icon, color, className, children, ...other } = props;

  const Icon = icon;
  return (
    <div
      ref={ref}
      className={tremorTwMerge(
        makeCalloutClassName("root"),
        "flex flex-col overflow-hidden text-tremor-sm rounded-tremor-default bg-tremor-brand-faint border-tremor-brand-emphasis",
        color && getColorClassNames(color, colorPalette.canvasBackground).bgColor,
        color && getColorClassNames(color, colorPalette.darkBorder).borderColor,
        spacing.lg.paddingY,
        spacing.lg.paddingRight,
        spacing.twoXl.paddingLeft,
        border.lg.left,
        className,
      )}
      {...other}
    >
      <div
        className={tremorTwMerge(
          makeCalloutClassName("header"),
          "flex items-start text-tremor-brand-emphasis",
          color && getColorClassNames(color, colorPalette.darkText).textColor,
        )}
      >
        {Icon ? (
          <Icon
            className={tremorTwMerge(
              makeCalloutClassName("icon"),
              "flex-none",
              sizing.lg.height,
              sizing.lg.width,
              spacing.xs.marginRight,
            )}
          />
        ) : null}
        <h4
          className={tremorTwMerge(makeCalloutClassName("title"), "text-elem font-tremor-semibold")}
        >
          {title}
        </h4>
      </div>
      <p
        className={tremorTwMerge(
          makeCalloutClassName("body"),
          "overflow-y-auto text-tremor-brand-emphasis",
          color && getColorClassNames(color, colorPalette.darkText).textColor,
          spacing.sm.marginTop,
        )}
      >
        {children}
      </p>
    </div>
  );
});

Callout.displayName = "Callout";

export default Callout;
