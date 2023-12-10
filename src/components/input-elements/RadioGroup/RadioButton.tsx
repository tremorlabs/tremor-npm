"use client";
import { useInternalState } from "hooks";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

// const getSwitchColors = (color?: Color) => {
//   return {
//     bgColor: color
//       ? getColorClassNames(color, colorPalette.background).bgColor
//       : "bg-tremor-brand dark:bg-dark-tremor-brand",
//     ringColor: color
//       ? getColorClassNames(color, colorPalette.ring).ringColor
//       : "ring-tremor-brand-muted dark:ring-dark-tremor-brand-muted",
//   };
// };

export interface CheckboxProps {
  onChange: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
}

const makeRadioButtonClassName = makeClassName("RadioButton");

const RadioButton = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { onChange, checked, defaultChecked = false, disabled, className, ...other } = props;

  const [isChecked, setIsChecked] = useInternalState(defaultChecked, checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
    setIsChecked(e.target.checked);
  };

  return (
    <input
      ref={ref}
      type="radio"
      disabled={disabled}
      defaultChecked={isChecked}
      onChange={handleChange}
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
      {...other}
    />
  );
});

RadioButton.displayName = "RadioButton";

export default RadioButton;
