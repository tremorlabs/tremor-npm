import { Color, IconVariant } from "lib";
export type WrapperProportionTypes = {
    paddingX: string;
    paddingY: string;
};
export declare const wrapperProportions: {
    [size: string]: WrapperProportionTypes;
};
export declare const iconSizes: {
    [size: string]: {
        height: string;
        width: string;
    };
};
export type ShapeTypes = {
    rounded: string;
    border: string;
    ring: string;
    shadow: string;
};
export declare const shape: {
    [style: string]: ShapeTypes;
};
export declare const getIconColors: (variant: IconVariant, color?: Color) => {
    textColor: string;
    bgColor: string;
    borderColor: string;
    ringColor: string;
};
