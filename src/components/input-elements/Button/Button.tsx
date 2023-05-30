"use client";
import React from "react";
import { tremorTwMerge } from "lib";
import { Transition } from "react-transition-group";

import { HorizontalPositions, Sizes, border, makeClassName, sizing, spacing } from "lib";
import { Color, HorizontalPosition, ButtonVariant, Size } from "../../../lib";
import { getButtonColors, getButtonProportions, iconSizes } from "./styles";
import { LoadingSpinner } from "assets";

const makeButtonClassName = makeClassName("Button");

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
      ? tremorTwMerge(spacing.twoXs.negativeMarginLeft, spacing.xs.marginRight)
      : tremorTwMerge(spacing.twoXs.negativeMarginRight, spacing.xs.marginLeft);

  const defaultSpinnerSize = tremorTwMerge(sizing.none.width, sizing.none.height);
  const spinnerSize: { [key: string]: any } = {
    default: defaultSpinnerSize,
    entering: defaultSpinnerSize,
    entered: iconSize,
    exiting: iconSize,
    exited: defaultSpinnerSize,
  };

  return loading ? (
    <LoadingSpinner
      className={tremorTwMerge(
        makeButtonClassName("icon"),
        "animate-spin",
        margin,
        spinnerSize.default,
        spinnerSize[transitionState],
      )}
      style={{ transition: `width 150ms` }}
    />
  ) : (
    <Icon className={tremorTwMerge(makeButtonClassName("icon"), iconSize, margin)} />
  );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  iconPosition?: HorizontalPosition;
  size?: Size;
  color?: Color;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    icon,
    iconPosition = HorizontalPositions.Left,
    size = Sizes.SM,
    color,
    variant = "primary",
    disabled,
    loading = false,
    loadingText,
    children,
    className,
    ...other
  } = props;

  const Icon = icon;

  const isDisabled = loading || disabled;
  const showButtonIconOrSpinner = Icon !== undefined || loading;
  const showLoadingText = loading && loadingText;

  const iconSize = tremorTwMerge(iconSizes[size].height, iconSizes[size].width);
  const buttonShapeStyles =
    variant !== "light"
      ? tremorTwMerge(
          // common
          "rounded-tremor-default",
          // light
          "shadow-tremor-input",
          // dark
          "dark:shadow-dark-tremor-input",
          border.sm.all,
        )
      : "";
  const buttonColorStyles = getButtonColors(variant, color);
  const buttonProportionStyles = getButtonProportions(variant)[size];

  return (
    <Transition in={loading} timeout={50}>
      {(state) => (
        <button
          ref={ref}
          className={tremorTwMerge(
            makeButtonClassName("root"),
            // common
            "flex-shrink-0 inline-flex justify-center items-center group font-medium outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-offset-2 transition duration-100",
            // light
            "focus:border-tremor-brand-subtle focus:ring-tremor-content-inverted focus:ring-offset-tremor-brand-muted",
            // dark
            "dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-content-inverted dark:focus:ring-offset-dark-tremor-brand-muted",
            buttonShapeStyles,
            buttonProportionStyles.paddingX,
            buttonProportionStyles.paddingY,
            buttonProportionStyles.fontSize,
            buttonColorStyles.textColor,
            buttonColorStyles.bgColor,
            buttonColorStyles.borderColor,
            buttonColorStyles.focusRingColor,
            !isDisabled
              ? tremorTwMerge(
                  getButtonColors(variant, color).hoverTextColor,
                  getButtonColors(variant, color).hoverBgColor,
                  getButtonColors(variant, color).hoverBorderColor,
                )
              : "opacity-50",
            className,
          )}
          disabled={isDisabled}
          {...other}
        >
          {showButtonIconOrSpinner && iconPosition !== HorizontalPositions.Right ? (
            <ButtonIconOrSpinner
              loading={loading}
              iconSize={iconSize}
              iconPosition={iconPosition}
              Icon={Icon}
              transitionState={state}
            />
          ) : null}
          {
            <span
              className={tremorTwMerge(makeButtonClassName("text"), "text-sm whitespace-nowrap")}
            >
              {showLoadingText ? loadingText : children}
            </span>
          }
          {showButtonIconOrSpinner && iconPosition === HorizontalPositions.Right ? (
            <ButtonIconOrSpinner
              loading={loading}
              iconSize={iconSize}
              iconPosition={iconPosition}
              Icon={Icon}
              transitionState={state}
            />
          ) : null}
        </button>
      )}
    </Transition>
  );
});

Button.displayName = "Button";

export default Button;
