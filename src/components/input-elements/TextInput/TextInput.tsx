"use client";
import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  border,
  borderRadius,
  boxShadow,
  colorClassNames,
  fontSize,
  fontWeight,
  getColorClassNames,
  makeClassName,
  mergeRefs,
  sizing,
  spacing,
} from "lib";
import { ExclamationFilledIcon } from "assets";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { getSelectButtonColors, hasValue } from "components/input-elements/selectUtils";

const makeTextInputClassName = makeClassName("TextInput");

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password";
  defaultValue?: string;
  value?: string;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    type = "text",
    placeholder = "Type...",
    icon,
    error = false,
    errorMessage,
    disabled = false,
    className,
    ...other
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const Icon = icon;
  const inputRef = useRef<HTMLInputElement>(null);

  const hasSelection = hasValue(props.value || props.defaultValue);

  const handleFocusChange = (isFocused: boolean) => {
    if (isFocused === false) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
    setIsFocused(isFocused);
  };

  return (
    <>
      <div
        className={twMerge(
          makeTextInputClassName("root"),
          "relative w-full flex items-center min-w-[10rem] focus:outline-none focus:ring-2",
          getSelectButtonColors(hasSelection, disabled, error),
          getColorClassNames(BaseColors.Blue, colorPalette.lightRing).focusRingColor,
          isFocused &&
            twMerge("ring-2", getColorClassNames(BaseColors.Blue, colorPalette.ring).ringColor),
          borderRadius.md.all,
          border.sm.all,
          boxShadow.sm,
          className,
        )}
        onClick={() => {
          if (!disabled) {
            handleFocusChange(true);
          }
        }}
        onFocus={() => {
          handleFocusChange(true);
        }}
        onBlur={() => {
          handleFocusChange(false);
        }}
      >
        {Icon ? (
          <Icon
            className={twMerge(
              makeTextInputClassName("icon"),
              "shrink-0",
              sizing.lg.height,
              sizing.lg.width,
              getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
              spacing.xl.marginLeft,
            )}
            aria-hidden="true"
          />
        ) : null}
        <input
          ref={mergeRefs([ref, inputRef])}
          type={type}
          className={twMerge(
            makeTextInputClassName("input"),
            "w-full focus:outline-none focus:ring-0",
            getColorClassNames("transparent").bgColor,
            Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
            error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
            spacing.sm.paddingY,
            fontSize.sm,
            fontWeight.md,
            border.none.all,
            disabled ? "placeholder:text-gray-400" : "placeholder:text-gray-500",
          )}
          placeholder={placeholder}
          disabled={disabled}
          {...other}
        />
        {error ? (
          <ExclamationFilledIcon
            className={twMerge(
              makeTextInputClassName("errorIcon"),
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
            makeTextInputClassName("errorMessage"),
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

TextInput.displayName = "TextInput";

export default TextInput;
