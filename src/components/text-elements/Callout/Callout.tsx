import React from "react";
import { getColorClassNames, makeClassName, tremorTwMerge, Color } from "lib";
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
        "flex flex-col overflow-hidden rounded-tremor-default text-tremor-default border-l-4 py-3 pr-3 pl-4",
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
        className,
      )}
      {...other}
    >
      <div className={tremorTwMerge(makeCalloutClassName("header"), "flex items-start")}>
        {Icon ? (
          <Icon
            className={tremorTwMerge(makeCalloutClassName("icon"), "flex-none h-5 w-5 mr-1.5")}
          />
        ) : null}
        <h4 className={tremorTwMerge(makeCalloutClassName("title"), "font-semibold")}>{title}</h4>
      </div>
      <p
        className={tremorTwMerge(
          makeCalloutClassName("body"),
          "overflow-y-auto",
          children ? "mt-2" : "",
        )}
      >
        {children}
      </p>
    </div>
  );
});

Callout.displayName = "Callout";

export default Callout;
