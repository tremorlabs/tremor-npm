"use client";
import { TabPanels as HeadlessUiTabPanels } from "@headlessui/react";
import { IndexContext, SelectedValueContext } from "contexts";
import { tremorTwMerge } from "lib";
import React from "react";

const TabPanels = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <HeadlessUiTabPanels ref={ref} className={tremorTwMerge("w-full", className)} {...other}>
        {({ selectedIndex }) => (
          <SelectedValueContext.Provider value={{ selectedValue: selectedIndex }}>
            {React.Children.map(children, (child, index) => (
              <IndexContext.Provider value={index}>{child}</IndexContext.Provider>
            ))}
          </SelectedValueContext.Provider>
        )}
      </HeadlessUiTabPanels>
    );
  },
);

TabPanels.displayName = "TabPanels";

export default TabPanels;
