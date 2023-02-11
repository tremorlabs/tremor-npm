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
        className={twMerge(
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
        <div className={twMerge(spacing.xl.marginRight)}>
          <ExclamationFilledIcon
            className={twMerge(
              sizing.lg.height,
              sizing.lg.width,
              colorClassNames[BaseColors.Rose][colorPalette.text].textColor,
            )}
            aria-hidden="true"
          />
        </div>
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
