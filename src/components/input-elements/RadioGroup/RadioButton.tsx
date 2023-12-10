"use client";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

export interface CheckboxProps {
  className?: string;
}

const makeRadioButtonClassName = makeClassName("RadioButton");

const RadioButton = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { className, ...other } = props;

  return (
    <input
      {...other}
      ref={ref}
      type="radio"
      className={tremorTwMerge(
        makeRadioButtonClassName("root"),
        "h-4 w-4",
        // light
        "border-gray-300 text-tremor-brand",
        // dark
        "dark:border-gray-700 dark:text-dark-tremor-brand",
        // disabled
        "ui-disabled:opacity-50 ui-disabled:cursor-not-allowed",
        className,
      )}
    />
  );
});

RadioButton.displayName = "RadioButton";

export default RadioButton;
