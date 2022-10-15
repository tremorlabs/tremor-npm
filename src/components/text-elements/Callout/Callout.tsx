import React from 'react';

import {
    BaseColors,
    border,
    borderRadius,
    classNames,
    fontSize,
    fontWeight,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseHeight,
    parseMarginTop,
    sizing,
    spacing
} from 'lib';
import { Color, Height, MarginTop } from '../../../lib';

export interface CalloutProps {
    title: string,
    text: string,
    icon?: React.ElementType,
    color?: Color,
    height?: Height | '',
    marginTop?: MarginTop,
}

const Callout = ({
    title,
    text,
    icon,
    color = BaseColors.Blue,
    height = '',
    marginTop = 'mt-0'
}: CalloutProps) => {
    const Icon = icon ? icon : null;
    return (
        <div className={classNames(
            'tr-relative',
            parseMarginTop(marginTop),
            getColorVariantsFromColorThemeValue(getColorTheme(color).canvasBackground).bgColor,
            getColorVariantsFromColorThemeValue(getColorTheme(color).darkBorder).borderColor,
            spacing.lg.paddingLeft,
            spacing.lg.paddingRight,
            spacing.lg.paddingTop,
            spacing.lg.paddingBottom,
            fontSize.sm,
            borderRadius.md.all,
            border.lg.left,
        )}
        >
            <div className={classNames(
                'tr-overflow-hidden',
                spacing.xs.marginLeft,
            )}>
                <div className={classNames(
                    'tr-flex tr-items-start',
                    getColorVariantsFromColorThemeValue(getColorTheme(color).darkText).textColor,
                )}
                >
                    {Icon ? (
                        <Icon
                            className={classNames(
                                'tr-flex-none',
                                sizing.lg.height,
                                sizing.lg.width,
                                spacing.xs.marginRight,
                            )}
                            aria-hidden="true"
                        />
                    ) : null}
                    <h4 className={classNames(fontWeight.lg)}>{title}</h4>
                </div>
                <div className={classNames(
                    'tr-overflow-y-auto',
                    height ? parseHeight(height) : height,
                    getColorVariantsFromColorThemeValue(getColorTheme(color).darkText).textColor,
                    spacing.sm.marginTop,
                )}
                >
                    {text}
                </div>
            </div>
        </div>
    );
};

export default Callout;
