"use client";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeRadioGroupOptionClassName = makeClassName("RadioGroup");

export interface RadioGroupOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string[];
  disabled?: boolean;
}

const RadioGroupOption = React.forwardRef<HTMLDivElement, RadioGroupOptionProps>((props, ref) => {
  const { value, children, disabled, className, ...other } = props;

  return (
    <HeadlessRadioGroup.Option
      as="div"
      ref={ref}
      value={value}
      disabled={disabled}
      className={tremorTwMerge(makeRadioGroupOptionClassName("root"), className)}
      {...other}
    >
      {children}
    </HeadlessRadioGroup.Option>
  );
});

RadioGroupOption.displayName = "RadioGroupOption";

export default RadioGroupOption;
