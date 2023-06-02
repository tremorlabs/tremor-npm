"use client";
import React, { useContext } from "react";
import { Tab as HeadlessTab } from "@headlessui/react";
import { tremorTwMerge } from "lib";

import { makeClassName, sizing, spacing } from "lib";
import { TabVariant, TabVariantContext } from "components/input-elements/Tabs/TabList";

const makeTabClassName = makeClassName("Tab");

const variantStyles: { [key in TabVariant]: string } = {
  line: tremorTwMerge(
    // common
    "ui-selected:border-b-2 hover:border-b-2 border-transparent transition duration-100",
    // light
    "ui-selected:border-tremor-brand hover:border-tremor-content hover:text-tremor-content-emphasis text-tremor-content",
    // dark
    "dark:ui-selected:border-dark-tremor-brand dark:hover:border-dark-tremor-content-emphasis dark:hover:text-dark-tremor-content-emphasis dark:text-dark-tremor-content",
    spacing.px.negativeMarginBottom,
  ),
  solid: tremorTwMerge(
    // common
    "border-transparent border rounded-tremor-small",
    // light
    "ui-selected:border-tremor-border ui-selected:bg-tremor-background ui-selected:shadow-tremor-input hover:text-tremor-content-emphasis text-tremor-content",
    // dark
    "dark:ui-selected:border-dark-tremor-border dark:ui-selected:bg-dark-tremor-background dark:ui-selected:shadow-dark-tremor-input dark:hover:text-dark-tremor-content-emphasis dark:text-dark-tremor-content",
    spacing.lg.paddingX,
    spacing.xs.paddingY,
  ),
};

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { icon, className, children, ...other } = props;

  const variant = useContext(TabVariantContext);
  const Icon = icon;

  return (
    <HeadlessTab
      ref={ref}
      className={tremorTwMerge(
        makeTabClassName("root"),
        // common
        "flex whitespace-nowrap truncate max-w-xs outline-none focus:ring-0 text-tremor-default transition duration-100",
        // light
        "ui-selected:text-tremor-brand",
        // dark
        "dark:ui-selected:text-dark-tremor-brand",
        variantStyles[variant],
        spacing.sm.paddingX,
        spacing.sm.paddingY,
        className,
      )}
      {...other}
    >
      {Icon ? (
        <Icon
          className={tremorTwMerge(
            makeTabClassName("icon"),
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.sm.marginRight,
          )}
        />
      ) : null}
      <span>{children}</span>
    </HeadlessTab>
  );
});

Tab.displayName = "Tab";

export default Tab;
