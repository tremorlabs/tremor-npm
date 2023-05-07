import React, { Fragment, useContext } from "react";
import { twMerge } from "tailwind-merge";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { fontSize } from "lib/font";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";
import { getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

import { Combobox } from "@headlessui/react";

const makeSelectBoxItemClassName = makeClassName("SelectBoxItem");

export interface SelectBoxItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  text?: string;
  icon?: React.ElementType;
}

const SelectBoxItem = React.forwardRef<HTMLLIElement, SelectBoxItemProps>((props, ref) => {
  const { value, text, icon, className, ...other } = props;
  const { selectedValue, handleValueChange } = useContext(SelectedValueContext);
  const { hoveredValue } = useContext(HoveredValueContext);
  const isActive = selectedValue === value;
  const isHovered = hoveredValue === value;
  const bgColor = isActive
    ? getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).bgColor
    : isHovered
    ? getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).bgColor
    : getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).hoverBgColor;
  const textColor = isActive
    ? getColorClassNames(DEFAULT_COLOR, colorPalette.darkestText).textColor
    : getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor;

  const Icon = icon;

  return (
    <Combobox.Option
      className={twMerge(makeSelectBoxItemClassName("root"), "ui-active:bg-active", className)}
      ref={ref}
      key={value}
      value={value}
      {...other}
    >
      {text ?? value}
    </Combobox.Option>
  );
});

export default SelectBoxItem;
