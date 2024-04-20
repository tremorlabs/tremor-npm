/// <reference types="react" />
import { Color, ValueFormatter } from "./inputTypes";
export declare const mapInputsToDeltaType: (deltaType: string, isIncreasePositive: boolean) => string;
export declare const defaultValueFormatter: ValueFormatter;
export declare const currencyValueFormatter: ValueFormatter;
export declare const sumNumericArray: (arr: number[]) => number;
export declare const isValueInArray: (value: any, array: any[]) => boolean;
export declare function mergeRefs<T = any>(refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>): React.RefCallback<T>;
export declare function makeClassName(componentName: string): (className: string) => string;
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
export declare function getColorClassNames(color: Color | string, shade?: number): ColorClassNames;
export {};
