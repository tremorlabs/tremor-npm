import React from 'react';

import {
    borderRadius,
    boxShadow,
    classNames,
    defaultColors,
    fontSize,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    sizing,
    spacing
} from 'lib';
import { Color } from '../../../lib';

export interface ToggleItemProps {
    value: any,
    text?: string,
    icon?: React.ElementType,
    privateProps?: {
        isActive: boolean,
        handleToggleItemClick: (value: any) => void,
        color: Color,
    }
}

const ToggleItem = ({
    value,
    text,
    icon,
    privateProps,
}: ToggleItemProps) => {
    const activeClassNames = classNames(
        getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
        getColorVariantsFromColorThemeValue(getColorTheme(privateProps!.color).text).textColor,
        getColorVariantsFromColorThemeValue(defaultColors.lightBorder).ringRolor,
        boxShadow.sm,
    );
    const inActiveClassNames = classNames(
        getColorVariantsFromColorThemeValue(defaultColors.transparent).bgColor,
        getColorVariantsFromColorThemeValue(defaultColors.darkText).hoverTextColor,
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        getColorVariantsFromColorThemeValue(defaultColors.transparent).ringRolor,
    );
    const Icon = icon ? icon : null;
    return (
        <button
            type="button"
            className={classNames(
                'input-elem tr-flex tr-items-center tr-ring-1',
                spacing.lg.paddingLeft,
                spacing.lg.paddingRight,
                spacing.xs.paddingTop,
                spacing.xs.paddingBottom,
                fontSize.sm,
                borderRadius.md.all,
                privateProps!.isActive ? activeClassNames : inActiveClassNames,
            )}
            onClick={() => { privateProps!.handleToggleItemClick!(value); }}
        >
            {
                Icon ? (
                    <Icon
                        className={classNames(
                            'tr-opacity-70',
                            text ? spacing.xs.marginRight : '',
                            sizing.lg.height,
                            sizing.lg.width,
                        )}
                        aria-hidden="true"
                    />
                ) : null
            }
            {
                text ? (
                    <span className="tr-whitespace-nowrap tr-truncate">
                        {text}
                    </span>
                ) : null
            }
        </button>
    );
};

export default ToggleItem;
