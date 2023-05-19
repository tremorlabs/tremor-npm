import React from "react";
import { tremorTwMerge } from "lib";
import { Tab } from "@headlessui/react";
import { makeClassName } from "lib";

const makeTabPanelClassName = makeClassName("TabPanel");

const TabPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <Tab.Panel
        as="div"
        ref={ref}
        className={tremorTwMerge(makeTabPanelClassName("root"), "w-full mt-2", className)}
        {...other}
      >
        {children}
      </Tab.Panel>
    );
  },
);

export default TabPanel;
