"use client";
import React, { useContext } from "react";
import { Tab as HeadlessTab } from "@headlessui/react";
import { colorPalette, getColorClassNames, tremorTwMerge } from "lib";

import { makeClassName, sizing, spacing } from "lib";
import { Color } from "../../../lib/inputTypes";
import { TabVariant, TabVariantContext } from "components/input-elements/Tabs/TabList";
import { BaseColorContext } from "contexts";

const makeTabClassName = makeClassName("Tab");

function getVariantStyles(tabVariant: TabVariant, color?: Color) {
  switch (tabVariant) {
    case "line":
      return tremorTwMerge(
        // common
        "ui-selected:border-b-2 hover:border-b-2 border-transparent transition duration-100",
        // light
        "hover:border-tremor-content hover:text-tremor-content-emphasis text-tremor-content",
        // dark
        "dark:hover:border-dark-tremor-content-emphasis dark:hover:text-dark-tremor-content-emphasis dark:text-dark-tremor-content",
        // brand
        color
          ? getColorClassNames(color, colorPalette.border).selectBorderColor
          : "ui-selected:border-tremor-brand dark:ui-selected:border-dark-tremor-brand",
        spacing.px.negativeMarginBottom,
      );
    case "solid":
      return tremorTwMerge(
        // common
        "border-transparent border rounded-tremor-small",
        // light
        "ui-selected:border-tremor-border ui-selected:bg-tremor-background ui-selected:shadow-tremor-input hover:text-tremor-content-emphasis text-tremor-content",
        // dark
        "dark:ui-selected:border-dark-tremor-border dark:ui-selected:bg-dark-tremor-background dark:ui-selected:shadow-dark-tremor-input dark:hover:text-dark-tremor-content-emphasis dark:text-dark-tremor-content",
        spacing.lg.paddingX,
        spacing.xs.paddingY,
      );
  }
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { icon, className, children, ...other } = props;

  const variant = useContext(TabVariantContext);
  const color = useContext(BaseColorContext);
  const Icon = icon;

  return (
    <HeadlessTab
      ref={ref}
      className={tremorTwMerge(
        makeTabClassName("root"),
        // common
        "flex whitespace-nowrap truncate max-w-xs outline-none focus:ring-0 text-tremor-default transition duration-100",
        // brand
        color
          ? getColorClassNames(color, colorPalette.text).selectTextColor
          : "ui-selected:text-tremor-brand dark:ui-selected:text-dark-tremor-brand",
        getVariantStyles(variant, color),
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
