"use client";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeRadioGroupClassName = makeClassName("RadioGroup");

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: any) => void; // @SEV: does this need to be declared here? see e.g. BaseInput
  disabled?: boolean;
  name?: string;
  id?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const { defaultValue, value, onChange, children, disabled, name, id, className, ...other } =
    props;

  return (
    <HeadlessRadioGroup
      as="div"
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
      id={id}
      className={tremorTwMerge(makeRadioGroupClassName("root"), className)}
      {...other}
    >
      {children}
    </HeadlessRadioGroup>
  );
});

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
