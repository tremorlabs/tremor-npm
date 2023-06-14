"use client";
import React from "react";
import { tremorTwMerge } from "lib";
import { Tab } from "@headlessui/react";
import { makeClassName } from "lib";
import { IndexContext, SelectedValueContext } from "contexts";

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
        {({ selectedIndex }) => (
          <SelectedValueContext.Provider value={{ selectedValue: selectedIndex }}>
            {React.Children.map(children, (child, index) => (
              <IndexContext.Provider value={index}>{child}</IndexContext.Provider>
            ))}
          </SelectedValueContext.Provider>
        )}
      </Tab.Panels>
    );
  },
);

TabPanels.displayName = "TabPanels";

export default TabPanels;
