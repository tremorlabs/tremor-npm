"use client";
import { getSelectButtonColors, hasValue } from "components/input-elements/selectUtils";
import { useInternalState } from "hooks";

import { mergeRefs, tremorTwMerge } from "lib";
import React, { useEffect, useRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  defaultValue?: string | number;
  value?: string | number;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  autoHeight?: boolean;
  onValueChange?: (value: any) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    value,
    defaultValue = "",
    placeholder = "Type...",
    error = false,
    errorMessage,
    disabled = false,
    className,
    onChange,
    onValueChange,
    autoHeight = false,
    ...other
  } = props;
  const [val, setVal] = useInternalState(defaultValue, value);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasSelection = hasValue(val);

  useEffect(() => {
    const textAreaHTMLRef = inputRef.current;
    if (autoHeight && textAreaHTMLRef) {
      textAreaHTMLRef.style.height = "60px";
      // Calculates the height dynamically
      const scrollHeight = textAreaHTMLRef.scrollHeight;
      textAreaHTMLRef.style.height = scrollHeight + "px";
    }
  }, [autoHeight, inputRef, val]);
  return (
    <>
      <textarea
        ref={mergeRefs([inputRef, ref])}
        value={val}
        placeholder={placeholder}
        disabled={disabled}
        className={tremorTwMerge(
          "rounded-tremor-default text-tremor-default shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted flex w-full items-center border px-3 py-2 transition duration-100 outline-none focus:ring-2",

          getSelectButtonColors(hasSelection, disabled, error),
          disabled
            ? "placeholder:text-tremor-content-subtle"
            : "placeholder:text-tremor-content-default",
          className,
        )}
        data-testid="text-area"
        onChange={(e) => {
          onChange?.(e);
          setVal(e.target.value);
          onValueChange?.(e.target.value);
        }}
        {...other}
      />
      {error && errorMessage ? (
        <p className={tremorTwMerge("mt-1 text-sm text-red-500")}>{errorMessage}</p>
      ) : null}
    </>
  );
});

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
