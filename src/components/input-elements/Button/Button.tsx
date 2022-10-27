import React from 'react';

import {
    BaseColors,
    HorizontalPositions,
    Importances,
    Sizes,
    border,
    borderRadius,
    boxShadow,
    classNames,
    fontWeight,
    isBaseColor,
    isValidImportance,
    isValidSize,
    parseMarginTop,
    spacing,
} from 'lib';
import { Color, HorizontalPosition, Importance, MarginTop, Size } from '../../../lib';
import {
    buttonProportions,
    colors,
    iconSizes,
} from './styles';

export interface ButtonProps {
    text: string,
    icon?: React.ElementType,
    iconPosition?: HorizontalPosition,
    size?: Size,
    color?: Color,
    importance?: Importance,
    handleClick?: { (): void },
    marginTop?: MarginTop,
    disabled?: boolean
}

const Button = ({
    text,
    icon,
    iconPosition = HorizontalPositions.Left,
    handleClick,
    size = Sizes.SM,
    color = BaseColors.Blue,
    importance = Importances.Primary,
    marginTop = 'mt-0',
    disabled = false
}: ButtonProps) => {
    const buttonColors = isBaseColor(color) ? colors[color] : colors[BaseColors.Blue];
    const buttonSize = isValidSize(size) ? size : Sizes.SM;
    const buttonImportance = isValidImportance(importance) ? importance : Importances.Primary;
    const Icon = icon ? icon : null;
    return (
        <div className={ classNames('tremor-base', parseMarginTop(marginTop)) }>
            <button
                type="button"
                onClick={ handleClick }
                className={ classNames(
                    'input-elem tr-flex-shrink-0 tr-inline-flex tr-items-center tr-group',
                    'focus:tr-outline-none focus:tr-ring-2 focus:tr-ring-offset-2 focus:tr-ring-transparent',
                    borderRadius.md.all,
                    border.sm.all,
                    boxShadow.sm,
                    fontWeight.md,
                    buttonProportions[buttonSize].paddingLeft,
                    buttonProportions[buttonSize].paddingRight,
                    buttonProportions[buttonSize].paddingTop,
                    buttonProportions[buttonSize].paddingBottom,
                    buttonProportions[buttonSize].fontSize,
                    buttonColors[buttonImportance].textColor,
                    buttonColors[buttonImportance].bgColor,
                    buttonColors[buttonImportance].borderColor,
                    !disabled ? classNames(
                        buttonColors[buttonImportance].focusRingColor,
                        buttonColors[buttonImportance].hoverBgColor,
                        buttonColors[buttonImportance].hoverBorderColor,
                    ) : 'tr-opacity-50',
                ) }
                disabled={ disabled }
            >
                { Icon && (iconPosition !== HorizontalPositions.Right) ? ( // ensures that icon is rendered if iconPosition is misspelled
                    <Icon
                        className={ classNames(
                            spacing.twoXs.negativeMarginLeft,
                            spacing.xs.marginRight,
                            iconSizes[buttonSize].height,
                            iconSizes[buttonSize].width,
                        ) }
                        aria-hidden="true"
                    />
                ) : null }
                <p className="text-elem tr-whitespace-nowrap">
                    { text }
                </p>
                { Icon && (iconPosition === HorizontalPositions.Right) ? (
                    <Icon
                        className={classNames(
                            spacing.twoXs.negativeMarginRight,
                            spacing.xs.marginLeft,
                            iconSizes[buttonSize].height,
                            iconSizes[buttonSize].width,
                        )}
                        aria-hidden="true"
                    />
                ) : null }
            </button>
        </div>
    );
};

export default Button;
