import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import { DeltaType, DeltaTypes, Size } from '../../../lib';
import {
    Sizes,
    borderRadius,
    classNames,
    isValidDeltaType,
    isValidSize,
    mapInputsToDeltaType,
    parseMarginTop,
    spacing
} from 'lib';
import {
    badgeProportionsIconOnly,
    badgeProportionsWithText,
    colors,
    deltaIcons,
    iconSizes,
} from './styles';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface BadgeDeltaProps extends TremorBaseProps {
    text?: string,
    deltaType?: DeltaType,
    isIncreasePositive?: boolean,
    size?: Size,
    tooltip?: string,
}

const BadgeDelta = ({
    text,
    deltaType = DeltaTypes.Increase,
    isIncreasePositive = true,
    size = Sizes.SM,
    tooltip,
    marginTop = 'mt-0',
    className = '',
}: BadgeDeltaProps) => {
    const parsedDeltaType = isValidDeltaType(deltaType) ? deltaType : DeltaTypes.Increase;
    const Icon = deltaIcons[parsedDeltaType];
    const mappedDeltaType = mapInputsToDeltaType(parsedDeltaType, isIncreasePositive);
    const badgeProportions = text ? badgeProportionsWithText : badgeProportionsIconOnly;
    const badgeSize = isValidSize(size) ? size : Sizes.SM;

    return(
        <span className={ classNames('tremor-base', parseMarginTop(marginTop), className) }>
            <Tooltip content={ tooltip } className={ classNames( tooltip ? '' : 'tr-hidden') }>
                <span className={ classNames(
                    'tr-flex-shrink-0 tr-inline-flex tr-justify-center tr-items-center',
                    borderRadius.full.all,
                    colors[mappedDeltaType].bgColor,
                    colors[mappedDeltaType].textColor,
                    badgeProportions[badgeSize].paddingLeft,
                    badgeProportions[badgeSize].paddingRight,
                    badgeProportions[badgeSize].paddingTop,
                    badgeProportions[badgeSize].paddingBottom,
                    badgeProportions[badgeSize].fontSize,
                ) }>
                    <Icon className={ classNames(
                        text ? spacing.twoXs.negativeMarginLeft : '',
                        text ? spacing.xs.marginRight : '',
                        iconSizes[badgeSize].height,
                        iconSizes[badgeSize].width,
                    ) }
                    />
                    { text ? <p className="text-elem tr-whitespace-nowrap">{ text }</p> : null}
                </span>
            </Tooltip>
        </span>
    );
};

export default BadgeDelta;
