"use client";
import { Tab as HeadlessTab } from "@headlessui/react";
import { colorPalette, getColorClassNames, tremorTwMerge, makeClassName } from "lib";
import React, { useContext } from "react";

import { TabVariant, TabVariantContext } from "components/input-elements/Tabs/TabList";
import { BaseColorContext } from "contexts";
import { Color } from "../../../lib/inputTypes";

const makeTabClassName = makeClassName("Tab");

function getVariantStyles(tabVariant: TabVariant, color?: Color) {
  switch (tabVariant) {
    case "line":
      return tremorTwMerge(
        // common
        "data-[selected]:border-b-2 hover:border-b-2 border-transparent transition duration-100 -mb-px px-2 py-2",
        // light
        "hover:border-tremor-content hover:text-tremor-content-emphasis text-tremor-content",
        // dark
        "[&:not([data-selected])]:dark:hover:border-dark-tremor-content-emphasis [&:not([data-selected])]:dark:hover:text-dark-tremor-content-emphasis [&:not([data-selected])]:dark:text-dark-tremor-content",
        // brand
        color
          ? getColorClassNames(color, colorPalette.border).selectBorderColor
          : [
              "data-[selected]:border-tremor-brand data-[selected]:text-tremor-brand",
              "data-[selected]:dark:border-dark-tremor-brand data-[selected]:dark:text-dark-tremor-brand",
            ],
      );
    case "solid":
      return tremorTwMerge(
        // common
        "border-transparent border rounded-tremor-small px-2.5 py-1",
        // light
        "data-[selected]:border-tremor-border data-[selected]:bg-tremor-background data-[selected]:shadow-tremor-input [&:not([data-selected])]:hover:text-tremor-content-emphasis data-[selected]:text-tremor-brand [&:not([data-selected])]:text-tremor-content",
        // dark
        "dark:data-[selected]:border-dark-tremor-border dark:data-[selected]:bg-dark-tremor-background dark:data-[selected]:shadow-dark-tremor-input dark:[&:not([data-selected])]:hover:text-dark-tremor-content-emphasis dark:data-[selected]:text-dark-tremor-brand dark:[&:not([data-selected])]:text-dark-tremor-content",
        // brand
        color
          ? getColorClassNames(color, colorPalette.text).selectTextColor
          : "text-tremor-content dark:text-dark-tremor-content",
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
        "flex whitespace-nowrap truncate max-w-xs outline-none data-focus-visible:ring text-tremor-default transition duration-100",
        getVariantStyles(variant, color),
        className,
        color && getColorClassNames(color, colorPalette.text).selectTextColor,
      )}
      {...other}
    >
      {Icon ? (
        <Icon
          className={tremorTwMerge(
            makeTabClassName("icon"),
            "flex-none h-5 w-5",
            children ? "mr-2" : "",
          )}
        />
      ) : null}
      {children ? <span>{children}</span> : null}
    </HeadlessTab>
  );
});

Tab.displayName = "Tab";

export default Tab;
