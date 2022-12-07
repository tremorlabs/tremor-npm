import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import { Color, Height } from '../../../lib/inputTypes';
import { borderRadius, classNames, getColorTheme, getColorVariantsFromColorThemeValue, parseHeight } from 'lib';

export interface TrackingBlockProps {
    color: Color,
    height?: Height,
    tooltip?: string,
    className: string,
}

const TrackingBlock = ({
    color,
    height = 'h-10',
    tooltip,
    className = ''
}: TrackingBlockProps) => {
    return(
        <Tooltip content={ tooltip } className={ tooltip ? '' : 'tr-hidden' }>
            <div className={ classNames(
                'tr-w-full',
                getColorVariantsFromColorThemeValue(getColorTheme(color).background).bgColor,
                parseHeight(height),
                borderRadius.md.all,
                className,
            ) }
            />
        </Tooltip>
    );
};

export default TrackingBlock; 
