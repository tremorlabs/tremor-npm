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
  // id automatisch?
  // name automatisch?
}

const makeCheckboxClassName = makeClassName("Checkbox");

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
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
    <input
      ref={ref}
      type="checkbox"
      className={twMerge(
        makeCheckboxClassName("root"),
        // common
        "h-4 w-4 appearance-none cursor-pointer disabled:cursor-not-allowed rounded-tremor-small border-2 focus:ring-0 focus:outline-none focus:outline-transparent checked:border-0 checked:border-transparent focus:ring-transparent focus-visible:ring-2 transition bg-transparent",
        // light
        "border-tremor-border  text-tremor-brand focus-visible:ring-tremor-brand disabled:bg-tremor-background-muted",
        // dark
        "dark:border-dark-tremor-border  dark:text-dark-tremor-brand dark:focus-visible:ring-dark-tremor-brand dark:disabled:bg-dark-tremor-background-muted",
        className,
      )}
      checked={value}
      onChange={handleChange}
      disabled={disabled}
      {...other}
    />
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
