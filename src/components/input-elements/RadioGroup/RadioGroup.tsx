"use client";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { tremorTwMerge } from "lib";
import React from "react";

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const { defaultValue, value, onValueChange, disabled = false, name, className, children } = props;

  return (
    <HeadlessRadioGroup
      as="div"
      ref={ref}
      disabled={disabled}
      name={name}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => {
        console.log(e);
        onValueChange?.(e);
      }}
      className={tremorTwMerge("flex gap-2", className)}
    >
      {children}
    </HeadlessRadioGroup>
  );
});

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
