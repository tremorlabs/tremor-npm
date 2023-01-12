import React from "react";

import { Transition } from "react-transition-group";

import {
  BaseColors,
  HorizontalPositions,
  Importances,
  Variants,
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
  sizing,
  spacing,
  isValidVariant,
  getColorVariantsFromColorThemeValue,
  defaultColors,
  getColorTheme,
} from "lib";
import {
  ButtonType,
  Color,
  HorizontalPosition,
  Importance,
  Variant,
  MarginTop,
  Size,
} from "../../../lib";
import {
  buttonProportions,
  buttonProportionsInline,
  colorsImportance,
  colorsVariant,
  iconSizes,
} from "./styles";
import { LoadingSpinner } from "assets";

export interface ButtonIconOrSpinnerProps {
  loading: boolean;
  iconSize: string;
  iconPosition: string;
  Icon: React.ElementType | undefined;
  transitionState: string;
}

export const ButtonIconOrSpinner = ({
  loading,
  iconSize,
  iconPosition,
  Icon,
  transitionState,
}: ButtonIconOrSpinnerProps) => {
  Icon = Icon!;

  const margin =
    iconPosition === HorizontalPositions.Left
      ? classNames(spacing.twoXs.negativeMarginLeft, spacing.xs.marginRight)
      : classNames(spacing.twoXs.negativeMarginRight, spacing.xs.marginLeft);

  const defaultSpinnerSize = classNames(sizing.none.width, sizing.none.height);
  const spinnerSize: { [key: string]: any } = {
    default: defaultSpinnerSize,
    entering: defaultSpinnerSize,
    entered: iconSize,
    exiting: iconSize,
    exited: defaultSpinnerSize,
  };

  return loading ? (
    <LoadingSpinner
      className={classNames(
        "tr-animate-spin",
        margin,
        spinnerSize.default,
        spinnerSize[transitionState]
      )}
      style={{ transition: `width 150ms` }}
    />
  ) : (
    <Icon className={classNames(iconSize, margin)} aria-hidden="true" />
  );
};

export interface ButtonProps {
  type?: ButtonType;
  text?: string;
  value?: any;
  icon?: React.ElementType;
  iconPosition?: HorizontalPosition;
  size?: Size;
  color?: Color;
  importance?: Importance;
  variant?: Variant;
  handleClick?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
  onReset?: React.FormEventHandler<HTMLButtonElement>;
  marginTop?: MarginTop;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
}

const Button = ({
  type = "button",
  text,
  value,
  icon,
  iconPosition = HorizontalPositions.Left,
  handleClick, // Deprecated
  onClick,
  onSubmit,
  onReset,
  size = Sizes.SM,
  color = BaseColors.Blue,
  importance = Importances.Primary,
  variant = importance ? importance : Variants.Primary,
  marginTop = "mt-0",
  disabled = false,
  loading = false,
  loadingText,
  children,
}: ButtonProps) => {
  if (handleClick) {
    console.warn(
      "DeprecationWarning: The `handleClick` property is deprecated and will be removed \
            in the next major release. Please use `onClick` instead."
    );
  }

  const Icon = icon;

  const isDisabled = loading || disabled;
  const showButtonIconOrSpinner = Icon !== undefined || loading;
  const showLoadingText = loading && loadingText;

  const buttonColorsImportance = isBaseColor(color)
    ? colorsImportance[color]
    : colorsImportance[BaseColors.Blue];
  const buttonColorsVariant = isBaseColor(color)
    ? colorsVariant[color]
    : colorsVariant[BaseColors.Blue];
  const buttonSize = isValidSize(size) ? size : Sizes.SM;
  const buttonImportance = isValidImportance(importance)
    ? importance
    : Importances.Primary;
  const buttonVariant = isValidVariant(variant) ? variant : Variants.Primary;
  const iconSize = classNames(
    iconSizes[buttonSize].height,
    iconSizes[buttonSize].width
  );

  return (
    <Transition in={loading} timeout={50}>
      {(state) => (
        <div
          className={classNames(
            "tremor-base tr-flex tr-items-center",
            parseMarginTop(marginTop)
          )}
        >
          <button
            type={type}
            value={value}
            onClick={handleClick ?? onClick}
            onSubmit={onSubmit}
            onReset={onReset}
            className={
              variant != "inline"
                ? classNames(
                    "tremor-base input-elem tr-flex-shrink-0 tr-inline-flex tr-items-center tr-group",
                    "focus:tr-outline-none focus:tr-ring-2 focus:tr-ring-offset-2 focus:tr-ring-transparent",
                    borderRadius.md.all,
                    border.sm.all,
                    boxShadow.sm,
                    fontWeight.md,
                    buttonProportions[buttonSize].paddingLeft,
                    buttonProportions[buttonSize].paddingRight,
                    buttonProportions[buttonSize].paddingTop,
                    buttonProportions[buttonSize].paddingBottom,
                    buttonProportions[buttonSize].fontSize,
                    !variant
                      ? classNames(
                          buttonColorsImportance[buttonImportance].textColor,
                          buttonColorsImportance[buttonImportance].bgColor,
                          buttonColorsImportance[buttonImportance].borderColor,
                          !isDisabled
                            ? classNames(
                                buttonColorsImportance[buttonImportance]
                                  .focusRingColor,
                                buttonColorsImportance[buttonImportance]
                                  .hoverBgColor,
                                buttonColorsImportance[buttonImportance]
                                  .hoverBorderColor
                              )
                            : "tr-opacity-50"
                        )
                      : "",
                    buttonColorsVariant[buttonVariant].textColor,
                    buttonColorsVariant[buttonVariant].bgColor,
                    buttonColorsVariant[buttonVariant].borderColor,
                    !isDisabled
                      ? classNames(
                          buttonColorsVariant[buttonVariant].focusRingColor,
                          buttonColorsVariant[buttonVariant].hoverBgColor,
                          buttonColorsVariant[buttonVariant].hoverBorderColor
                        )
                      : "tr-opacity-50",
                    parseMarginTop(marginTop)
                  )
                : classNames(
                    "input-elem tr-flex-shrink-0 tr-inline-flex tr-items-center tr-group tr-font-medium",
                    "focus:tr-outline-none focus:tr-ring-none",
                    buttonProportionsInline[buttonSize].fontSize,
                    getColorVariantsFromColorThemeValue(
                      getColorTheme(color).text
                    ).textColor,
                    getColorVariantsFromColorThemeValue(
                      defaultColors.transparent
                    ).bgColor,
                    getColorVariantsFromColorThemeValue(
                      defaultColors.transparent
                    ).hoverBgColor,
                    !isDisabled
                      ? classNames(
                          getColorVariantsFromColorThemeValue(
                            getColorTheme(color).darkText
                          ).hoverTextColor
                        )
                      : "tr-opacity-50"
                  )
            }
            disabled={isDisabled}
          >
            {showButtonIconOrSpinner &&
            iconPosition !== HorizontalPositions.Right ? (
              <ButtonIconOrSpinner
                loading={loading}
                iconSize={iconSize}
                iconPosition={iconPosition}
                Icon={Icon}
                transitionState={state}
              />
            ) : null}
            {
              <p className="text-elem tr-whitespace-nowrap">
                {showLoadingText ? loadingText : !children ? text : children}
              </p>
            }
            {showButtonIconOrSpinner &&
            iconPosition === HorizontalPositions.Right ? (
              <ButtonIconOrSpinner
                loading={loading}
                iconSize={iconSize}
                iconPosition={iconPosition}
                Icon={Icon}
                transitionState={state}
              />
            ) : null}
          </button>
        </div>
      )}
    </Transition>
  );
};

export default Button;
