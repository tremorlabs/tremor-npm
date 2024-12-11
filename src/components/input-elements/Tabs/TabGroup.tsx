"use client";
import { TabGroup as HeadlessUiTabGroup } from "@headlessui/react";
import { tremorTwMerge } from "lib";
import React from "react";

interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultIndex?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
  children: React.ReactElement[] | React.ReactElement;
}

const TabGroup = React.forwardRef<HTMLDivElement, TabGroupProps>(
  ({ defaultIndex, index, onIndexChange, children, className, ...other }, ref) => {
    return (
      <HeadlessUiTabGroup
        ref={ref}
        defaultIndex={defaultIndex}
        selectedIndex={index}
        onChange={onIndexChange as any}
        className={tremorTwMerge("w-full", className)}
        {...other}
      >
        {children}
      </HeadlessUiTabGroup>
    );
  },
);

TabGroup.displayName = "TabGroup";

export { TabGroup, type TabGroupProps };
