"use client";
import { Tab } from "@headlessui/react";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeTabGroupClassName = makeClassName("TabGroup");

export interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultIndex?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
  children: React.ReactElement[] | React.ReactElement;
}

const TabGroup = React.forwardRef<HTMLDivElement, TabGroupProps>((props, ref) => {
  const { defaultIndex, index, onIndexChange, children, className, ...other } = props;

  return (
    <Tab.Group
      as="div"
      ref={ref}
      defaultIndex={defaultIndex}
      selectedIndex={index}
      onChange={onIndexChange as any}
      className={tremorTwMerge(makeTabGroupClassName("root"), "w-full", className)}
      {...other}
    >
      {children}
    </Tab.Group>
  );
});

TabGroup.displayName = "TabGroup";

export default TabGroup;
