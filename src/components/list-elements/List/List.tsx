import React from 'react';

import { 
    classNames,
    defaultColors,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
} from 'lib';
import { MarginTop } from '../../../lib/inputTypes';

export interface ListProps {
    marginTop?: MarginTop,
    children: React.ReactNode
}

const List = ({
    marginTop = 'mt-0',
    children
}: ListProps) => {
    return(
        <ul className={ classNames(
            'tremor-base tr-w-full tr-overflow-hidden tr-divide-y',
            getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
            getColorVariantsFromColorThemeValue(defaultColors.lightBorder).divideColor,
            parseMarginTop(marginTop),
        ) }
        >
            { children }
        </ul>
    );
};

export default List;
