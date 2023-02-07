import React from "react";
import clsx from "clsx";

import { BaseColorContext, SelectedValueContext } from "contexts";

import { useInternalState } from "hooks";

import {
  BaseColors,
  borderRadius,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  spacing,
} from "lib";
import { Color, MarginTop } from "../../../lib";

export interface ToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  color?: Color;
  marginTop?: MarginTop;
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
      className={clsx(
        "flex-nowrap inline-flex justify-start",
        getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
        spacing.twoXs.paddingLeft,
        spacing.twoXs.paddingRight,
        spacing.twoXs.paddingTop,
        spacing.twoXs.paddingBottom,
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
