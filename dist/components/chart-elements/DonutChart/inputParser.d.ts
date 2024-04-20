import { Color, ValueFormatter } from "../../../lib/inputTypes";
export declare const parseData: (data: any[], colors: (Color | string)[]) => any[];
export declare const parseLabelInput: (labelInput: string | undefined, valueFormatter: ValueFormatter, data: any[], category: string) => string;
