import { tremorTwMerge } from "lib";
import React from "react";

export interface SelectItemProps {
  value: string;
  children?: React.ReactNode;
}

export const getNodeText = (node: React.ReactElement): string | React.ReactElement | undefined => {
  if (["string", "number"].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join("");
  if (typeof node === "object" && node) return getNodeText(node.props.children);
};

export function constructValueToNameMapping(children: React.ReactElement[] | React.ReactElement) {
  const valueToNameMapping = new Map<string, string>();
  React.Children.map(children, (child: React.ReactElement<SelectItemProps>) => {
    valueToNameMapping.set(child.props.value, (getNodeText(child) ?? child.props.value) as string);
  });
  return valueToNameMapping;
}

export function getFilteredOptions(
  searchQuery: string,
  children: React.ReactElement[],
): React.ReactElement[] {
  return React.Children.map(children, (child) => {
    const optionText = (getNodeText(child) ?? child.props.value) as string;
    if (optionText.toLowerCase().includes(searchQuery.toLowerCase())) return child;
  });
}

export const getSelectButtonColors = (
  hasSelection: boolean,
  isDisabled: boolean,
  hasError = false,
) => {
  return tremorTwMerge(
    isDisabled
      ? "bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle"
      : "bg-tremor-background dark:bg-dark-tremor-background",
    !isDisabled && "hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted",
    hasSelection
      ? "text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis"
      : "text-tremor-content dark:text-dark-tremor-content",
    isDisabled && "text-tremor-content-subtle dark:text-dark-tremor-content-subtle",
    hasError && "text-rose-500",
    hasError ? "border-rose-500" : "border-tremor-border dark:border-dark-tremor-border",
  );
};

export function hasValue<T>(value: T | null | undefined) {
  return value !== null && value !== undefined && value !== "";
}
