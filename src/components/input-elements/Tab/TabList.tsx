import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColorContext } from "contexts";

import { BaseColors, border, getColorClassNames, makeClassName, spacing } from "lib";
import { Color } from "../../../lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { Tab } from "@headlessui/react";

const makeTabListClassName = makeClassName("TabList");

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: Color;
  children: React.ReactElement[] | React.ReactElement;
}

const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const { color = BaseColors.Blue, children, className, ...other } = props;

  return (
    <Tab.List
      ref={ref}
      className={twMerge(
        makeTabListClassName("root"),
        "flex justify-start overflow-x-clip",
        getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).borderColor,
        spacing.twoXl.spaceX,
        border.sm.bottom,
        className,
      )}
      {...other}
    >
      <BaseColorContext.Provider value={color}>{children}</BaseColorContext.Provider>
    </Tab.List>
  );
});

export default TabList;
