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
  if (process.env.NODE_ENV === "development") {
    console.info(
      "The Tab is also available as a copy-and-paste component. Visit https://tremor.so/docs/ui/tabs (This is only shown in development)",
    );
  }
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
