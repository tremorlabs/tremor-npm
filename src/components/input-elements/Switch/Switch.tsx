"use client";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { useInternalState } from "hooks";
import { Color, tremorTwMerge } from "lib";

import React, { useState } from "react";
import { tv } from "tailwind-variants";

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
  id?: string;
}

const switchColors: { [color in Color]: string } = {
  brand: "bg-tremor-brand-default",
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  zinc: "bg-zinc-500",
  neutral: "bg-neutral-500",
  stone: "bg-stone-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  lime: "bg-lime-500",
  green: "bg-green-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  cyan: "bg-cyan-500",
  sky: "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  purple: "bg-purple-500",
  fuchsia: "bg-fuchsia-500",
  pink: "bg-pink-500",
  rose: "bg-rose-500",
};

const badgeStyles = tv({
  variants: {
    color: { ...switchColors },
  },
  defaultVariants: {
    color: "brand",
  },
});

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      color = "brand",
      name,
      error,
      errorMessage,
      disabled,
      required,
      id,
      ...other
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = useInternalState(defaultChecked, checked);
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="flex flex-row items-center justify-start">
        <div ref={ref} className={tremorTwMerge("relative flex h-5 flex-row")} {...other}>
          <input
            type="checkbox"
            className={tremorTwMerge("absolute top-0 left-0 h-5 w-5 cursor-pointer opacity-0")}
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
              "group rounded-tremor-full relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center justify-center focus:outline-none",
              disabled ? "cursor-not-allowed" : "",
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            id={id}
          >
            <span className={tremorTwMerge("sr-only")}>Switch {isChecked ? "on" : "off"}</span>
            <span
              aria-hidden="true"
              className={tremorTwMerge(
                "rounded-tremor-full pointer-events-none absolute mx-auto h-3 w-9 transition-colors duration-100 ease-in-out",
                isChecked ? badgeStyles({ color }) : "bg-tremor-border-default",
              )}
            />
            <span
              aria-hidden="true"
              className={tremorTwMerge(
                isChecked
                  ? tremorTwMerge(
                      badgeStyles({ color }),
                      "border-tremor-background-default translate-x-5",
                    )
                  : "bg-tremor-border-default border-tremor-background-default translate-x-0",
                "rounded-tremor-full shadow-tremor-input pointer-events-none absolute left-0 inline-block h-5 w-5 transform border-2 transition duration-100 ease-in-out",
                isFocused ? tremorTwMerge("ring-2", "ring-blue-300 dark:ring-blue-700") : "",
              )}
            />
          </HeadlessSwitch>
        </div>
        {error && errorMessage ? (
          <p className={tremorTwMerge("mt-1 text-sm text-red-500")}>{errorMessage}</p>
        ) : null}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;
