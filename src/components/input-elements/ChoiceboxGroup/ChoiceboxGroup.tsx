"use client";
import { RadioGroup as HeadlessChoiceboxGroup } from "@headlessui/react";
import { tremorTwMerge } from "lib";
import React from "react";

export interface ChoiceboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

const ChoiceboxGroup = React.forwardRef<HTMLDivElement, ChoiceboxGroupProps>((props, ref) => {
  const { defaultValue, value, onValueChange, disabled = false, name, className, children } = props;

  return (
    <HeadlessChoiceboxGroup
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
    </HeadlessChoiceboxGroup>
  );
});

ChoiceboxGroup.displayName = "ChoiceboxGroup";

export default ChoiceboxGroup;
