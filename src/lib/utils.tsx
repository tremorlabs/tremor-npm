import { DeltaTypes } from "./constants";
import { Color, getIsBaseColor, ValueFormatter } from "./inputTypes";

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

/**
 * Returns boolean based on a determination that a color should be considered an "arbitrary"
 * Tailwind CSS class.
 * @see {@link https://tailwindcss.com/docs/background-color#arbitrary-values | Tailwind CSS docs}
 */
const getIsArbitraryColor = (color: Color | string) =>
  color.includes("#") || color.includes("--") || color.includes("rgb");

export function getColorClassNames(color: Color | string, shade?: number): ColorClassNames {
  const isBaseColor = getIsBaseColor(color);
  if (color === "white" || color === "black" || color === "transparent" || !shade || !isBaseColor) {
    const unshadedColor = !getIsArbitraryColor(color) ? color : `[${color}]`;
    return {
      bgColor: `bg-${unshadedColor} dark:bg-${unshadedColor}`,
      hoverBgColor: `hover:bg-${unshadedColor} dark:hover:bg-${unshadedColor}`,
      selectBgColor: `ui-selected:bg-${unshadedColor} dark:ui-selected:bg-${unshadedColor}`,
      textColor: `text-${unshadedColor} dark:text-${unshadedColor}`,
      selectTextColor: `ui-selected:text-${unshadedColor} dark:ui-selected:text-${unshadedColor}`,
      hoverTextColor: `hover:text-${unshadedColor} dark:hover:text-${unshadedColor}`,
      borderColor: `border-${unshadedColor} dark:border-${unshadedColor}`,
      selectBorderColor: `ui-selected:border-${unshadedColor} dark:ui-selected:border-${unshadedColor}`,
      hoverBorderColor: `hover:border-${unshadedColor} dark:hover:border-${unshadedColor}`,
      ringColor: `ring-${unshadedColor} dark:ring-${unshadedColor}`,
      strokeColor: `stroke-${unshadedColor} dark:stroke-${unshadedColor}`,
      fillColor: `fill-${unshadedColor} dark:fill-${unshadedColor}`,
    };
  }
  return {
    bgColor: `bg-${color}-${shade} dark:bg-${color}-${shade}`,
    selectBgColor: `ui-selected:bg-${color}-${shade} dark:ui-selected:bg-${color}-${shade}`,
    hoverBgColor: `hover:bg-${color}-${shade} dark:hover:bg-${color}-${shade}`,
    textColor: `text-${color}-${shade} dark:text-${color}-${shade}`,
    selectTextColor: `ui-selected:text-${color}-${shade} dark:ui-selected:text-${color}-${shade}`,
    hoverTextColor: `hover:text-${color}-${shade} dark:hover:text-${color}-${shade}`,
    borderColor: `border-${color}-${shade} dark:border-${color}-${shade}`,
    selectBorderColor: `ui-selected:border-${color}-${shade} dark:ui-selected:border-${color}-${shade}`,
    hoverBorderColor: `hover:border-${color}-${shade} dark:hover:border-${color}-${shade}`,
    ringColor: `ring-${color}-${shade} dark:ring-${color}-${shade}`,
    strokeColor: `stroke-${color}-${shade} dark:stroke-${color}-${shade}`,
    fillColor: `fill-${color}-${shade} dark:fill-${color}-${shade}`,
  };
}
