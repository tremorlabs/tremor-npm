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

export const currencyValueFormatter: ValueFormatter = (e: number) =>
  `$ ${Intl.NumberFormat("en-US").format(e)}`;

export const sumNumericArray = (arr: number[]) =>
  arr.reduce((prefixSum, num) => prefixSum + num, 0);

export const isValueInArray = (value: any, array: any[]): boolean => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
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
  strokeColor: string;
  fillColor: string;
}

export function getColorClassNames(
  color: Color | "white" | "black" | "transparent",
  shade?: number,
  customColor?: string,
): ColorClassNames {
  if (
    color === "white" ||
    color === "black" ||
    color === "transparent" ||
    !!customColor ||
    !shade
  ) {
    const unshadedColor = !customColor
      ? color
      : customColor.includes("#")
      ? `[${customColor}]`
      : customColor;
    return {
      bgColor: `bg-${unshadedColor}`,
      hoverBgColor: `hover:bg-${unshadedColor}`,
      selectBgColor: `ui-selected:bg-${unshadedColor}`,
      textColor: `text-${unshadedColor}`,
      selectTextColor: `ui-selected:text-${unshadedColor}`,
      hoverTextColor: `hover:text-${unshadedColor}`,
      borderColor: `border-${unshadedColor}`,
      selectBorderColor: `ui-selected:border-${unshadedColor}`,
      hoverBorderColor: `hover:border-${unshadedColor}`,
      ringColor: `ring-${unshadedColor}`,
      strokeColor: `stroke-${unshadedColor}`,
      fillColor: `fill-${unshadedColor}`,
    };
  }
  return {
    bgColor: `bg-${color}-${shade}`,
    selectBgColor: `ui-selected:bg-${color}-${shade}`,
    hoverBgColor: `hover:bg-${color}-${shade}`,
    textColor: `text-${color}-${shade}`,
    selectTextColor: `ui-selected:text-${color}-${shade}`,
    hoverTextColor: `hover:text-${color}-${shade}`,
    borderColor: `border-${color}-${shade}`,
    selectBorderColor: `ui-selected:border-${color}-${shade}`,
    hoverBorderColor: `hover:border-${color}-${shade}`,
    ringColor: `ring-${color}-${shade}`,
    strokeColor: `stroke-${color}-${shade}`,
    fillColor: `fill-${color}-${shade}`,
  };
}
