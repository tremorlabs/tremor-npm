import React from 'react';

import { Transition } from 'react-transition-group';

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
} from 'lib';
import { ButtonIconOrSpinner, ButtonType } from '../Button/Button';
import { Color, HorizontalPosition, Size } from '../../../lib/inputTypes';
import { buttonProportions, iconSizes } from './styles';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface ButtonInlineProps extends TremorBaseProps {
    type?: ButtonType,
    text: string,
    icon?: React.ElementType,
    iconPosition?: HorizontalPosition,
    size?: Size,
    color?: Color,
    handleClick?: { (): void },
    disabled?: boolean,
    loading?: boolean,
    loadingText?: string,
}

const ButtonInline = ({
    type = 'button',
    text,
    icon,
    iconPosition = HorizontalPositions.Left,
    handleClick,
    size = Sizes.SM,
    color = BaseColors.Blue,
    disabled = false,
    loading = false,
    loadingText,
    marginTop = 'mt-0',
    className = '',
}: ButtonInlineProps) => {
    const Icon = icon;

    const isDisabled = loading || disabled;
    const showButtonIconOrSpinner = (Icon !== undefined) || loading;
    const showLoadingText = loading && loadingText;

    const buttonSize = isValidSize(size) ? size : Sizes.SM;
    const iconSize = classNames(
        iconSizes[buttonSize].height,
        iconSizes[buttonSize].width,
    );

    return (
        <Transition in={loading} timeout={50}>
            { state => (
                <div className={ classNames(
                    'tremor-base tr-flex tr-items-center',
                    parseMarginTop(marginTop),
                    className,
                ) }>
                    <button
                        type={ type }
                        onClick={handleClick}
                        className={classNames(
                            'input-elem tr-flex-shrink-0 tr-inline-flex tr-items-center tr-group tr-font-medium',
                            'focus:tr-outline-none focus:tr-ring-none',
                            buttonProportions[buttonSize].fontSize,
                            getColorVariantsFromColorThemeValue(getColorTheme(color).text).textColor,
                            getColorVariantsFromColorThemeValue(defaultColors.transparent).bgColor,
                            getColorVariantsFromColorThemeValue(defaultColors.transparent).hoverBgColor,
                            !isDisabled ? classNames(
                                getColorVariantsFromColorThemeValue(getColorTheme(color).darkText).hoverTextColor,
                            ) : 'tr-opacity-50',
                        )}
                        disabled={ isDisabled }
                    >
                        {
                            showButtonIconOrSpinner && (iconPosition !== HorizontalPositions.Right) ? (
                                <ButtonIconOrSpinner
                                    loading={ loading }
                                    iconSize={ iconSize }
                                    iconPosition={ iconPosition }
                                    Icon={ Icon }
                                    transitionState={ state }
                                />
                            ) : null
                        }
                        {
                            <p className="text-elem tr-whitespace-nowrap">
                                { showLoadingText ? loadingText : text }
                            </p>
                        }
                        {
                            showButtonIconOrSpinner && (iconPosition === HorizontalPositions.Right) ? (
                                <ButtonIconOrSpinner
                                    loading={ loading }
                                    iconSize={ iconSize }
                                    iconPosition={ iconPosition }
                                    Icon={ Icon }
                                    transitionState={ state }
                                />
                            ) : null
                        }
                    </button>
                </div>
            )}
        </Transition>
    );
};

export default ButtonInline;
