import { ButtonVariant, Color } from "lib";
export declare const iconSizes: {
    [size: string]: {
        height: string;
        width: string;
    };
};
export declare const getButtonProportions: (variant: ButtonVariant) => {
    xs: {
        paddingX: string;
        paddingY: string;
        fontSize: string;
    };
    sm: {
        paddingX: string;
        paddingY: string;
        fontSize: string;
    };
    md: {
        paddingX: string;
        paddingY: string;
        fontSize: string;
    };
    lg: {
        paddingX: string;
        paddingY: string;
        fontSize: string;
    };
    xl: {
        paddingX: string;
        paddingY: string;
        fontSize: string;
    };
};
export declare const getButtonColors: (variant: ButtonVariant, color?: Color) => {
    textColor: string;
    hoverTextColor: string;
    bgColor: string;
    hoverBgColor: string;
    borderColor: string;
    hoverBorderColor: string;
} | {
    textColor: string;
    hoverTextColor: string;
    bgColor: string;
    hoverBgColor: string;
    borderColor: string;
    hoverBorderColor?: undefined;
} | {
    textColor: string;
    hoverTextColor: string;
    bgColor: string;
    borderColor: string;
    hoverBorderColor: string;
    hoverBgColor?: undefined;
};
