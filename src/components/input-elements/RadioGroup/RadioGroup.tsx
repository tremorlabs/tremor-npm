"use client";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: any) => void; //sev
  disabled?: boolean;
  name?: string;
}

const makeRadioGroupClassName = makeClassName("RadioGroup");

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    disabled = false,
    name,
    className,
    children,
    ...other
  } = props;

  return (
    <HeadlessRadioGroup
      as="div"
      ref={ref}
      disabled={disabled}
      name={name}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => {
        onValueChange?.(e);
      }}
      className={tremorTwMerge(
        makeRadioGroupClassName("root"),
        "disabled:opacity-50 flex gap-2",
        className,
      )}
      {...other}
    >
      {children}
    </HeadlessRadioGroup>
  );
});

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
