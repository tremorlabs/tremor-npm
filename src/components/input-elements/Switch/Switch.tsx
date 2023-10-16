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

  return (
    <div ref={ref} className={twMerge(makeSwitchClassName("root"), "relative h-5 w-10")} {...other}>
      <input
        type="checkbox"
        className={tremorTwMerge(
          makeSwitchClassName("input"),
          "absolute w-full h-full cursor-pointer left-0 top-0 opacity-0",
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
        className={tremorTwMerge(
          makeSwitchClassName("switch"),
          "group relative inline-flex w-full h-full flex-shrink-0 cursor-pointer items-center justify-center rounded-full",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        )}
      >
        <span className={tremorTwMerge(makeSwitchClassName("sr-only"), "sr-only")}>
          Switch {isChecked ? "on" : "off"}
        </span>
        <span
          aria-hidden="true"
          className={tremorTwMerge(
            makeSwitchClassName("background"),
            "pointer-events-none absolute h-full w-full rounded-md bg-white",
          )}
        />
        <span
          aria-hidden="true"
          className={tremorTwMerge(
            makeSwitchClassName("background"),
            isChecked ? getColorClassNames(color, colorPalette.background).bgColor : "bg-gray-200",
            "pointer-events-none absolute mx-auto h-3.5 w-9 rounded-full transition-colors duration-200 ease-in-out",
          )}
        />
        {/* ADD FOCUS STATE */}
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

            "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border-2 shadow transition-transform duration-200 ease-in-out foucs:ring-2 transition duration-100 focus:border-blue-400 focus:ring-blue-200",
          )}
        />
      </HeadlessSwitch>
      {error && errorMessage ? (
        <p
          className={tremorTwMerge(
            makeSwitchClassName("errorMessage"),
            "text-sm text-red-500 mt-5",
          )}
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
});

Switch.displayName = "Switch";

export default Switch;
