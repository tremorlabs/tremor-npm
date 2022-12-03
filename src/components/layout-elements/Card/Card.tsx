import React from 'react';

import { BaseColors, HorizontalPositions, VerticalPositions } from 'lib/primitives';
import { Color, HorizontalPosition, MarginTop, MaxWidth, VerticalPosition } from '../../../lib';
import {
    border,
    borderRadius,
    boxShadow,
    classNames,
    defaultColors,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseHFullOption,
    parseMarginTop,
    parseMaxWidth,
    spacing,
} from 'lib';

const parseDecorationAlignment = (decorationAlignment: string) => {
    if (!decorationAlignment) return '';
    switch(decorationAlignment) {
    case HorizontalPositions.Left:
        return border.lg.left;
    case VerticalPositions.Top:
        return border.lg.top;
    case HorizontalPositions.Right:
        return border.lg.right;
    case VerticalPositions.Bottom:
        return border.lg.bottom;
    default:
        return '';
    }
};

export interface CardProps {
    hFull?: boolean,
    maxWidth?: MaxWidth,
    shadow?: boolean,
    decoration?: HorizontalPosition | VerticalPosition | '',
    decorationColor?: Color,
    marginTop?: MarginTop,
    children: React.ReactNode
}

const Card = ({
    hFull = false,
    maxWidth = 'max-w-none',
    shadow = true,
    decoration = '',
    decorationColor = BaseColors.Blue,
    marginTop = 'mt-0',
    children
}: CardProps) => {
    return(
        <div className={ classNames(
            'tremor-base tr-relative tr-w-full tr-mx-auto tr-text-left tr-ring-1',
            parseMarginTop(marginTop),
            parseHFullOption(hFull),
            parseMaxWidth(maxWidth),
            getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
            shadow ? boxShadow.md : '',
            getColorVariantsFromColorThemeValue(getColorTheme(decorationColor).border).borderColor,
            getColorVariantsFromColorThemeValue(defaultColors.lightBorder).ringColor,
            parseDecorationAlignment(decoration),
            spacing.threeXl.paddingLeft,
            spacing.threeXl.paddingRight,
            spacing.threeXl.paddingTop,
            spacing.threeXl.paddingBottom,
            borderRadius.lg.all,
        ) }
        >
            { children }
        </div>
    );
};

export default Card;
