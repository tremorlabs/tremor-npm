"use client";
import { IndexContext, SelectedValueContext } from "contexts";
import { tremorTwMerge } from "lib";
import React, { useContext } from "react";

const TabPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    const { selectedValue: selectedIndex } = useContext(SelectedValueContext);
    const index = useContext(IndexContext);

    const isSelected = selectedIndex === index;

    return (
      <div
        ref={ref}
        className={tremorTwMerge("mt-2 w-full", isSelected ? "" : "hidden", className)}
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
