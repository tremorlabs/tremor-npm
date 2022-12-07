import React from 'react';

import { AlignItems, JustifyContent, SpaceX } from '../../../lib/inputTypes';
import {
    classNames,
    parseAlignItems,
    parseJustifyContent,
    parseMarginTop,
    parseSpaceX,
    parseTruncateOption
} from 'lib';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface FlexProps extends TremorBaseProps {
    justifyContent?: JustifyContent,
    alignItems?: AlignItems,
    spaceX?: SpaceX | '',
    truncate?: boolean,
    children: React.ReactNode,
}

const Flex = ({
    justifyContent = 'justify-between',
    alignItems = 'items-center',
    spaceX = '',
    truncate = false,
    marginTop = 'mt-0',
    className = '',
    children
}: FlexProps) => {
    return(
        <div className={ classNames(
            'tr-flex tr-w-full',
            parseTruncateOption(truncate),
            truncate ? 'tr-whitespace-nowrap' : '',
            parseJustifyContent(justifyContent),
            parseAlignItems(alignItems),
            spaceX ? parseSpaceX(spaceX) : spaceX,
            parseMarginTop(marginTop),
            className,
        ) }
        >
            { children }
        </div>
    );
};

export default Flex;
