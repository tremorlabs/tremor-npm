import React from "react";

import { Transition } from "react-transition-group";

import {
  BaseColors,
  HorizontalPositions,
  Importances,
  ButtonVariants,
  Sizes,
  border,
  borderRadius,
  boxShadow,
  classNames,
  fontWeight,
  isValidSize,
  parseMarginTop,
  sizing,
  spacing,
  isValidVariant,
  isBaseColor,
} from "lib";
import {
  ButtonType,
  Color,
  HorizontalPosition,
  Importance,
  ButtonVariant,
  MarginTop,
  Size,
} from "../../../lib";
import { getButtonColors, getButtonProportions, iconSizes } from "./styles";
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
  variant?: ButtonVariant;
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
  importance, // Deprecated
  variant,
  marginTop = "mt-0",
  disabled = false,
  loading = false,
  loadingText,
  children,
}: ButtonProps) => {
  if (handleClick) {
    console.warn(
      "DeprecationWarning: The `handleClick` property is deprecated and will be removed in the next major release. Please use `onClick` instead."
    );
  }
  if (importance) {
    console.warn(
      "DeprecationWarning: The `importance` property is deprecated and will be removed in the next major release. Please use `variant` instead."
    );
  }

  const Icon = icon;
  const buttonImportance = importance ?? Importances.Primary;
  const buttonVariant = variant
    ? isValidVariant(variant)
      ? variant
      : ButtonVariants.Primary
    : buttonImportance;

  const isDisabled = loading || disabled;
  const showButtonIconOrSpinner = Icon !== undefined || loading;
  const showLoadingText = loading && loadingText;

  const buttonSize = isValidSize(size) ? size : Sizes.SM;
  const iconSize = classNames(
    iconSizes[buttonSize].height,
    iconSizes[buttonSize].width
  );
  const buttonShapeStyles =
    variant !== "light"
      ? classNames(borderRadius.md.all, border.sm.all, boxShadow.sm)
      : "";
  const buttonColorStyles = isBaseColor(color)
    ? getButtonColors(buttonVariant, color)
    : getButtonColors(buttonVariant, BaseColors.Blue);
  const buttonProportionStyles =
    getButtonProportions(buttonVariant)[buttonSize];

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
            className={classNames(
              "tremor-base input-elem tr-flex-shrink-0 tr-inline-flex tr-items-center tr-group",
              "focus:tr-outline-none focus:tr-ring-2 focus:tr-ring-offset-2",
              "focus:tr-ring-transparent",
              fontWeight.md,
              buttonShapeStyles,
              buttonProportionStyles.paddingLeft,
              buttonProportionStyles.paddingRight,
              buttonProportionStyles.paddingTop,
              buttonProportionStyles.paddingBottom,
              buttonProportionStyles.fontSize,
              buttonColorStyles.textColor,
              buttonColorStyles.bgColor,
              buttonColorStyles.borderColor,
              buttonColorStyles.focusRingColor,
              !isDisabled
                ? classNames(
                    getButtonColors(buttonVariant, color).hoverTextColor,
                    getButtonColors(buttonVariant, color).hoverBgColor,
                    getButtonColors(buttonVariant, color).hoverBorderColor
                  )
                : "tr-opacity-50"
            )}
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
