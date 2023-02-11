import React from "react";

import { DeltaTypes } from "./constants";
import { ValueFormatter } from "./inputTypes";

export const mapInputsToDeltaType = (deltaType: string, isIncreasePositive: boolean): string => {
  if (isIncreasePositive || deltaType === DeltaTypes.Unchanged) {
    return deltaType;
  }
  switch (deltaType) {
    case DeltaTypes.Increase:
      return DeltaTypes.Decrease;
    case DeltaTypes.ModerateIncrease:
      return DeltaTypes.ModerateDecrease;
    case DeltaTypes.Decrease:
      return DeltaTypes.Increase;
    case DeltaTypes.ModerateDecrease:
      return DeltaTypes.ModerateIncrease;
  }
  return "";
};

export const defaultValueFormatter: ValueFormatter = (value: number) => value.toString();

export const sumNumericArray = (arr: number[]) =>
  arr.reduce((prefixSum, num) => prefixSum + num, 0);

export const removeValueFromArray = (value: any, array: any[]): any[] => {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};

export const isValueInArray = (value: any, array: any[]): boolean => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
};

export const stringIsNumeric = (str: string | undefined): boolean => {
  return !isNaN(Number(str)) && str !== undefined;
};

export const stringEndsWithNumber = (str: string): boolean => {
  return stringIsNumeric(str.split("-").pop());
};

export interface SelectItemProps {
  value: any;
  text: string;
}

export const constructValueToNameMapping = <T,>(
  children: React.ReactElement[] | React.ReactElement,
): Map<T, string> => {
  const valueToNameMapping = new Map<T, string>();
  React.Children.map(children, (child: { props: SelectItemProps }) => {
    valueToNameMapping.set(child.props.value, child.props.text);
  });
  return valueToNameMapping;
};

export const getFilteredOptions = (
  searchQuery: string,
  options: SelectItemProps[],
): SelectItemProps[] => {
  return searchQuery === ""
    ? options
    : options.filter((option: SelectItemProps) => {
        return option.text.toLowerCase().includes(searchQuery.toLowerCase());
      });
};

export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export function makeClassName() {
  return (componentName: string) => {
    return (className: string) => {
      return `tremor-${componentName}-${className}`;
    };
  };
}
