import React from "react";

import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { makeClassName } from "lib";

const makeTabPanelClassName = makeClassName("TabPanel");

const TabPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <Tab.Panel
        as="div"
        ref={ref}
        className={twMerge(makeTabPanelClassName("root"), "w-full mt-2", className)}
        {...other}
      >
        {children}
      </Tab.Panel>
    );
  },
);

export default TabPanel;
