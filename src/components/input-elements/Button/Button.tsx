import React from "react";
import clsx from "clsx";
import { Transition } from "react-transition-group";

import {
  BaseColors,
  HorizontalPositions,
  Sizes,
  border,
  borderRadius,
  boxShadow,
  fontWeight,
  sizing,
  spacing,
} from "lib";
import { Color, HorizontalPosition, ButtonVariant, MarginTop, Size } from "../../../lib";
import { getButtonColors, getButtonProportions, iconSizes } from "./styles";
import { LoadingSpinner } from "assets";
import { textElem } from "lib/baseStyles";

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
      ? clsx(spacing.twoXs.negativeMarginLeft, spacing.xs.marginRight)
      : clsx(spacing.twoXs.negativeMarginRight, spacing.xs.marginLeft);

  const defaultSpinnerSize = clsx(sizing.none.width, sizing.none.height);
  const spinnerSize: { [key: string]: any } = {
    default: defaultSpinnerSize,
    entering: defaultSpinnerSize,
    entered: iconSize,
    exiting: iconSize,
    exited: defaultSpinnerSize,
  };

  return loading ? (
    <LoadingSpinner
      className={clsx("animate-spin", margin, spinnerSize.default, spinnerSize[transitionState])}
      style={{ transition: `width 150ms` }}
    />
  ) : (
    <Icon className={clsx(iconSize, margin)} aria-hidden="true" />
  );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  iconPosition?: HorizontalPosition;
  size?: Size;
  color?: Color;
  variant?: ButtonVariant;
  marginTop?: MarginTop;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    icon,
    iconPosition = HorizontalPositions.Left,
    size = Sizes.SM,
    color = BaseColors.Blue,
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

  const iconSize = clsx(iconSizes[size].height, iconSizes[size].width);
  const buttonShapeStyles =
    variant !== "light" ? clsx(borderRadius.md.all, border.sm.all, boxShadow.sm) : "";
  const buttonColorStyles = getButtonColors(variant, color);
  const buttonProportionStyles = getButtonProportions(variant)[size];

  return (
    <Transition in={loading} timeout={50}>
      {(state) => (
        <button
          ref={ref}
          className={clsx(
            "flex-shrink-0 inline-flex items-center group",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
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
              ? clsx(
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
          {<p className={textElem}>{showLoadingText ? loadingText : children}</p>}
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
