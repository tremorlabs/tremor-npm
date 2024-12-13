import { tremorTwMerge } from "lib";
import React from "react";

import { isValidElement, JSXElementConstructor } from "react";

interface SelectItemProps {
  value: string;
  children?: React.ReactNode;
}

type ValidElement = React.ReactElement<SelectItemProps, string | JSXElementConstructor<any>>;

function isSelectItemElement(node: unknown): node is ValidElement {
  if (!isValidElement(node)) return false;
  const props = node.props as Partial<SelectItemProps>;
  return typeof props.value === "string";
}

const getNodeText = (node: unknown): string | undefined => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return undefined;
};

function constructValueToNameMapping(children: React.ReactNode): Map<string, string> {
  const valueToNameMapping = new Map<string, string>();

  const validChildren = React.Children.toArray(children).filter((child): child is ValidElement =>
    isSelectItemElement(child),
  );

  validChildren.forEach((child) => {
    const value = child.props.value;
    const displayText = getNodeText(child) ?? value;
    valueToNameMapping.set(value, String(displayText));
  });

  return valueToNameMapping;
}

function getFilteredOptions(searchQuery: string, children: React.ReactNode): ValidElement[] {
  return React.Children.toArray(children).filter((child): child is ValidElement => {
    if (!isSelectItemElement(child)) {
      return false;
    }

    const optionText = String(getNodeText(child) ?? child.props.value);
    return optionText.toLowerCase().includes(searchQuery.toLowerCase());
  });
}

const getSelectButtonColors = (hasSelection: boolean, isDisabled: boolean, hasError = false) => {
  return tremorTwMerge(
    isDisabled ? "bg-tremor-background-subtle" : "bg-tremor-background-default",
    !isDisabled && "hover:bg-tremor-background-muted",
    hasSelection ? "text-tremor-content-emphasis" : "text-tremor-content-default",
    isDisabled && "text-tremor-content-subtle",
    hasError && "text-red-500 placeholder:text-red-500",
    hasError ? "border-red-500" : "border-tremor-border-default",
  );
};

function hasValue<T>(value: T | null | undefined) {
  return value !== null && value !== undefined && value !== "";
}

export {
  constructValueToNameMapping,
  getFilteredOptions,
  getNodeText,
  getSelectButtonColors,
  hasValue,
};
