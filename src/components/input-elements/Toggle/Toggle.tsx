"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColorContext, SelectedValueContext } from "contexts";

import { useInternalState } from "hooks";

import { BaseColors, borderRadius, getColorClassNames, makeClassName, spacing } from "lib";
import { Color } from "../../../lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeToggleClassName = makeClassName("Toggle");

export interface ToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  color?: Color;
  children: React.ReactElement[] | React.ReactElement;
}

const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>((props, ref) => {
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
      className={twMerge(
        makeToggleClassName("root"),
        "flex-nowrap inline-flex justify-start",
        getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).bgColor,
        spacing.twoXs.paddingAll,
        borderRadius.lg.all,
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

export default Toggle;
