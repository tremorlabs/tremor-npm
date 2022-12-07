import React from 'react';

import { 
    classNames,
    defaultColors,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
} from 'lib';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface ListProps extends TremorBaseProps {
    children: React.ReactNode
}

const List = ({
    className = '',
    marginTop = 'mt-0',
    children
}: ListProps) => {
    return(
        <ul className={ classNames(
            'tremor-base list-element tr-w-full tr-overflow-hidden tr-divide-y',
            getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
            getColorVariantsFromColorThemeValue(defaultColors.lightBorder).divideColor,
            parseMarginTop(marginTop),
            className,
        ) }
        >
            { children }
        </ul>
    );
};

export default List;
