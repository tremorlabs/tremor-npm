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

export interface TitleProps extends TremorBaseProps{
    color?: Color,
    truncate?: boolean,
    children: React.ReactNode,
}

const Title = ({
    color = BaseColors.Gray,
    truncate = false,
    marginTop = 'mt-0',
    className = '',
    children
}: TitleProps) => {
    return(
        <p className={ classNames(
            'text-elem tremor-base',
            truncate ? 'tr-whitespace-nowrap' : 'tr-shrink-0',
            parseTruncateOption(truncate),
            parseMarginTop(marginTop),
            getColorVariantsFromColorThemeValue(getColorTheme(color).darkText).textColor,
            fontSize.lg,
            fontWeight.md,
            className,
        ) }
        >
            { children }
        </p>
    );
};

export default Title;
