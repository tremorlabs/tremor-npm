"use client";
import { Tab as HeadlessTab } from "@headlessui/react";
// <<<<<<< HEAD
// import {
//   colorPalette,
//   getColorClassNames,
//   tremorTwMerge,
//   makeClassName,
//   sizing,
//   spacing,
// } from "lib";
// import React, { ReactElement, cloneElement, isValidElement, useContext } from "react";
// =======
import { colorPalette, getColorClassNames, tremorTwMerge, makeClassName } from "lib";
import React, { ReactElement, cloneElement, isValidElement, useContext } from "react";
// >>>>>>> main

import { TabVariant, TabVariantContext } from "components/input-elements/Tabs/TabList";
import { BaseColorContext } from "contexts";
import { Color } from "../../../lib/inputTypes";

const makeTabClassName = makeClassName("Tab");

function getVariantStyles(tabVariant: TabVariant, color?: Color) {
  switch (tabVariant) {
    case "line":
      return tremorTwMerge(
        // common
        "ui-selected:border-b-2 hover:border-b-2 border-transparent transition duration-100 -mb-px px-2 py-2",
        // light
        "hover:border-tremor-content hover:text-tremor-content-emphasis text-tremor-content",
        // dark
        "dark:hover:border-dark-tremor-content-emphasis dark:hover:text-dark-tremor-content-emphasis dark:text-dark-tremor-content",
        // brand
        color
          ? getColorClassNames(color, colorPalette.border).selectBorderColor
          : "ui-selected:border-tremor-brand dark:ui-selected:border-dark-tremor-brand",
      );
    case "solid":
      return tremorTwMerge(
        // common
        "border-transparent border rounded-tremor-small px-2.5 py-1",
        // light
        "ui-selected:border-tremor-border ui-selected:bg-tremor-background ui-selected:shadow-tremor-input hover:text-tremor-content-emphasis ui-selected:text-tremor-brand",
        // dark
        "dark:ui-selected:border-dark-tremor-border dark:ui-selected:bg-dark-tremor-background dark:ui-selected:shadow-dark-tremor-input dark:hover:text-dark-tremor-content-emphasis dark:ui-selected:text-dark-tremor-brand",
        // brand
        color
          ? getColorClassNames(color, colorPalette.text).selectTextColor
          : "text-tremor-content dark:text-dark-tremor-content",
      );
  }
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType | React.ReactElement;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { icon, className, children, ...other } = props;

  const variant = useContext(TabVariantContext);
  const color = useContext(BaseColorContext);
  let Icon;
  if (icon) {
    if (isValidElement(icon)) {
      Icon = cloneElement(icon as ReactElement, {
        className: tremorTwMerge(
          makeTabClassName("icon"),
          "flex-none h-5 w-5",
          children ? "mr-2" : "",
        ),
      });
    } else {
      const IconElm = icon as React.ElementType;
      Icon = (
        <IconElm
          className={tremorTwMerge(
            makeTabClassName("icon"),
            "flex-none h-5 w-5",
            children ? "mr-2" : "",
          )}
        />
      );
    }
  }
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
          : variant === "solid"
          ? "ui-selected:text-tremor-content-emphasis dark:ui-selected:text-dark-tremor-content-emphasis"
          : "ui-selected:text-tremor-brand dark:ui-selected:text-dark-tremor-brand",
        getVariantStyles(variant, color),
        className,
      )}
      {...other}
    >
      {Icon}
      {children ? <span>{children}</span> : null}
    </HeadlessTab>
  );
});

Tab.displayName = "Tab";

export default Tab;
