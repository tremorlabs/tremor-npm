"use client";
import { RadioGroup as HeadlessChoiceboxGroup } from "@headlessui/react";
import { CheckCircleIcon } from "assets";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeChoiceboxGroupOptionClassName = makeClassName("ChoiceboxGroup");

export interface ChoiceboxGroupOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  disabled?: boolean;
  label: string;
  description?: string;
}

const ChoiceboxGroupOption = React.forwardRef<HTMLDivElement, ChoiceboxGroupOptionProps>(
  (props, ref) => {
    const { value, label, description, disabled, className, ...other } = props;

    return (
      <HeadlessChoiceboxGroup.Option
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
                <HeadlessChoiceboxGroup.Label
                  as="span"
                  className="block text-sm font-medium text-slate-900"
                >
                  {label}
                </HeadlessChoiceboxGroup.Label>
                <HeadlessChoiceboxGroup.Description
                  as="span"
                  className="mt-1 flex items-center text-sm text-slate-500"
                >
                  {description}
                </HeadlessChoiceboxGroup.Description>
              </span>
            </span>
            <CheckCircleIcon
              className={tremorTwMerge(
                makeChoiceboxGroupOptionClassName("Icon"),
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
      </HeadlessChoiceboxGroup.Option>
    );
  },
);

ChoiceboxGroupOption.displayName = "ChoiceboxGroupOption";

export default ChoiceboxGroupOption;
