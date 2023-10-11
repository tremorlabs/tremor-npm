"use client";
import { Tab } from "@headlessui/react";
import { IndexContext, SelectedValueContext } from "contexts";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

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
