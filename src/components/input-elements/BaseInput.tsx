"use client";
import { ExclamationFilledIcon, EyeIcon, EyeOffIcon, XCircleIcon } from "assets";
import { getSelectButtonColors, hasValue } from "components/input-elements/selectUtils";
import { border, mergeRefs, sizing, spacing, tremorTwMerge } from "lib";
import React, { ReactNode, useCallback, useRef, useState } from "react";
import { useInternalState } from "hooks";

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "email" | "url" | "number";
  defaultValue?: string | number;
  value?: string | number;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  stepper?: ReactNode;
  enableClear?: boolean;
  onValueChange?: (value: any) => void;
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
    enableClear = false,
    onChange,
    onValueChange,
    ...other
  } = props;
  const [internalValue, setInternalValue] = useInternalState(defaultValue, value);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleIsPasswordVisible = useCallback(
    () => setIsPasswordVisible(!isPasswordVisible),
    [isPasswordVisible, setIsPasswordVisible],
  );

  const Icon = icon;

  const inputRef = useRef<HTMLInputElement>(null);

  const hasSelection = hasValue(internalValue);

  const handleFocusChange = (isFocused: boolean) => {
    if (isFocused === false) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
    setIsFocused(isFocused);
  };

  const onInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) {
      const target = inputRef.current?.cloneNode(true) as HTMLInputElement;
      const event = Object.create(e, {
        target: { value: target },
        currentTarget: { value: target },
      });
      target.value = e.target.value;
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
    onValueChange?.(e.target.value);
  };

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    setInternalValue("");
    if (inputRef.current && onChange) {
      inputRef.current.focus();
      const target = inputRef.current.cloneNode(true) as HTMLInputElement;
      const event = Object.create(e, {
        target: { value: target },
        currentTarget: { value: target },
      });
      target.value = "";
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
    onValueChange?.("");
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
              spacing.md.marginLeft,
            )}
          />
        ) : null}
        <input
          ref={mergeRefs([inputRef, ref])}
          type={isPasswordVisible ? "text" : type}
          className={tremorTwMerge(
            makeInputClassName("input"),
            // common
            "w-full focus:outline-none focus:ring-0 border-none bg-transparent text-tremor-default rounded-tremor-default",
            // light
            "text-tremor-content-emphasis",
            // dark
            "dark:text-dark-tremor-content-emphasis",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            Icon ? spacing.sm.paddingLeft : spacing.lg.paddingLeft,
            error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
            spacing.sm.paddingY,
            disabled
              ? "placeholder:text-tremor-content-subtle dark:placeholder:text-dark-tremor-content-subtle"
              : "placeholder:text-tremor-content dark:placeholder:text-dark-tremor-content",
          )}
          placeholder={placeholder}
          disabled={disabled}
          data-testid="base-input"
          value={internalValue}
          onChange={onInternalChange}
          {...other}
        />
        {enableClear && !disabled && hasSelection ? (
          <button
            type="button"
            className={tremorTwMerge(makeInputClassName("clearButton"), "mr-2")}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            data-testid="clear-btn"
          >
            <XCircleIcon
              className={tremorTwMerge(
                makeInputClassName("clearIcon"),
                // common
                "flex-none",
                // light
                "text-tremor-content-subtle",
                // dark
                "dark:text-dark-tremor-content-subtle",
                sizing.md.height,
                sizing.md.width,
              )}
            />
          </button>
        ) : null}
        {type === "password" && !disabled ? (
          <button
            className={tremorTwMerge(makeInputClassName("toggleButton"), "mr-2")}
            type="button"
            onClick={() => toggleIsPasswordVisible()}
          >
            {isPasswordVisible ? (
              <EyeOffIcon
                className={tremorTwMerge(
                  // common
                  "flex-none h-5 w-5 transition",
                  // light
                  "text-tremor-content-subtle hover:text-tremor-content",
                  // dark
                  "dark:text-dark-tremor-content-subtle hover:dark:text-dark-tremor-content",
                )}
              />
            ) : (
              <EyeIcon
                className={tremorTwMerge(
                  // common
                  "flex-none h-5 w-5 transition",
                  // light
                  "text-tremor-content-subtle hover:text-tremor-content",
                  // dark
                  "dark:text-dark-tremor-content-subtle hover:dark:text-dark-tremor-content",
                )}
              />
            )}
          </button>
        ) : null}
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
      {error && errorMessage ? (
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
