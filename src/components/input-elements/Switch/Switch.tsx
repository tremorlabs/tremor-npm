import { Switch as HeadlessSwitch } from "@headlessui/react";
import { useInternalState } from "hooks";
import { Color, colorPalette, getColorClassNames, makeClassName, tremorTwMerge } from "lib";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const makeSwitchClassName = makeClassName("Switch");

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
  color?: Color;
  name?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
}

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>((props, ref) => {
  const {
    checked,
    defaultChecked = false,
    onChange,
    color = "blue",
    name,
    error,
    errorMessage,
    disabled,
    required,
    ...other
  } = props;

  const [isChecked, setIsChecked] = useInternalState(defaultChecked, checked);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div
        ref={ref}
        className={twMerge(makeSwitchClassName("root"), "flex flex-col relative h-5")}
        {...other}
      >
        <input
          type="checkbox"
          className={tremorTwMerge(
            makeSwitchClassName("input"),
            "absolute w-5 h-5 cursor-pointer left-0 top-0 opacity-0",
          )}
          name={name}
          required={required}
          checked={isChecked}
          onChange={(e) => {
            e.preventDefault();
          }}
        />
        <HeadlessSwitch
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e);
            onChange?.(e);
          }}
          disabled={disabled}
          className={tremorTwMerge(
            makeSwitchClassName("switch"),
            "w-10 h-5  group relative inline-flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full",
            "focus:outline-none",
            disabled ? "opacity-50 cursor-not-allowed" : "",
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <span className={tremorTwMerge(makeSwitchClassName("sr-only"), "sr-only")}>
            Switch {isChecked ? "on" : "off"}
          </span>
          {/* <span
          aria-hidden="true"
          className={tremorTwMerge(
            makeSwitchClassName("background"),
            "pointer-events-none absolute h-full w-full rounded-md bg-white",
          )}
        /> */}
          <span
            aria-hidden="true"
            className={tremorTwMerge(
              makeSwitchClassName("background"),
              isChecked
                ? getColorClassNames(color, colorPalette.background).bgColor
                : "bg-gray-200",
              "pointer-events-none absolute mx-auto h-3.5 w-9 rounded-full transition-colors duration-200 ease-in-out",
            )}
          />
          <span
            aria-hidden="true"
            className={tremorTwMerge(
              makeSwitchClassName("round"),
              isChecked
                ? tremorTwMerge(
                    getColorClassNames(color, colorPalette.background).bgColor,
                    "translate-x-5 border-white",
                  )
                : "translate-x-0 bg-white border-gray-200",

              "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border-2 shadow transition-transform duration-200 ease-in-out transition duration-100",
              isFocused
                ? twMerge(
                    "ring-2",
                    getColorClassNames(color, colorPalette.lightRing).ringColor,
                  )
                : "",
            )}
          />
        </HeadlessSwitch>
      </div>
      {error && errorMessage ? (
        <p
          className={tremorTwMerge(
            makeSwitchClassName("errorMessage"),
            "text-sm text-rose-500 mt-1 ",
          )}
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
});

Switch.displayName = "Switch";

export default Switch;
