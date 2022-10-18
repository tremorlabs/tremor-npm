import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import {
    BaseColors,
    Sizes,
    borderRadius,
    classNames,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    isValidSize,
    parseMarginTop,
    spacing,
} from 'lib';
import { Color, MarginTop, Size } from '../../../lib';
import { badgeProportions, iconSizes } from './styles';

export interface BadgeProps {
    text: string,
    color?: Color,
    size?: Size,
    icon?: React.ElementType,
    tooltip?: string,
    marginTop?: MarginTop,
}

const Badge = ({
    text,
    color = BaseColors.Blue,
    icon,
    size = Sizes.SM,
    tooltip,
    marginTop = 'mt-0',
}: BadgeProps) => {
    const badgeSize = isValidSize(size) ? size : Sizes.SM;
    const Icon = icon ? icon : null;
    return (
        <div className={classNames('tremor-base', parseMarginTop(marginTop))}>
            <Tooltip content={tooltip} className={tooltip ? '' : 'tr-hidden'}>
                <span className={classNames(
                    'tr-flex-shrink-0 tr-inline-flex tr-justify-center tr-items-center',
                    getColorVariantsFromColorThemeValue(getColorTheme(color).text).textColor,
                    getColorVariantsFromColorThemeValue(getColorTheme(color).lightBackground).bgColor,
                    borderRadius.full.all,
                    badgeProportions[badgeSize].paddingLeft,
                    badgeProportions[badgeSize].paddingRight,
                    badgeProportions[badgeSize].paddingTop,
                    badgeProportions[badgeSize].paddingBottom,
                    badgeProportions[badgeSize].fontSize,
                )}>
                    {Icon ? (
                        <Icon className={classNames(
                            spacing.twoXs.negativeMarginLeft,
                            spacing.xs.marginRight,
                            iconSizes[badgeSize].height,
                            iconSizes[badgeSize].width,
                        )}
                        />
                    ) : null}
                    <p className="text-elem tr-whitespace-nowrap">{text}</p>
                </span>
            </Tooltip>
        </div>
    );
};

export default Badge;
