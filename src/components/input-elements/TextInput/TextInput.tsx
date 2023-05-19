"use client";
import React, { useRef, useState } from "react";
import { tremorTwMerge } from "lib";

import { border, makeClassName, mergeRefs, sizing, spacing } from "lib";
import { ExclamationFilledIcon } from "assets";
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
        className={tremorTwMerge(
          makeTextInputClassName("root"),
          "relative w-full flex items-center min-w-[10rem] focus:outline-none focus:ring-2 rounded-tremor-default shadow-tremor-sm transition",
          getSelectButtonColors(hasSelection, disabled, error),
          isFocused && tremorTwMerge("ring-2 ring-offset-1 ring-tremor-brand-subtle"),
          border.sm.all,
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
            className={tremorTwMerge(
              makeTextInputClassName("icon"),
              "shrink-0 text-tremor-content-subtle",
              sizing.lg.height,
              sizing.lg.width,
              spacing.xl.marginLeft,
            )}
            aria-hidden="true"
          />
        ) : null}
        <input
          ref={mergeRefs([ref, inputRef])}
          type={type}
          className={tremorTwMerge(
            makeTextInputClassName("input"),
            "w-full focus:outline-none focus:ring-0 border-none text-tremor-sm font-tremor-medium bg-transparent",
            Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
            error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
            spacing.sm.paddingY,
            disabled ? "placeholder:text-tremor-content-subtle" : "placeholder:text-tremor-content",
          )}
          placeholder={placeholder}
          disabled={disabled}
          {...other}
        />
        {error ? (
          <ExclamationFilledIcon
            className={tremorTwMerge(
              makeTextInputClassName("errorIcon"),
              "text-rose-500",
              spacing.xl.marginRight,
              sizing.lg.height,
              sizing.lg.width,
            )}
            aria-hidden="true"
          />
        ) : null}
      </div>
      {errorMessage ? (
        <p
          className={tremorTwMerge(
            makeTextInputClassName("errorMessage"),
            "text-sm text-rose-500 mt-1",
          )}
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
});

export default TextInput;
