"use client";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { makeClassName } from "lib";

export interface CheckboxProps {
  onChange: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
}

const makeCheckboxClassName = makeClassName("Checkbox");

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>((props, ref) => {
  const { onChange, checked, defaultChecked, disabled, className, ...other } = props;

  const [value, setValue] = useState(checked !== undefined ? checked : defaultChecked);

  useEffect(() => {
    checked !== undefined && setValue(checked);
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
    setValue(checked !== undefined ? checked : e.target.checked);
  };

  return (
    <div
      ref={ref}
      className={twMerge("flex items-center", makeCheckboxClassName("root"), className)}
      {...other}
    >
      <input
        type="checkbox"
        className={twMerge("cursor-pointer disabled:cursor-not-allowed")}
        checked={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
