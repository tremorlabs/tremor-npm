import { DeltaTypes } from "./constants";
import { Color, ValueFormatter } from "./inputTypes";

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
  const newArray = [...array];
  if (index > -1) {
    newArray.splice(index, 1);
  }
  return newArray;
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

interface ColorClassNames {
  bgColor: string;
  hoverBgColor: string;
  selectBgColor: string;
  textColor: string;
  selectTextColor: string;
  hoverTextColor: string;
  borderColor: string;
  selectBorderColor: string;
  hoverBorderColor: string;
  ringColor: string;
}

export function getColorClassNames(
  color: Color | "white" | "black" | "transparent",
  shade?: number,
): ColorClassNames {
  if (color === "white" || color === "black" || color === "transparent" || !shade) {
    return {
      bgColor: `bg-${color}`,
      hoverBgColor: `hover:bg-${color}`,
      selectBgColor: `ui-select:bg-${color}`,
      textColor: `text-${color}`,
      selectTextColor: `ui-select:text-${color}`,
      hoverTextColor: `hover:text-${color}`,
      borderColor: `border-${color}`,
      selectBorderColor: `ui-select:border-${color}`,
      hoverBorderColor: `hover:border-${color}`,
      ringColor: `ring-${color}`,
    };
  }
  return {
    bgColor: `bg-${color}-${shade}`,
    selectBgColor: `ui-select:bg-${color}-${shade}`,
    hoverBgColor: `hover:bg-${color}-${shade}`,
    textColor: `text-${color}-${shade}`,
    selectTextColor: `ui-select:text-${color}-${shade}`,
    hoverTextColor: `hover:text-${color}-${shade}`,
    borderColor: `border-${color}-${shade}`,
    selectBorderColor: `ui-select:border-${color}-${shade}`,
    hoverBorderColor: `hover:border-${color}-${shade}`,
    ringColor: `ring-${color}-${shade}`,
  };
}
