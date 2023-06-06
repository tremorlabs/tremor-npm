"use client";
import React, { useContext } from "react";
import { tremorTwMerge } from "lib";
import { makeClassName } from "lib";
import { IndexContext, SelectedValueContext } from "contexts";

const makeTabPanelClassName = makeClassName("TabPanel");

const TabPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    const { selectedValue: selectedIndex } = useContext(SelectedValueContext);
    const index = useContext(IndexContext);

    const isSelected = selectedIndex === index;

    return (
      // Not using Tab.Panel because of https://github.com/tailwindlabs/headlessui/discussions/2366.
      <div
        ref={ref}
        className={tremorTwMerge(
          makeTabPanelClassName("root"),
          "w-full mt-2",
          isSelected ? "" : "hidden",
          className,
        )}
        aria-selected={isSelected ? "true" : "false"}
        {...other}
      >
        {children}
      </div>
    );
  },
);

TabPanel.displayName = "TabPanel";

export default TabPanel;
