"use client";
import React, { createContext } from "react";

import { BaseColorContext } from "contexts";

import { TabList as HeadlessUiTabList } from "@headlessui/react";
import { Color, tremorTwMerge } from "lib";

export type TabVariant = "line" | "solid";

export const TabVariantContext = createContext<TabVariant>("line");

const variantStyles: { [key in TabVariant]: string } = {
  line: tremorTwMerge(
    // common
    "border-tremor-border-default flex space-x-4 border-b",
  ),
  solid: tremorTwMerge(
    // common
    "rounded-tremor-default bg-tremor-background-subtle inline-flex space-x-1.5 p-0.5",
  ),
};

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: Color;
  variant?: TabVariant;
  children: React.ReactElement[] | React.ReactElement;
}

const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ color, variant = "line", children, className, ...other }, ref) => {
    return (
      <HeadlessUiTabList
        ref={ref}
        className={tremorTwMerge(
          "justify-start overflow-x-clip",
          variantStyles[variant],
          className,
        )}
        {...other}
      >
        <TabVariantContext.Provider value={variant}>
          <BaseColorContext.Provider value={color}>{children}</BaseColorContext.Provider>
        </TabVariantContext.Provider>
      </HeadlessUiTabList>
    );
  },
);

TabList.displayName = "TabList";

export default TabList;
