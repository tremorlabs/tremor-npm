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
          "rounded-tremor-default shadow-tremor-input relative flex w-full min-w-[10rem] items-center border transition duration-100 outline-none",
          getSelectButtonColors(hasSelection, disabled, error),
          isFocused && tremorTwMerge("border-tremor-brand-subtle ring-tremor-brand-muted ring-2"),
          className,
        )}
      >
        {Icon ? (
          <Icon
            className={tremorTwMerge(
              "text-tremor-content-subtle absolute left-0 mx-2.5 flex h-5 w-5 shrink-0 items-center",
            )}
          />
        ) : null}
        <input
          ref={mergeRefs([inputRef, ref])}
          defaultValue={defaultValue}
          value={value}
          type={isPasswordVisible ? "text" : type}
          className={tremorTwMerge(
            "text-tremor-default rounded-tremor-default text-tremor-content-emphasis w-full [appearance:textfield] border-none bg-transparent py-2 transition duration-100 focus:ring-0 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            type === "password" ? (error ? "pr-16" : "pr-12") : error ? "pr-8" : "pr-3",
            Icon ? "pl-10" : "pl-3",
            disabled
              ? "placeholder:text-tremor-content-subtle"
              : "placeholder:text-tremor-content-default",
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
              "absolute inset-y-0 right-0 flex items-center rounded-lg px-2.5",
            )}
            type="button"
            onClick={() => toggleIsPasswordVisible()}
            aria-label={isPasswordVisible ? "Hide password" : "Show Password"}
          >
            {isPasswordVisible ? (
              <EyeOffIcon
                className={tremorTwMerge(
                  "text-tremor-content-subtle hover:text-tremor-content-default h-5 w-5 flex-none transition",
                )}
                aria-hidden
              />
            ) : (
              <EyeIcon
                className={tremorTwMerge(
                  "text-tremor-content-subtle hover:text-tremor-content-default h-5 w-5 flex-none transition",
                )}
                aria-hidden
              />
            )}
          </button>
        ) : null}
        {error ? (
          <ExclamationFilledIcon
            className={tremorTwMerge(
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
        <p className={tremorTwMerge("mt-1 text-sm text-red-500")}>{errorMessage}</p>
      ) : null}
    </>
  );
});

BaseInput.displayName = "BaseInput";

export default BaseInput;
