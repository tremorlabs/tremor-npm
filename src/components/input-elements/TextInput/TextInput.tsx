import React from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  border,
  borderRadius,
  boxShadow,
  colorClassNames,
  fontSize,
  fontWeight,
  sizing,
  spacing,
} from "lib";
import { ExclamationFilledIcon } from "assets";
import { DEFAULT_COLOR, WHITE, colorPalette } from "lib/theme";

const getTextColor = (error: boolean, disabled: boolean) => {
  if (error) return colorClassNames[BaseColors.Rose][colorPalette.text].textColor;
  if (disabled) return colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor;
  return colorClassNames[DEFAULT_COLOR][colorPalette.darkText].textColor;
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
    ? colorClassNames[DEFAULT_COLOR][colorPalette.canvasBackground].bgColor
    : colorClassNames[WHITE]["none"].bgColor;
  const boderColor = error
    ? colorClassNames[BaseColors.Rose][colorPalette.border].borderColor
    : colorClassNames[DEFAULT_COLOR][colorPalette.border].borderColor;

  return (
    <>
      <div
        className={twMerge("relative w-full flex items-center min-w-[10rem]", bgColor, className)}
      >
        {Icon ? (
          <Icon
            className={twMerge(
              "shrink-0",
              sizing.lg.height,
              sizing.lg.width,
              colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
              spacing.xl.marginLeft,
            )}
            aria-hidden="true"
          />
        ) : null}
        <input
          ref={ref}
          type="text"
          className={twMerge(
            "w-full bg-inherit focus:outline-0 focus:ring-2",
            colorClassNames[DEFAULT_COLOR][colorPalette.border].focusRingColor,
            boderColor,
            borderRadius.md.all,
            border.sm.all,
            boxShadow.sm,
            textColor,
            Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
            error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
            spacing.sm.paddingY,
            fontSize.sm,
            fontWeight.md,
            "placeholder:text-gray-500",
          )}
          placeholder={placeholder}
          disabled={disabled}
          {...other}
        />
        {error ? (
          <ExclamationFilledIcon
            className={twMerge(
              spacing.xl.marginRight,
              sizing.lg.height,
              sizing.lg.width,
              colorClassNames[BaseColors.Rose][colorPalette.text].textColor,
            )}
            aria-hidden="true"
          />
        ) : null}
      </div>
      {errorMessage ? (
        <p
          className={twMerge(
            "text-sm",
            colorClassNames[BaseColors.Rose][colorPalette.text].textColor,
          )}
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
});

export default TextInput;
