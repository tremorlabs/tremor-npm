"use client";
import React, { ReactNode, useRef, useState } from "react";
import { border, mergeRefs, sizing, spacing, tremorTwMerge } from "lib";
import { ExclamationFilledIcon } from "assets";
import { getSelectButtonColors, hasValue } from "components/input-elements/selectUtils";

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "email" | "url" | "number";
  defaultValue?: string | number;
  value?: string | number;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  stepper?: ReactNode;
  makeInputClassName: (className: string) => string;
}

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const {
    value,
    defaultValue,
    type,
    placeholder = "Type...",
    icon,
    error = false,
    errorMessage,
    disabled = false,
    stepper,
    makeInputClassName,
    className,
    ...other
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const Icon = icon;
  const inputRef = useRef<HTMLInputElement>(null);

  const hasSelection = hasValue(value || defaultValue);

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
          makeInputClassName("root"),
          // common
          "relative w-full flex items-center min-w-[10rem] outline-none rounded-tremor-default",
          // light
          "shadow-tremor-input",
          // dark
          "dark:shadow-dark-tremor-input",
          getSelectButtonColors(hasSelection, disabled, error),
          isFocused &&
            tremorTwMerge(
              // common
              "ring-2 transition duration-100",
              // light
              "border-tremor-brand-subtle ring-tremor-brand-muted",
              // light
              "dark:border-dark-tremor-brand-subtle dark:ring-dark-tremor-brand-muted",
            ),
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
              makeInputClassName("icon"),
              // common
              "shrink-0",
              // light
              "text-tremor-content-subtle",
              // light
              "dark:text-dark-tremor-content-subtle",
              sizing.lg.height,
              sizing.lg.width,
              spacing.xl.marginLeft,
            )}
          />
        ) : null}
        <input
          ref={mergeRefs([inputRef, ref])}
          defaultValue={defaultValue}
          value={value}
          type={type}
          className={tremorTwMerge(
            makeInputClassName("input"),
            // common
            "w-full focus:outline-none focus:ring-0 border-none bg-transparent text-tremor-default",
            // light
            "text-tremor-content-emphasis",
            // dark
            "dark:text-dark-tremor-content-emphasis",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
            error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
            spacing.sm.paddingY,
            disabled
              ? "placeholder:text-tremor-content-subtle dark:placeholder:text-dark-tremor-content-subtle"
              : "placeholder:text-tremor-content dark:placeholder:text-dark-tremor-content",
          )}
          placeholder={placeholder}
          disabled={disabled}
          data-testid="base-input"
          {...other}
        />
        {error ? (
          <ExclamationFilledIcon
            className={tremorTwMerge(
              makeInputClassName("errorIcon"),
              "text-rose-500 shrink-0",
              spacing.md.marginRight,
              sizing.lg.height,
              sizing.lg.width,
            )}
          />
        ) : null}
        {stepper ?? null}
      </div>
      {errorMessage ? (
        <p
          className={tremorTwMerge(
            makeInputClassName("errorMessage"),
            "text-sm text-rose-500 mt-1",
          )}
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
});

BaseInput.displayName = "BaseInput";

export default BaseInput;
