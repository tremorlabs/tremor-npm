/**
 * NOTE: The ButtonInline component is deprecated and will be removed in the next major release.
 * Please refer to the variant="light" property of the Button component instead.
 */

import React from "react";
import clsx from "clsx";
import {
  BaseColors,
  HorizontalPositions,
  Sizes,
  defaultColors,
  getColor,
  getColorVariantsFromColorThemeValue,
  isValidSize,
  parseMarginTop,
} from "lib";
import { ButtonType, Color, HorizontalPosition, MarginTop, Size } from "../../../lib/inputTypes";
import { buttonProportions, iconSizes } from "./styles";
import { ButtonIconOrSpinner } from "components/input-elements/Button/Button";
import { Transition } from "react-transition-group";

export interface ButtonInlineProps {
  type?: ButtonType;
  text?: string;
  value?: any;
  icon?: React.ElementType;
  iconPosition?: HorizontalPosition;
  size?: Size;
  color?: Color;
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

const ButtonInline = ({
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
  marginTop = "mt-0",
  disabled = false,
  loading = false,
  loadingText,
  children,
}: ButtonInlineProps) => {
  console.warn(
    "DeprecationWarning: The `ButtonInline` component is deprecated and will be removed in the next major release. Please use `<Button variant='light'>` instead.",
  );

  if (handleClick) {
    console.warn(
      "DeprecationWarning: The `handleClick` property is deprecated and will be removed in the next major release. Please use `onClick` instead.",
    );
  }

  const Icon = icon;

  const isDisabled = loading || disabled;
  const showButtonIconOrSpinner = Icon !== undefined || loading;
  const showLoadingText = loading && loadingText;

  const buttonSize = isValidSize(size) ? size : Sizes.SM;
  const iconSize = clsx(iconSizes[buttonSize].height, iconSizes[buttonSize].width);

  return (
    <Transition in={loading} timeout={50}>
      {(state) => (
        <div className={clsx("tremor-base flex items-center", parseMarginTop(marginTop))}>
          <button
            value={value}
            type={type}
            onClick={handleClick ?? onClick}
            onSubmit={onSubmit}
            onReset={onReset}
            className={clsx(
              "input-elem flex-shrink-0 inline-flex items-center group font-medium",
              "focus:outline-none focus:ring-none",
              buttonProportions[buttonSize].fontSize,
              getColorVariantsFromColorThemeValue(getColor(color).text).textColor,
              getColorVariantsFromColorThemeValue(defaultColors.transparent).bgColor,
              getColorVariantsFromColorThemeValue(defaultColors.transparent).hoverBgColor,
              !isDisabled
                ? clsx(getColorVariantsFromColorThemeValue(getColor(color).darkText).hoverTextColor)
                : "opacity-50",
            )}
            disabled={isDisabled}
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
              <p className="text-elem whitespace-nowrap">
                {showLoadingText ? loadingText : !children ? text : children}
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
        </div>
      )}
    </Transition>
  );
};

export default ButtonInline;
