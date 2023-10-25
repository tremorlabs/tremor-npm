import { tremorTwMerge } from "lib";
import React, { cloneElement, isValidElement } from "react";

import { border, getColorClassNames, makeClassName, sizing, spacing } from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib";

const makeCalloutClassName = makeClassName("Callout");

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ElementType | React.ReactElement;
  color?: Color;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const { title, icon, color, className, children, ...other } = props;

  let Icon;
  if (icon) {
    if (isValidElement(icon)) {
      Icon = cloneElement(icon as React.ReactElement, {
        className: tremorTwMerge(
          makeCalloutClassName("icon"),
          "flex-none",
          sizing.lg.height,
          sizing.lg.width,
          spacing.xs.marginRight,
        ),
      });
    } else {
      const IconElm = icon as React.ElementType;
      Icon = (
        <IconElm
          className={tremorTwMerge(
            makeCalloutClassName("icon"),
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.xs.marginRight,
          )}
        />
      );
    }
  }

  return (
    <div
      ref={ref}
      className={tremorTwMerge(
        makeCalloutClassName("root"),
        "flex flex-col overflow-hidden rounded-tremor-default text-tremor-default",
        color
          ? tremorTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              getColorClassNames(color, colorPalette.darkBorder).borderColor,
              getColorClassNames(color, colorPalette.darkText).textColor,
              "dark:bg-opacity-10 bg-opacity-10",
            )
          : tremorTwMerge(
              // light
              "bg-tremor-brand-faint border-tremor-brand-emphasis text-tremor-brand-emphasis",
              // dark
              "dark:bg-dark-tremor-brand-muted/70 dark:border-dark-tremor-brand-emphasis dark:text-dark-tremor-brand-emphasis",
            ),
        spacing.lg.paddingY,
        spacing.lg.paddingRight,
        spacing.twoXl.paddingLeft,
        border.lg.left,
        className,
      )}
      {...other}
    >
      <div className={tremorTwMerge(makeCalloutClassName("header"), "flex items-start")}>
        {Icon}
        <h4 className={tremorTwMerge(makeCalloutClassName("title"), "font-semibold")}>{title}</h4>
      </div>
      <p
        className={tremorTwMerge(
          makeCalloutClassName("body"),
          "overflow-y-auto",
          children ? spacing.sm.marginTop : "",
        )}
      >
        {children}
      </p>
    </div>
  );
});

Callout.displayName = "Callout";

export default Callout;
