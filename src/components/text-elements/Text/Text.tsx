import React from 'react';

import { 
    BaseColors,
    TextAlignments,
    classNames,
    fontSize,
    fontWeight,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseHeight,
    parseMarginTop,
    parseTextAlignment,
    parseTruncateOption,
} from 'lib';
import { Color, Height, TextAlignment } from '../../../lib/inputTypes';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface TextProps extends TremorBaseProps {
    color?: Color,
    textAlignment?: TextAlignment,
    truncate?: boolean,
    height?: Height | '',
    children: React.ReactNode,
}

const Text = ({
    color = BaseColors.Gray,
    textAlignment = TextAlignments.Left,
    truncate = false,
    height = '',
    marginTop = 'mt-0',
    className = '',
    children
}: TextProps) => {
    return(
        <p className={classNames(
            'text-elem tremor-base',
            parseTruncateOption(truncate),
            truncate ? 'tr-whitespace-nowrap' : 'tr-shrink-0',
            height ? parseHeight(height) : height,
            height ? 'tr-overflow-y-auto' : '',
            parseMarginTop(marginTop),
            parseTextAlignment(textAlignment),
            getColorVariantsFromColorThemeValue(getColorTheme(color).text).textColor,
            fontSize.sm,
            fontWeight.sm,
            className,
        )}>
            { children }
        </p>
    );
};

export default Text;
