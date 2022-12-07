import React from 'react';

import {
    BaseColors,
    classNames,
    fontSize,
    fontWeight,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    parseTruncateOption
} from 'lib';
import { Color } from '../../../lib';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface SubtitleProps extends TremorBaseProps {
    color?: Color,
    truncate?: boolean,
    children: React.ReactNode,
}

const Subtitle = ({
    color = BaseColors.Gray,
    truncate = false,
    marginTop = 'mt-0',
    className = '',
    children
}: SubtitleProps) => {
    return(
        <p className={ classNames(
            'text-elem tremor-base',
            truncate ? 'tr-whitespace-nowrap' : 'tr-shrink-0',
            parseTruncateOption(truncate),
            parseMarginTop(marginTop),
            getColorVariantsFromColorThemeValue(getColorTheme(color).lightText).textColor,
            fontSize.md,
            fontWeight.sm,
            className,
        ) }
        >
            { children }
        </p>
    );
};

export default Subtitle;
