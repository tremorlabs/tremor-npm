import React from 'react';

import {
    BaseColors,
    border,
    borderRadius,
    classNames,
    defaultColors,
    fontSize,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    spacing
} from 'lib';

export interface MultiSelectBoxItemProps {
    value: any,
    text: string,
    privateProps?: {
        handleMultiSelectBoxItemClick: (value: any) => void,
        isActive: boolean,
    },
}

const MultiSelectBoxItem = ({
    value,
    text,
    privateProps,
}: MultiSelectBoxItemProps) => (
    <button
        onClick={ () => privateProps!.handleMultiSelectBoxItemClick(value) }
        className={ classNames(
            'input-elem tr-flex tr-items-center tr-justify-between tr-w-full',
            spacing.twoXl.paddingLeft,
            spacing.twoXl.paddingRight,
            spacing.md.paddingTop,
            spacing.md.paddingBottom,
            fontSize.sm,
            getColorVariantsFromColorThemeValue(defaultColors.lightBackground).hoverBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
        ) }
    >
        <div className="tr-flex tr-items-center tr-truncate">
            <input
                type="checkbox"
                className={ classNames(
                    'input-elem tr-flex-none focus:tr-ring-none focus:tr-outline-none tr-cursor-pointer',
                    getColorVariantsFromColorThemeValue(defaultColors.lightRing).focusRingColor,
                    getColorVariantsFromColorThemeValue(getColorTheme(BaseColors.Blue).text).textColor,
                    getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                    spacing.lg.marginRight,
                    borderRadius.sm.all,
                    border.sm.all,
                ) }
                checked={ privateProps!.isActive }
                readOnly={ true }
            />
            <p className="text-elem tr-whitespace-nowrap tr-truncate">{ text }</p>
        </div>
    </button>
);

export default MultiSelectBoxItem;
