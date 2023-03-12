import React from "react";

import { DeltaTypes } from "./constants";
import { Color, ValueFormatter } from "./inputTypes";
import { colorClassNames } from "./colorClassNames";

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

export function makeClassName(componentName: string) {
  return (className: string) => {
    return `tremor-${componentName}-${className}`;
  };
}

export function getColorClassNames(
  color: Color | "white" | "black" | "transparent",
  shade?: number,
) {
  if (colorClassNames[color] === undefined) return colorClassNames["gray"][500];
  if (color === "white" || color === "black" || color === "transparent" || !shade) {
    return colorClassNames[color][500];
  }
  return colorClassNames[color][shade];
}
