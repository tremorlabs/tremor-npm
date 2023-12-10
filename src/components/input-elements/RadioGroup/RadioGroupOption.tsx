"use client";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeRadioGroupOptionClassName = makeClassName("RadioGroupOption");

export interface RadioGroupOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  disabled?: boolean;
}

const RadioGroupOption = React.forwardRef<HTMLDivElement, RadioGroupOptionProps>((props, ref) => {
  const { value, disabled, className, children, ...other } = props;

  return (
    <HeadlessRadioGroup.Option
      as="div"
      ref={ref}
      value={value}
      disabled={disabled}
      className={tremorTwMerge(
        makeRadioGroupOptionClassName("root"),
        "flex flex-nowrap items-center gap-3 cursor-pointer",
        "ui-disabled:opacity-50 ui-disabled:cursor-not-allowed",
        className,
      )}
      {...other}
    >
      <div
        className={tremorTwMerge(
          "h-4 w-4 flex-shrink-0 rounded-tremor-full border flex items-center justify-center",
          // light
          "bg-tremor-background border-tremor-border",
          "ui-checked:bg-tremor-brand ui-checked:border-transparent",
          // dark
          "dark:bg-dark-tremor-background dark:border-dark-tremor-border",
          "dark:ui-checked:bg-tremor-brand dark:ui-checked:border-transparent",
        )}
        aria-hidden="true"
      >
        <span
          className={tremorTwMerge(
            "rounded-tremor-full w-1.5 h-1.5 ui-checked:scale-100 scale-0 transition-transform duration-150 ease-out",
            //light
            "bg-tremor-background",
            // dark
            "dark:bg-dark-tremor-background",
          )}
        />
      </div>
      {children}
    </HeadlessRadioGroup.Option>
  );
});

RadioGroupOption.displayName = "RadioGroupOption";

export default RadioGroupOption;
