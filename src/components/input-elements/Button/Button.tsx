import React from 'react';

import { Transition } from 'react-transition-group';

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
    getPixelsFromTwClassName,
    isBaseColor,
    isValidImportance,
    isValidSize,
    parseMarginTop,
    spacing,
} from 'lib';
import { Color, HorizontalPosition, Importance, MarginTop, Size, Width } from '../../../lib';
import {
    buttonProportions,
    colors,
    iconSizes,
} from './styles';
import { LoadingSpinner } from 'assets';

export interface ButtonIconOrSpinnerProps {
    loading: boolean,
    iconSize: string,
    iconPosition: string,
    Icon: React.ElementType | undefined,
    spinnerStyle: any,
}

export const ButtonIconOrSpinner = ({
    loading,
    iconSize,
    iconPosition,
    Icon,
    spinnerStyle,
}: ButtonIconOrSpinnerProps) => {
    const margin = iconPosition === HorizontalPositions.Left ?
        classNames(
            spacing.twoXs.negativeMarginLeft,
            spacing.xs.marginRight,
        ) :
        classNames(
            spacing.twoXs.negativeMarginRight,
            spacing.xs.marginLeft,
        );

    Icon = Icon!;
    return (
        loading ? (
            <LoadingSpinner
                className={ classNames(
                    'tr-animate-spin',
                    iconSize,
                    margin
                ) }
                style={ spinnerStyle }
            />
        ) : (
            <Icon
                className={ classNames(
                    iconSize,
                    margin
                ) }
                aria-hidden="true"
            />
        )
    );
};

export interface ButtonProps {
    text: string,
    icon?: React.ElementType,
    iconPosition?: HorizontalPosition,
    size?: Size,
    color?: Color,
    importance?: Importance,
    handleClick?: { (): void },
    marginTop?: MarginTop,
    disabled?: boolean,
    loading?: boolean,
    loadingText?: string,
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
    disabled = false,
    loading = false,
    loadingText,
}: ButtonProps) => {
    const Icon = icon;

    const isDisabled = loading || disabled;
    const showButtonIconOrSpinner = (Icon !== undefined) || loading;
    const showLoadingText = loading && loadingText;

    const buttonColors = isBaseColor(color) ? colors[color] : colors[BaseColors.Blue];
    const buttonSize = isValidSize(size) ? size : Sizes.SM;
    const buttonImportance = isValidImportance(importance) ? importance : Importances.Primary;
    const iconSize = classNames(
        iconSizes[buttonSize].height,
        iconSizes[buttonSize].width,
    );

    const spinnerWidthPx = getPixelsFromTwClassName(iconSizes[buttonSize].width as Width);
    const spinnerDefaultStyle = {
        transition: `width 150ms`,
        width: '0px',
    };
    const spinnerTransitionStyle: {[key: string]: any} = {
        entering: { width: '0px' },
        entered: { width: `${spinnerWidthPx}px` },
        exiting: { width: `${spinnerWidthPx}px` },
        exited: { width: '0px' },
    };

    return (
        <Transition in={loading} timeout={50}>
            { state => (
                <div className={ classNames('tremor-base tr-flex tr-items-center', parseMarginTop(marginTop)) }>
                    <button
                        type="button"
                        onClick={ handleClick }
                        className={ classNames(
                            'tremor-base input-elem tr-flex-shrink-0 tr-inline-flex tr-items-center tr-group',
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
                            parseMarginTop(marginTop),
                            !isDisabled ? classNames(
                                buttonColors[buttonImportance].focusRingColor,
                                buttonColors[buttonImportance].hoverBgColor,
                                buttonColors[buttonImportance].hoverBorderColor,
                            ) : 'tr-opacity-50',
                        ) }
                        disabled={ isDisabled }
                    >
                        {
                            showButtonIconOrSpinner && (iconPosition !== HorizontalPositions.Right) ? (
                                <ButtonIconOrSpinner
                                    loading={ loading }
                                    iconSize={ iconSize }
                                    iconPosition={ iconPosition }
                                    Icon={ Icon }
                                    spinnerStyle={ {
                                        ...spinnerDefaultStyle,
                                        ...spinnerTransitionStyle[state]
                                    } }
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
                                    spinnerStyle={ {
                                        ...spinnerDefaultStyle,
                                        ...spinnerTransitionStyle[state]
                                    } }
                                />
                            ) : null
                        }
                    </button>
                </div>
            )}
        </Transition>
    );
};

export default Button;
