"use client";
import { ExclamationFilledIcon, EyeIcon, EyeOffIcon } from "assets";
import { getSelectButtonColors, hasValue } from "components/input-elements/selectUtils";
import { mergeRefs, tremorTwMerge } from "lib";
import React, { ReactNode, useCallback, useRef, useState } from "react";

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "email" | "url" | "number" | "search" | "tel";
  defaultValue?: string | number;
  value?: string | number;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  stepper?: ReactNode;
  onValueChange?: (value: any) => void;
  makeInputClassName: (className: string) => string;
  pattern?: string;
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
    onChange,
    onValueChange,
    autoFocus,
    pattern,
    ...other
  } = props;
  const [isFocused, setIsFocused] = useState(autoFocus || false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleIsPasswordVisible = useCallback(
    () => setIsPasswordVisible(!isPasswordVisible),
    [isPasswordVisible, setIsPasswordVisible],
  );

  const Icon = icon;

  const inputRef = useRef<HTMLInputElement>(null);

  const hasSelection = hasValue(value || defaultValue);

  React.useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const node = inputRef.current;
    if (node) {
      node.addEventListener("focus", handleFocus);
      node.addEventListener("blur-sm", handleBlur);

      // Autofocus logic
      if (autoFocus) {
        node.focus();
      }
    }

    return () => {
      if (node) {
        node.removeEventListener("focus", handleFocus);
        node.removeEventListener("blur-sm", handleBlur);
      }
    };
  }, [autoFocus]);

  return (
    <>
      <div
        className={tremorTwMerge(
          makeInputClassName("root"),
          // common
          "rounded-tremor-default relative flex w-full min-w-[10rem] items-center border transition duration-100 outline-none",
          // light
          "shadow-tremor-input",
          // dark
          "dark:shadow-dark-tremor-input",
          getSelectButtonColors(hasSelection, disabled, error),
          isFocused &&
            tremorTwMerge(
              // common
              "ring-2",
              // light
              "border-tremor-brand-subtle ring-tremor-brand-muted",
              // light
              "dark:border-dark-tremor-brand-subtle dark:ring-dark-tremor-brand-muted",
            ),
          className,
        )}
      >
        {Icon ? (
          <Icon
            className={tremorTwMerge(
              makeInputClassName("icon"),
              // common
              "absolute left-0 mx-2.5 flex h-5 w-5 shrink-0 items-center",
              // light
              "text-tremor-content-subtle",
              // light
              "dark:text-dark-tremor-content-subtle",
            )}
          />
        ) : null}
        <input
          ref={mergeRefs([inputRef, ref])}
          defaultValue={defaultValue}
          value={value}
          type={isPasswordVisible ? "text" : type}
          className={tremorTwMerge(
            makeInputClassName("input"),
            // common
            "text-tremor-default rounded-tremor-default w-full border-none bg-transparent py-2 transition duration-100 focus:ring-0 focus:outline-none",
            // light
            "text-tremor-content-emphasis",
            // dark
            "dark:text-dark-tremor-content-emphasis",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            type === "password" ? (error ? "pr-16" : "pr-12") : error ? "pr-8" : "pr-3",
            Icon ? "pl-10" : "pl-3",
            disabled
              ? "placeholder:text-tremor-content-subtle dark:placeholder:text-dark-tremor-content-subtle"
              : "placeholder:text-tremor-content dark:placeholder:text-dark-tremor-content",
          )}
          placeholder={placeholder}
          disabled={disabled}
          data-testid="base-input"
          onChange={(e) => {
            onChange?.(e);
            onValueChange?.(e.target.value);
          }}
          pattern={pattern}
          {...other}
        />
        {type === "password" && !disabled ? (
          <button
            className={tremorTwMerge(
              makeInputClassName("toggleButton"),
              "absolute inset-y-0 right-0 flex items-center rounded-lg px-2.5",
            )}
            type="button"
            onClick={() => toggleIsPasswordVisible()}
            aria-label={isPasswordVisible ? "Hide password" : "Show Password"}
          >
            {isPasswordVisible ? (
              <EyeOffIcon
                className={tremorTwMerge(
                  // common
                  "h-5 w-5 flex-none transition",
                  // light
                  "text-tremor-content-subtle hover:text-tremor-content",
                  // dark
                  "dark:text-dark-tremor-content-subtle dark:hover:text-dark-tremor-content",
                )}
                aria-hidden
              />
            ) : (
              <EyeIcon
                className={tremorTwMerge(
                  // common
                  "h-5 w-5 flex-none transition",
                  // light
                  "text-tremor-content-subtle hover:text-tremor-content",
                  // dark
                  "dark:text-dark-tremor-content-subtle dark:hover:text-dark-tremor-content",
                )}
                aria-hidden
              />
            )}
          </button>
        ) : null}
        {error ? (
          <ExclamationFilledIcon
            className={tremorTwMerge(
              makeInputClassName("errorIcon"),
              "absolute right-0 flex h-5 w-5 shrink-0 items-center text-red-500",
              type === "password"
                ? "mr-10"
                : type === "number"
                  ? stepper
                    ? "mr-20"
                    : "mr-3"
                  : "mx-2.5",
            )}
          />
        ) : null}
        {stepper ?? null}
      </div>
      {error && errorMessage ? (
        <p
          className={tremorTwMerge(makeInputClassName("errorMessage"), "mt-1 text-sm text-red-500")}
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
});

BaseInput.displayName = "BaseInput";

export default BaseInput;
