import React from 'react';

import {
    BaseColors,
    HorizontalPositions,
    Sizes,
    classNames,
    defaultColors,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    isValidSize,
    parseMarginTop,
    spacing
} from 'lib';
import { Color, HorizontalPosition, MarginTop, Size } from '../../../lib/inputTypes';
import { buttonProportions, iconSizes } from './styles';

export interface ButtonInlineProps {
    text: string,
    icon?: React.ElementType,
    iconPosition?: HorizontalPosition,
    size?: Size,
    color?: Color,
    handleClick?: { (): void },
    marginTop?: MarginTop,
}

const ButtonInline = ({
    text,
    icon,
    iconPosition = HorizontalPositions.Left,
    handleClick,
    size = Sizes.SM,
    color = BaseColors.Blue,
    marginTop = 'mt-0',
}: ButtonInlineProps) => {
    const buttonSize = isValidSize(size) ? size : Sizes.SM;
    const Icon = icon ? icon : null;
    return (
        <span className={classNames(parseMarginTop(marginTop))}>
            <button
                type="button"
                onClick={handleClick}
                className={classNames(
                    'tr-flex-shrink-0 tr-inline-flex tr-items-center tr-group tr-font-medium',
                    'focus:tr-outline-none focus:tr-ring-none',
                    buttonProportions[buttonSize].fontSize,
                    getColorVariantsFromColorThemeValue(getColorTheme(color).text).textColor,
                    getColorVariantsFromColorThemeValue(getColorTheme(color).darkText).hoverTextColor,
                    getColorVariantsFromColorThemeValue(defaultColors.transparent).bgColor,
                    getColorVariantsFromColorThemeValue(defaultColors.transparent).hoverBgColor,
                )}
            >
                {Icon && (iconPosition !== HorizontalPositions.Right) ? ( // ensures that icon is rendered if iconPosition is misspelled
                    <Icon
                        className={classNames(
                            spacing.twoXs.negativeMarginLeft,
                            spacing.xs.marginRight,
                            iconSizes[buttonSize].height,
                            iconSizes[buttonSize].width,
                        )}
                        aria-hidden="true"
                    />
                ) : null}
                <p className="tr-whitespace-nowrap">{text}</p>
                {Icon && (iconPosition === HorizontalPositions.Right) ? (
                    <Icon
                        className={classNames(
                            spacing.twoXs.negativeMarginRight,
                            spacing.xs.marginLeft,
                            iconSizes[buttonSize].height,
                            iconSizes[buttonSize].width,
                        )}
                        aria-hidden="true"
                    />
                ) : null}
            </button>
        </span>
    );
};

export default ButtonInline;
