"use client";
import React from "react";
import { tremorTwMerge } from "lib";
import { Transition } from "react-transition-group";

import {
  BaseColors,
  HorizontalPositions,
  Sizes,
  border,
  borderRadius,
  boxShadow,
  fontWeight,
  makeClassName,
  sizing,
  spacing,
} from "lib";
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
    <Icon
      className={tremorTwMerge(makeButtonClassName("icon"), iconSize, margin)}
      aria-hidden="true"
    />
  );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  iconPosition?: HorizontalPosition;
  size?: Size;
  color?: any; // @achi
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
    color, // = BaseColors.Blue,
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
    variant !== "light" ? tremorTwMerge(borderRadius.md.all, border.sm.all, boxShadow.sm) : "";
  const buttonColorStyles = getButtonColors(variant, color);
  const buttonProportionStyles = getButtonProportions(variant)[size];

  return (
    <Transition in={loading} timeout={50}>
      {(state) => (
        <button
          ref={ref}
          className={tremorTwMerge(
            makeButtonClassName("root"),
            "flex-shrink-0 inline-flex justify-center items-center group",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all",
            fontWeight.md,
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
            <p className={tremorTwMerge(makeButtonClassName("text"), "text-sm whitespace-nowrap")}>
              {showLoadingText ? loadingText : children}
            </p>
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

export default Button;
