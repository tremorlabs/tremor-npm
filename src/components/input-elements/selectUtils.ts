import {
  BaseColors,
  DEFAULT_COLOR,
  WHITE,
  colorClassNames,
  colorPalette,
  getColorClassNames,
} from "lib";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface SelectItemProps {
  value: string;
  text?: string;
}

export function constructValueToNameMapping(children: React.ReactElement[] | React.ReactElement) {
  const valueToNameMapping = new Map<string, string>();
  React.Children.map(children, (child: { props: SelectItemProps }) => {
    valueToNameMapping.set(child.props.value, child.props.text ?? child.props.value);
  });
  return valueToNameMapping;
}

export function getFilteredOptions(
  searchQuery: string,
  options: SelectItemProps[],
): SelectItemProps[] {
  return searchQuery === ""
    ? options
    : options.filter((option: SelectItemProps) => {
        const optionText = option.text ?? option.value;
        return optionText.toLowerCase().includes(searchQuery.toLowerCase());
      });
}

export const getSelectButtonColors = (
  hasSelection: boolean,
  isDisabled: boolean,
  hasError = false,
) => {
  return twMerge(
    isDisabled
      ? getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).bgColor
      : getColorClassNames(WHITE, colorPalette.background).bgColor,
    !isDisabled && getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).hoverBgColor,
    hasSelection
      ? getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor
      : getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
    isDisabled && getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
    hasError && colorClassNames[BaseColors.Rose][colorPalette.text].textColor,
    hasError
      ? colorClassNames[BaseColors.Rose][colorPalette.ring].borderColor
      : getColorClassNames(DEFAULT_COLOR, colorPalette.ring).borderColor,
  );
};

export const hasValue = (value: string | null | undefined) =>
  value !== null && value !== undefined && value !== "";
