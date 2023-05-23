"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColorContext, SelectedValueContext } from "contexts";

import { useInternalState } from "hooks";

import { BaseColors, border, getColorClassNames, makeClassName, spacing } from "lib";
import { Color } from "../../../lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeTabListClassName = makeClassName("TabList");

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  color?: Color;
  children: React.ReactElement[] | React.ReactElement;
}

const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    color = BaseColors.Blue,
    children,
    className,
    ...other
  } = props;
  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

  const handleValueChange = (value: string) => {
    onValueChange?.(value);
    setSelectedValue(value);
  };

  return (
    <div
      ref={ref}
      aria-label="Tabs"
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
      <SelectedValueContext.Provider value={{ selectedValue, handleValueChange }}>
        <BaseColorContext.Provider value={color}>
          {React.Children.map(children, (child) => React.cloneElement(child))}
        </BaseColorContext.Provider>
      </SelectedValueContext.Provider>
    </div>
  );
});

TabList.displayName = "TabList";

export default TabList;
