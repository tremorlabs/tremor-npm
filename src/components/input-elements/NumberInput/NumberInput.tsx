import React, { useRef } from "react";
import { makeClassName, mergeRefs, tremorTwMerge } from "lib";
import { PlusIcon, MinusIcon } from "assets";
import BaseInput, { BaseInputProps } from "../BaseInput";

export interface NumberInputProps
  extends Omit<BaseInputProps, "type" | "stepper" | "onSubmit" | "makeInputClassName"> {
  step?: string;
  enableStepper?: boolean;
  onSubmit?: (value: number) => void;
  onValueChange?: (value: number) => void;
}

const baseArrowClasses =
  "flex mx-auto text-tremor-content-subtle dark:text-dark-tremor-content-subtle";

const enabledArrowClasses =
  "cursor-pointer hover:text-tremor-content dark:hover:text-dark-tremor-content";

const stepDelay = 600;
const stepInterval = 100;

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

  // for long press to step up/down
  const stepTimeoutRef = useRef<number | null>(null);
  const onStopStepping = () => {
    stepTimeoutRef && clearTimeout(stepTimeoutRef.current!);
  };
  const onStepMouseDown = React.useCallback((e: React.MouseEvent, up: boolean) => {
    e.preventDefault();
    onStopStepping();

    up ? inputRef.current?.stepUp() : inputRef.current?.stepDown();
    inputRef.current?.dispatchEvent(new Event("input", { bubbles: true }));

    function step() {
      up ? inputRef.current?.stepUp() : inputRef.current?.stepDown();
      inputRef.current?.dispatchEvent(new Event("input", { bubbles: true }));
      stepTimeoutRef.current = setTimeout(step, stepInterval) as unknown as number;
    }
    stepTimeoutRef.current = setTimeout(step, stepDelay) as unknown as number;
  }, []);

  React.useEffect(() => {
    return () => {
      onStopStepping();
    };
  }, []);

  return (
    <BaseInput
      type="number"
      ref={mergeRefs([inputRef, ref])}
      disabled={disabled}
      makeInputClassName={makeClassName("NumberInput")}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.ctrlKey && !e.altKey && !e.shiftKey) {
          onStopStepping();
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
              onMouseDown={(e) => {
                e.preventDefault();
                if (disabled) return;
                onStepMouseDown(e, false);
              }}
              onTouchStart={(e) => e.preventDefault()}
              onMouseUp={() => onStopStepping()}
              onMouseLeave={() => onStopStepping()}
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
              onMouseDown={(e) => {
                e.preventDefault();
                if (disabled) return;
                onStepMouseDown(e, true);
              }}
              onTouchStart={(e) => e.preventDefault()}
              onMouseUp={() => onStopStepping()}
              onMouseLeave={() => onStopStepping()}
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
