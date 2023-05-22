import React from "react";
import { tremorTwMerge } from "lib";

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
  return tremorTwMerge(
    isDisabled ? "bg-tremor-background-subtle" : "bg-tremor-background",
    !isDisabled && "hover:bg-tremor-background-muted",
    hasSelection ? "text-tremor-content-emphasis" : "text-tremor-content",
    isDisabled && "text-tremor-content-subtle",
    hasError && "text-rose-500",
    hasError ? "border-rose-500" : "border-tremor-border",
  );
};

export function hasValue<T>(value: T | null | undefined) {
  return value !== null && value !== undefined && value !== "";
}
