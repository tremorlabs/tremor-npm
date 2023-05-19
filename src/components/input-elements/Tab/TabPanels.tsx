import React from "react";
import { tremorTwMerge } from "lib";
import { Tab } from "@headlessui/react";
import { makeClassName } from "lib";

const makeTabPanelsClassName = makeClassName("TabPanels");

const TabPanels = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <Tab.Panels
        as="div"
        ref={ref}
        className={tremorTwMerge(makeTabPanelsClassName("root"), "w-full", className)}
        {...other}
      >
        {children}
      </Tab.Panels>
    );
  },
);

export default TabPanels;
