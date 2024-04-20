import { Color } from "../../../lib/inputTypes";
export declare const constructCategoryColors: (categories: string[], colors: (Color | string)[]) => Map<string, Color | string>;
export declare const getYAxisDomain: (autoMinValue: boolean, minValue: number | undefined, maxValue: number | undefined) => (string | number)[];
export declare const constructCategories: (data: any[], color?: string) => string[];
export declare function deepEqual(obj1: any, obj2: any): boolean;
export declare function hasOnlyOneValueForThisKey(array: any[], keyToCheck: string): boolean;
