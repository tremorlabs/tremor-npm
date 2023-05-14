import React from "react";

import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { makeClassName } from "lib";

const makeTabPanelsClassName = makeClassName("TabPanels");

const TabPanels = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <Tab.Panels
        as="div"
        ref={ref}
        className={twMerge(makeTabPanelsClassName("root"), "w-full", className)}
        {...other}
      >
        {children}
      </Tab.Panels>
    );
  },
);

export default TabPanels;
