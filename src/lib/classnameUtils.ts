import { ColorTypes, colorVariantMapping } from './colorVariantMapping';
import {
    Height,
    MarginTop,
    Width
} from './inputTypes';
import { twColorsHex } from 'lib/colors';

interface StringJoiner {
    (...classes: (string)[]): string
}

export const classNames: StringJoiner = (
    ...classes: string[]
): string => {
    return classes.filter(Boolean).join(' ');
};

export const getPixelsFromTwClassName = (
    twClassName: MarginTop | Height | Width
): number => {
    const classNameParts = twClassName.split('-');
    return Number(classNameParts[classNameParts.length - 1]) * 4;
};

export const getColorVariantsFromColorThemeValue = (colorThemeValue: string): ColorTypes => {
    const colorThemeValueParts = colorThemeValue.split('-');
    const baseColor = colorThemeValueParts[0];
    const colorValue = colorThemeValueParts[1];
    const colorVariants = colorVariantMapping[baseColor][colorValue];
    return colorVariants;
};

export const getHexFromColorThemeValue = (colorThemeValue: string): string => {
    const colorThemeValueParts = colorThemeValue.split('-');
    if (!colorThemeValue || colorThemeValueParts.length != 2) return '';
    const baseColor = colorThemeValueParts[0];
    // Currently only 500 is supported
    const hexValue = twColorsHex[baseColor][500];
    return hexValue;
};

interface BoolClassParser {
    (twClassName: boolean): string
}

export const parseTruncateOption: BoolClassParser = (option) => {
    return option===true ? 'tr-truncate' : '';
};

export const parseHFullOption: BoolClassParser = (option) => {
    return option===true ? 'tr-h-full' : '';
};

export const parseWFullOption: BoolClassParser = (option) => {
    return option===true ? 'tr-w-full' : '';
};
