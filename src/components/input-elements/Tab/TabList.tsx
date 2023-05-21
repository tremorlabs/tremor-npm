"use client";
import React, { createContext } from "react";
import { tremorTwMerge } from "lib";

import { BaseColorContext } from "contexts";

import { BaseColors, border, makeClassName, spacing } from "lib";
import { Color } from "../../../lib";
import { Tab } from "@headlessui/react";

const makeTabListClassName = makeClassName("TabList");

export type TabVariant = "line" | "solid";

export const TabVariantContext = createContext<TabVariant>("line");

const variantStyles: { [key in TabVariant]: string } = {
  line: tremorTwMerge("flex border-tremor-border", spacing.twoXl.spaceX, border.sm.bottom),
  solid: tremorTwMerge(
    "inline-flex p-1 bg-tremor-background-subtle rounded-tremor-default",
    spacing.xs.spaceX,
  ),
};

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: Color;
  variant?: TabVariant;
  children: React.ReactElement[] | React.ReactElement;
}

const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const { color = BaseColors.Blue, variant = "line", children, className, ...other } = props;

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

export default TabList;
