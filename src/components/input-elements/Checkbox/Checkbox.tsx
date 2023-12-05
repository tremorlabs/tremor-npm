"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { makeClassName } from "lib";
import { useInternalState } from "hooks";

export interface CheckboxProps {
  onChange: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
}

const makeCheckboxClassName = makeClassName("Checkbox");

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { onChange, checked, defaultChecked = false, disabled, className, ...other } = props;
  const [isChecked, setIsChecked] = useInternalState(defaultChecked, checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
    setIsChecked(e.target.checked);
  };

  return (
    <input
      ref={ref}
      type="checkbox"
      className={twMerge(
        makeCheckboxClassName("root"),
        // common
        "h-4 w-4 appearance-none cursor-pointer disabled:cursor-not-allowed rounded-tremor-small border-2 focus:ring-0 focus:outline-none focus:outline-transparent checked:border-0 checked:border-transparent focus:ring-transparent focus-visible:ring-2 transition duration-100 bg-transparent",
        // light
        "border-tremor-border  text-tremor-brand focus-visible:ring-tremor-brand disabled:bg-tremor-background-muted",
        // dark
        "dark:border-dark-tremor-border  dark:text-dark-tremor-brand dark:focus-visible:ring-dark-tremor-brand dark:disabled:bg-dark-tremor-background-muted",
        className,
      )}
      checked={isChecked}
      onChange={handleChange}
      disabled={disabled}
      {...other}
    />
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
