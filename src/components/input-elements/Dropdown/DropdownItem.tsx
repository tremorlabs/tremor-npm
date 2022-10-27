import React from 'react';

import {
    classNames,
    getColorVariantsFromColorThemeValue,
} from 'lib/classnameUtils';
import { defaultColors } from 'lib/colors';
import { fontSize } from 'lib/font';
import { sizing } from 'lib/sizing';
import { spacing } from 'lib/spacing';

export interface DropdownItemProps {
    value: any;
    text: string;
    icon?: React.ElementType;
    privateProps?: {
        isActive: boolean;
        handleDropdownItemClick: (value: any) => void;
    };
}

const DropdownItem = ({
    value,
    text,
    icon,
    privateProps,
}: DropdownItemProps) => {
    const Icon = icon ? icon : null;
    return (
        <button
            type="button"
            onClick={() => privateProps!.handleDropdownItemClick(value)}
            className={classNames(
                'input-elem tr-flex tr-items-center tr-justify-between tr-w-full',
                spacing.twoXl.paddingLeft,
                spacing.twoXl.paddingRight,
                spacing.md.paddingTop,
                spacing.md.paddingBottom,
                fontSize.sm,
                privateProps!.isActive
                    ? classNames(
                        getColorVariantsFromColorThemeValue(defaultColors.lightBackground)
                            .bgColor,
                        getColorVariantsFromColorThemeValue(defaultColors.darkestText)
                            .textColor
                    )
                    : classNames(
                        getColorVariantsFromColorThemeValue(defaultColors.lightBackground)
                            .hoverBgColor,
                        getColorVariantsFromColorThemeValue(defaultColors.darkText)
                            .textColor
                    )
            )}
        >
            <div className="tr-flex tr-items-center tr-truncate">
                {Icon ? (
                    <Icon
                        className={classNames(
                            'tr-flex-none',
                            sizing.lg.height,
                            sizing.lg.width,
                            spacing.lg.marginRight,
                            getColorVariantsFromColorThemeValue(defaultColors.lightText)
                                .textColor
                        )}
                        aria-hidden="true"
                    />
                ) : null}
                <p className="text-elem tr-whitespace-nowrap tr-truncate">{text}</p>
            </div>
        </button>
    );
};

export default DropdownItem;
