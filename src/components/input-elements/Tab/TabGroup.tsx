import React from "react";

import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { makeClassName } from "lib";

const makeTabGroupClassName = makeClassName("TabGroup");

export interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  children: React.ReactElement[] | React.ReactElement;
}

const TabGroup = React.forwardRef<HTMLDivElement, TabGroupProps>((props, ref) => {
  const { defaultValue, value, onValueChange, children, className, ...other } = props;

  return (
    <Tab.Group
      as="div"
      ref={ref}
      defaultIndex={defaultValue}
      selectedIndex={value}
      onChange={onValueChange as any}
      className={twMerge(makeTabGroupClassName("root"), "w-full", className)}
      {...other}
    >
      {children}
    </Tab.Group>
  );
});

export default TabGroup;
