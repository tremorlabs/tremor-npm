"use client";
import React, { createContext, useId } from "react";
import { tremorTwMerge } from "lib";
import { Tab } from "@headlessui/react";
import { makeClassName } from "lib";

const makeTabGroupClassName = makeClassName("TabGroup");

export interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultIndex?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
  children: React.ReactElement[] | React.ReactElement;
}

export const IdContext = createContext<string | undefined>(undefined);

const TabGroup = React.forwardRef<HTMLDivElement, TabGroupProps>((props, ref) => {
  const { defaultIndex, index, onIndexChange, children, className, ...other } = props;
  const id = useId();

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
      <IdContext.Provider value={`tremor-tab-group-${id}`}>{children}</IdContext.Provider>
    </Tab.Group>
  );
});

TabGroup.displayName = "TabGroup";

export default TabGroup;
