import React from "react";
import clsx from "clsx";
import "tippy.js/dist/tippy.css";
import Tooltip from "@tippyjs/react";

import {
  BaseColors,
  border,
  borderRadius,
  boxShadow,
  colorTheme,
  defaultColors,
  fontSize,
  fontWeight,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";
import { ExclamationFilledIcon } from "assets";

const getTextColor = (error: boolean, disabled: boolean) => {
  if (error) return getColorVariantsFromColorThemeValue(colorTheme[BaseColors.Rose].text).textColor;
  if (disabled) return getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor;
  return getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor;
};

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  defaultValue?: string;
  value?: string;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    placeholder = "Type...",
    icon,
    error = false,
    errorMessage,
    disabled = false,
    className,
    ...other
  } = props;
  const Icon = icon;

  const textColor = getTextColor(error, disabled);
  const bgColor = disabled
    ? getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).bgColor
    : getColorVariantsFromColorThemeValue(defaultColors.white).bgColor;
  const boderColor = error
    ? getColorVariantsFromColorThemeValue(colorTheme[BaseColors.Rose].border).borderColor
    : getColorVariantsFromColorThemeValue(defaultColors.border).borderColor;

  return (
    <div
      className={clsx(
        "relative w-full flex items-center overflow-hidden min-w-[10rem]",
        bgColor,
        boderColor,
        borderRadius.md.all,
        border.sm.all,
        boxShadow.sm,
        className,
      )}
    >
      {Icon ? (
        <Icon
          className={clsx(
            "shrink-0",
            sizing.lg.height,
            sizing.lg.width,
            getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
            spacing.xl.marginLeft,
          )}
          aria-hidden="true"
        />
      ) : null}
      <input
        ref={ref}
        type="text"
        className={clsx(
          "input-elem",
          "w-full focus:outline-0 focus:ring-0 bg-inherit",
          textColor,
          Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
          error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
          spacing.sm.paddingY,
          fontSize.sm,
          fontWeight.md,
          border.none.all,
          "placeholder:text-gray-500",
        )}
        placeholder={placeholder}
        disabled={disabled}
        {...other}
      />
      {error ? (
        <Tooltip
          content={errorMessage}
          className={errorMessage ? "" : "hidden"}
          showOnCreate={true}
        >
          <div className={clsx(spacing.xl.marginRight)}>
            <ExclamationFilledIcon
              className={clsx(
                sizing.lg.height,
                sizing.lg.width,
                getColorVariantsFromColorThemeValue(colorTheme[BaseColors.Rose].text).textColor,
              )}
              aria-hidden="true"
            />
          </div>
        </Tooltip>
      ) : null}
    </div>
  );
});

export default TextInput;
