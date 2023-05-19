"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { BaseColorContext, SelectedValueContext } from "contexts";

import { useInternalState } from "hooks";

import { makeClassName, spacing } from "lib";
import { Color } from "../../../lib";

const makeToggleClassName = makeClassName("Toggle");

export interface ToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  color?: Color;
  children: React.ReactElement[] | React.ReactElement;
}

const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>((props, ref) => {
  const { defaultValue, value, onValueChange, color, children, className, ...other } = props;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

  const handleValueChange = (value: string) => {
    onValueChange?.(value);
    setSelectedValue(value);
  };

  return (
    <div
      ref={ref}
      className={tremorTwMerge(
        makeToggleClassName("root"),
        "flex-nowrap inline-flex justify-start rounded-tremor-default bg-tremor-background-subtle",
        spacing.twoXs.paddingAll,
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
}); // @achi type error line 44

export default Toggle;
