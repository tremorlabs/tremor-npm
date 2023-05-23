import React from "react";
import { tremorTwMerge } from "lib";
import { Tab } from "@headlessui/react";
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
      className={tremorTwMerge(makeTabGroupClassName("root"), "w-full", className)}
      {...other}
    >
      {children}
    </Tab.Group>
  );
});

TabGroup.displayName = "TabGroup";

export default TabGroup;
