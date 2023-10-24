"use client";
import { getSelectButtonColors, hasValue } from "components/input-elements/selectUtils";
import { border, makeClassName, mergeRefs, tremorTwMerge } from "lib";
import React, { useRef, useState } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  defaultValue?: string | number;
  value?: string | number;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onValueChange?: (value: any) => void;
}

const makeTextareaClassName = makeClassName("Textarea");

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    value,
    defaultValue,
    placeholder = "Type...",
    error = false,
    errorMessage,
    disabled = false,
    className,
    onChange,
    onValueChange,
    children,
    ...other
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      <textarea
        ref={mergeRefs([inputRef, ref])}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={tremorTwMerge(
          makeTextareaClassName("Textarea"), //@sev
          // common
          "w-full flex items-center outline-none rounded-tremor-default px-3 py-2 text-sm",
          // light
          "shadow-tremor-input text-rose-500",
          // dark
          "dark:shadow-dark-tremor-input  dark:text-dark-tremor-content-emphasis",
          getSelectButtonColors(hasSelection, disabled, error),
          isFocused &&
            tremorTwMerge(
              // common
              "ring-2 transition duration-100",
              // light
              "border-tremor-brand-subtle ring-tremor-brand-muted",
              // dark
              "dark:border-dark-tremor-brand-subtle dark:ring-dark-tremor-brand-muted",
            ),
          border.sm.all,
          disabled
            ? "placeholder:text-tremor-content-subtle dark:placeholder:text-dark-tremor-content-subtle"
            : "placeholder:text-tremor-content dark:placeholder:text-dark-tremor-content",
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
        data-testid="text-area"
        onChange={(e) => {
          onChange?.(e);
          onValueChange?.(e.target.value);
        }}
        {...other}
      >
        {children}
      </textarea>
      {error && errorMessage ? (
        <p
          className={tremorTwMerge(
            makeTextareaClassName("errorMessage"),
            "text-sm text-rose-500 mt-1",
          )}
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
