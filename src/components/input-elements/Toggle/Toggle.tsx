import React from "react";

import { BaseColorContext, SelectedValueContext } from "contexts";

import { useInternalState } from "hooks";

import {
  BaseColors,
  borderRadius,
  classNames,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
  spacing,
} from "lib";
import { Color, MarginTop } from "../../../lib";

export interface ToggleProps<T> {
  defaultValue?: T;
  value?: T;
  onValueChange?: (value: T) => void;
  handleSelect?: (value: any) => void; // Deprecated
  color?: Color;
  marginTop?: MarginTop;
  children: React.ReactElement[] | React.ReactElement;
}

const Toggle = <T,>({
  defaultValue,
  value,
  onValueChange,
  handleSelect,
  color = BaseColors.Blue,
  marginTop = "mt-0",
  children,
}: ToggleProps<T>) => {
  if (handleSelect !== undefined) {
    console.warn(
      "DeprecationWarning: The `handleSelect` property is deprecated and will be removed \
            in the next major release. Please use `onValueChange` instead."
    );
  }

  const [selectedValue, setSelectedValue] = useInternalState(
    defaultValue,
    value
  );

  const handleValueChange = (value: T) => {
    onValueChange?.(value);
    handleSelect?.(value);
    setSelectedValue(value);
  };

  return (
    <div
      className={classNames(
        "tremor-base tr-flex-nowrap tr-inline-flex tr-justify-start",
        getColorVariantsFromColorThemeValue(defaultColors.lightBackground)
          .bgColor,
        parseMarginTop(marginTop),
        spacing.twoXs.paddingLeft,
        spacing.twoXs.paddingRight,
        spacing.twoXs.paddingTop,
        spacing.twoXs.paddingBottom,
        borderRadius.lg.all
      )}
    >
      <SelectedValueContext.Provider
        value={{ selectedValue, handleValueChange }}
      >
        <BaseColorContext.Provider value={color}>
          {React.Children.map(children, (child) => React.cloneElement(child))}
        </BaseColorContext.Provider>
      </SelectedValueContext.Provider>
    </div>
  );
};

export default Toggle;
