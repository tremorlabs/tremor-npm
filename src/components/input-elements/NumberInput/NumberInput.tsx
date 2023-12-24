"use client";
import { MinusIcon, PlusIcon } from "assets";
import { makeClassName, mergeRefs, tremorTwMerge } from "lib";
import React, { useRef } from "react";
import BaseInput, { BaseInputProps } from "../BaseInput";

export interface NumberInputProps
  extends Omit<BaseInputProps, "type" | "stepper" | "onSubmit" | "makeInputClassName"> {
  step?: string | number;
  enableStepper?: boolean;
  onSubmit?: (value: number) => void;
  onValueChange?: (value: number) => void;
}

const baseArrowClasses =
  "flex mx-auto text-tremor-content-subtle dark:text-dark-tremor-content-subtle";

const enabledArrowClasses =
  "cursor-pointer hover:text-tremor-content dark:hover:text-dark-tremor-content";

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const { onSubmit, enableStepper = true, disabled, onValueChange, onChange, ...other } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isArrowDownPressed, setIsArrowDownPressed] = React.useState(false);
  const handleArrowDownPress = React.useCallback(() => {
    setIsArrowDownPressed(true);
  }, []);
  const handleArrowDownRelease = React.useCallback(() => {
    setIsArrowDownPressed(false);
  }, []);

  const [isArrowUpPressed, setIsArrowUpPressed] = React.useState(false);
  const handleArrowUpPress = React.useCallback(() => {
    setIsArrowUpPressed(true);
  }, []);
  const handleArrowUpRelease = React.useCallback(() => {
    setIsArrowUpPressed(false);
  }, []);

  return (
    <BaseInput
      type="number"
      ref={mergeRefs([inputRef, ref])}
      disabled={disabled}
      makeInputClassName={makeClassName("NumberInput")}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.ctrlKey && !e.altKey && !e.shiftKey) {
          const value = inputRef.current?.value;
          onSubmit?.(parseFloat(value ?? ""));
        }
        if (e.key === "ArrowDown") {
          handleArrowDownPress();
        }
        if (e.key === "ArrowUp") {
          handleArrowUpPress();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "ArrowDown") {
          handleArrowDownRelease();
        }
        if (e.key === "ArrowUp") {
          handleArrowUpRelease();
        }
      }}
      onChange={(e) => {
        if (disabled) return;

        onValueChange?.(parseFloat(e.target.value));
        onChange?.(e);
      }}
      stepper={
        enableStepper ? (
          <div className={tremorTwMerge("flex justify-center align-middle")}>
            <div
              tabIndex={-1}
              onClick={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => {
                if (e.cancelable) {
                  e.preventDefault();
                }
              }}
              onMouseUp={() => {
                if (disabled) return;
                inputRef.current?.stepDown();
                inputRef.current?.dispatchEvent(new Event("input", { bubbles: true }));
              }}
              className={tremorTwMerge(
                !disabled && enabledArrowClasses,
                baseArrowClasses,
                "group py-[10px] px-2.5 border-l border-tremor-border dark:border-dark-tremor-border",
              )}
            >
              <MinusIcon
                data-testid="step-down"
                className={`${
                  isArrowDownPressed ? "scale-95" : ""
                } h-4 w-4 duration-75 transition group-active:scale-95`}
              />
            </div>
            <div
              tabIndex={-1}
              onClick={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => {
                if (e.cancelable) {
                  e.preventDefault();
                }
              }}
              onMouseUp={() => {
                if (disabled) return;
                inputRef.current?.stepUp();
                inputRef.current?.dispatchEvent(new Event("input", { bubbles: true }));
              }}
              className={tremorTwMerge(
                !disabled && enabledArrowClasses,
                baseArrowClasses,
                "group py-[10px] px-2.5 border-l border-tremor-border dark:border-dark-tremor-border",
              )}
            >
              <PlusIcon
                data-testid="step-up"
                className={`${
                  isArrowUpPressed ? "scale-95" : ""
                } h-4 w-4 duration-75 transition group-active:scale-95`}
              />
            </div>
          </div>
        ) : null
      }
      {...other}
    />
  );
});

NumberInput.displayName = "NumberInput";

export default NumberInput;
