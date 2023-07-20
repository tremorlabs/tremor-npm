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
const baseArrowClasses =
  "flex px-2 py-px mx-auto text-tremor-content-subtle dark:text-dark-tremor-content-subtle";
const enabledArrowClasses =
  "cursor-pointer hover:text-tremor-content dark:hover:text-dark-tremor-content";
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ onSubmit, ...restProps }) => {
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
        {...restProps}
        makeInputClassName={makeNumberInputClassName}
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
        numberControllers={
          <div
            className={tremorTwMerge(
              "flex justify-center align-middle flex-col border-l -py-3",
              "border-tremor-border dark:border-dark-tremor-border",
            )}
          >
            <div
              tabIndex={-1}
              onClick={() => {
                if (restProps.disabled) return;
                inputRef.current?.stepUp();
                restProps.onValueChange?.(parseFloat(inputRef.current?.value ?? ""));
              }}
              className={tremorTwMerge(
                !restProps.disabled && enabledArrowClasses,
                baseArrowClasses,
                "group",
              )}
            >
              <ArrowUpHeadIcon
                data-testid="arrow-up"
                className={`${
                  isArrowUpPressed ? "-translate-y-[1px]" : ""
                } h-4 w-4 duration-75 transition group-active:-translate-y-[1px]`}
              />
            </div>

            <hr className="absolute w-8 right-0 border-tremor-border dark:border-dark-tremor-border" />
            <div
              tabIndex={-1}
              onClick={() => {
                if (restProps.disabled) return;
                inputRef.current?.stepDown();
                restProps.onValueChange?.(parseFloat(inputRef.current?.value ?? ""));
              }}
              className={tremorTwMerge(
                !restProps.disabled && enabledArrowClasses,
                baseArrowClasses,
                "active:translate-y-[1px]",
              )}
            >
              <ArrowDownHeadIcon
                data-testid="arrow-down"
                className={`${
                  isArrowDownPressed ? "translate-y-[1px]" : ""
                } h-4 w-4 duration-75 transition`}
              />
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
