import React from 'react';

import { classNames, getColorVariantsFromColorThemeValue } from 'lib/classnameUtils';
import { defaultColors } from 'lib/colors';
import { fontSize } from 'lib/font';
import { sizing } from 'lib/sizing';
import { spacing } from 'lib/spacing';

export interface SelectBoxItemProps {
    value: any,
    text: string,
    icon?: React.ElementType,
    privateProps?: {
        handleSelectBoxItemClick: (selectedItem: any) => void
        isActive: boolean,
    }
}

const SelectBoxItem = ({
    value,
    text,
    icon,
    privateProps,
}: SelectBoxItemProps) => {
    const Icon = icon ? icon : null;
    return (
        <button
            onClick={() => privateProps!.handleSelectBoxItemClick(value)}
            className={classNames(
                'tr-flex tr-items-center tr-justify-between tr-w-full',
                spacing.twoXl.paddingLeft,
                spacing.twoXl.paddingRight,
                spacing.md.paddingTop,
                spacing.md.paddingBottom,
                fontSize.sm,
                privateProps!.isActive
                    ? classNames(
                        getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
                        getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor,
                    )
                    : classNames(
                        getColorVariantsFromColorThemeValue(defaultColors.lightBackground).hoverBgColor,
                        getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                    )
            )}
        >
            <div className="tr-flex tr-items-center tr-truncate">
                {Icon ? (
                    <Icon className={classNames(
                        'tr-flex-none',
                        sizing.lg.height,
                        sizing.lg.width,
                        spacing.lg.marginRight,
                        getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                    )} aria-hidden="true" />
                ) : null}
                <p className="tr-whitespace-nowrap tr-truncate">
                    {text}
                </p>
            </div>
        </button>
    );
};

export default SelectBoxItem;
