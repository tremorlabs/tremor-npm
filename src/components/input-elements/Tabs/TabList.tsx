"use client";
import React, { createContext } from "react";

import { BaseColorContext } from "contexts";

import { Tab } from "@headlessui/react";
import { Color, makeClassName, tremorTwMerge } from "lib";

const makeTabListClassName = makeClassName("TabList");

export type TabVariant = "line" | "solid";

export const TabVariantContext = createContext<TabVariant>("line");

const variantStyles: { [key in TabVariant]: string } = {
  line: tremorTwMerge(
    // common
    "flex space-x-4 border-b",
    // light
    "border-tremor-border",
    // dark
    "dark:border-dark-tremor-border",
  ),
  solid: tremorTwMerge(
    // common
    "rounded-tremor-default inline-flex space-x-1.5 p-0.5",
    // light
    "bg-tremor-background-subtle",
    // dark
    "dark:bg-dark-tremor-background-subtle",
  ),
};

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: Color;
  variant?: TabVariant;
  children: React.ReactElement[] | React.ReactElement;
}

const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const { color, variant = "line", children, className, ...other } = props;

  return (
    <Tab.List
      ref={ref}
      className={tremorTwMerge(
        makeTabListClassName("root"),
        "justify-start overflow-x-clip",
        variantStyles[variant],
        className,
      )}
      {...other}
    >
      <TabVariantContext.Provider value={variant}>
        <BaseColorContext.Provider value={color}>{children}</BaseColorContext.Provider>
      </TabVariantContext.Provider>
    </Tab.List>
  );
});

TabList.displayName = "TabList";

export default TabList;
