import React from 'react';

import { AlignItems, JustifyContent, MarginTop, SpaceX } from '../../../lib';
import {
    classNames,
    parseAlignItems,
    parseJustifyContent,
    parseMarginTop,
    parseSpaceX,
    parseTruncateOption
} from 'lib';

export interface FlexProps {
    justifyContent?: JustifyContent,
    alignItems?: AlignItems,
    spaceX?: SpaceX | '',
    truncate?: boolean,
    marginTop?: MarginTop,
    children: React.ReactNode,
}

const Flex = ({
    justifyContent = 'justify-between',
    alignItems = 'items-center',
    spaceX = '',
    truncate = false,
    marginTop = 'mt-0',
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
        ) }
        >
            { children }
        </div>
    );
};

export default Flex;
