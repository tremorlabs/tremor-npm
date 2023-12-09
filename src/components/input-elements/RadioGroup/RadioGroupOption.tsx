"use client";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "assets";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeRadioGroupOptionClassName = makeClassName("RadioGroup");

export interface RadioGroupOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  disabled?: boolean;
  label: string;
  description?: string;
}

const RadioGroupOption = React.forwardRef<HTMLDivElement, RadioGroupOptionProps>((props, ref) => {
  const { value, label, description, disabled, className, ...other } = props;

  return (
    <HeadlessRadioGroup.Option
      as="div"
      ref={ref}
      value={value}
      disabled={disabled}
      className={({ active }) =>
        tremorTwMerge(
          active
            ? "border border-blue-400 ring-2 ring-blue-200 transition-all"
            : "ring-1 ring-gray-200 border-transparent ",
          "relative flex rounded-lg border bg-white p-4 shadow-sm transition-all",
          disabled ? "cursor-default" : "cursor-pointer",
          className,
        )
      }
      {...other}
    >
      {({ checked, active }) => (
        <>
          <span className="flex flex-1">
            <span className="flex flex-col">
              <HeadlessRadioGroup.Label
                as="span"
                className="block text-sm font-medium text-slate-900"
              >
                {label}
              </HeadlessRadioGroup.Label>
              <HeadlessRadioGroup.Description
                as="span"
                className="mt-1 flex items-center text-sm text-slate-500"
              >
                {description}
              </HeadlessRadioGroup.Description>
            </span>
          </span>
          <CheckCircleIcon
            className={tremorTwMerge(
              makeRadioGroupOptionClassName("Icon"),
              !checked ? "invisible" : "",
              "h-5 w-5 text-blue-500",
            )}
            aria-hidden="true"
          />
          <span
            className={tremorTwMerge(
              active ? "border" : "",
              checked ? "border border-blue-400 ring-2 ring-blue-200" : "border-transparent",
              "pointer-events-none absolute -inset-px rounded-lg",
            )}
            aria-hidden="true"
          />
        </>
      )}
    </HeadlessRadioGroup.Option>
  );
});

RadioGroupOption.displayName = "RadioGroupOption";

export default RadioGroupOption;
