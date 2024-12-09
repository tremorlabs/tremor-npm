"use client";
import { Tab as HeadlessTab } from "@headlessui/react";
import { colorPalette, getColorClassNames, makeClassName, tremorTwMerge } from "lib";
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
        "-mb-px border-transparent px-2 py-2 transition duration-100 hover:border-b-2 data-selected:border-b-2",
        // light
        "hover:border-tremor-content hover:text-tremor-content-emphasis text-tremor-content",
        // dark
        "dark:[&:not([data-selected])]:hover:border-dark-tremor-content-emphasis dark:[&:not([data-selected])]:hover:text-dark-tremor-content-emphasis dark:[&:not([data-selected])]:text-dark-tremor-content",
        // brand
        color
          ? getColorClassNames(color, colorPalette.border).selectBorderColor
          : [
              "data-selected:border-tremor-brand data-selected:text-tremor-brand",
              "dark:data-selected:border-dark-tremor-brand dark:data-selected:text-dark-tremor-brand",
            ],
      );
    case "solid":
      return tremorTwMerge(
        // common
        "rounded-tremor-small border border-transparent px-2.5 py-1",
        // light
        "data-selected:border-tremor-border data-selected:bg-tremor-background data-selected:shadow-tremor-input [&:not([data-selected])]:hover:text-tremor-content-emphasis data-selected:text-tremor-brand [&:not([data-selected])]:text-tremor-content",
        // dark
        "dark:data-selected:border-dark-tremor-border dark:data-selected:bg-dark-tremor-background dark:data-selected:shadow-dark-tremor-input dark:[&:not([data-selected])]:hover:text-dark-tremor-content-emphasis dark:data-selected:text-dark-tremor-brand dark:[&:not([data-selected])]:text-dark-tremor-content",
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
        "text-tremor-default flex max-w-xs truncate whitespace-nowrap transition duration-100 outline-none data-focus-visible:ring-3",
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
            "h-5 w-5 shrink-0",
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
