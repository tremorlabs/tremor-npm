/// <reference types="react" />
export type BadgeProportionTypes = {
    paddingX: string;
    paddingY: string;
    fontSize: string;
};
export declare const badgeProportionsIconOnly: {
    [char: string]: BadgeProportionTypes;
};
export declare const badgeProportionsWithText: {
    [char: string]: BadgeProportionTypes;
};
export declare const iconSizes: {
    [size: string]: {
        height: string;
        width: string;
    };
};
export type ColorTypes = {
    bgColor: string;
    textColor: string;
    ringColor: string;
};
export declare const colors: {
    [key: string]: ColorTypes;
};
export declare const deltaIcons: {
    [key: string]: React.ElementType;
};
