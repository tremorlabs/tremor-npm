import React from 'react';

import { MaxWidth, SpaceY, TextAlignment } from '../../../lib/inputTypes';
import {
    TextAlignments,
    classNames,
    parseMarginTop,
    parseMaxWidth,
    parseSpaceY,
    parseTextAlignment,
    parseTruncateOption
} from 'lib';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface BlockProps extends TremorBaseProps {
    maxWidth?: MaxWidth
    spaceY?: SpaceY | '',
    textAlignment?: TextAlignment,
    truncate?: boolean,
    children: React.ReactNode,
}

const Block = ({
    maxWidth = 'max-w-none',
    spaceY = '',
    textAlignment = TextAlignments.Left,
    truncate = false,
    marginTop = 'mt-0',
    className = '',
    children
}: BlockProps) => {
    return(
        <div className={ classNames(
            'tr-w-full',
            parseMaxWidth(maxWidth),
            spaceY ? parseSpaceY(spaceY) : spaceY,
            parseTextAlignment(textAlignment),
            parseTruncateOption(truncate),
            truncate ? 'tr-whitespace-nowrap' : '',
            parseMarginTop(marginTop),
            className,
        ) }
        >
            { children }
        </div>
    );
};

export default Block;
