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
import { Color, MarginTop } from '../../../lib';

export interface TitleProps {
    color?: Color,
    truncate?: boolean,
    marginTop?: MarginTop,
    children: React.ReactNode,
}

const Title = ({
    color = BaseColors.Gray,
    truncate = false,
    marginTop = 'mt-0',
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
        ) }
        >
            { children }
        </p>
    );
};

export default Title;
