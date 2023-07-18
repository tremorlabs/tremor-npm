"use client";
import BaseInput from "assets/BaseInput";
import React, { useRef } from "react";
import type { BaseInputProps } from "assets/BaseInput";
import { makeClassName, tremorTwMerge } from "lib";
import { ArrowDownHeadIcon, ArrowUpHeadIcon } from "assets";

export type NumberInputProps = Omit<BaseInputProps, "type" | "numberControllers" | "onSubmit"> & {
  min?: string;
  max?: string;
  step?: string;
  onSubmit?: (value: number) => void;
  onValueChange?: (value: number) => void;
};

const makeNumberInputClassName = makeClassName("NumberInput");
const baseArrowClasses = "flex px-2 text-tremor-content-subtle";
const enabledArrowClasses = "cursor-pointer hover:text-tremor-content";
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ onSubmit, ...restProps }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <BaseInput
        type="number"
        {...restProps}
        makeInputClassName={makeNumberInputClassName}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            const value = inputRef.current?.value;
            onSubmit?.(parseFloat(value ?? ""));
          }
        }}
        numberControllers={
          <div
            className={tremorTwMerge(
              "flex justify-center align-middle flex-col border-l",
              "border-tremor-border dark:border-dark-tremor-border",
            )}
          >
            <div
              onClick={() => {
                if (restProps.disabled) return;
                inputRef.current?.stepUp();
                restProps.onValueChange?.(parseFloat(inputRef.current?.value ?? ""));
              }}
              className={tremorTwMerge(
                !restProps.disabled && enabledArrowClasses,
                baseArrowClasses,
              )}
            >
              <ArrowUpHeadIcon data-testid="arrow-up" width="20px" height="20px" />
            </div>

            <hr className="absolute w-9 right-0 border-tremor-border dark:border-dark-tremor-border" />
            <div
              onClick={() => {
                if (restProps.disabled) return;
                inputRef.current?.stepDown();
                restProps.onValueChange?.(parseFloat(inputRef.current?.value ?? ""));
              }}
              className={tremorTwMerge(
                !restProps.disabled && enabledArrowClasses,
                baseArrowClasses,
              )}
            >
              <ArrowDownHeadIcon data-testid="arrow-down" width="20px" height="20px" />
            </div>
          </div>
        }
        ref={inputRef}
        onChange={(e) => {
          if (restProps.disabled) return;

          restProps.onValueChange?.(parseFloat(e.target.value));
          restProps.onChange?.(e);
        }}
      />
    );
  },
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
