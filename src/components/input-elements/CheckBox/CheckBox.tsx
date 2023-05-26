import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { makeClassName } from "lib";

const makeCheckboxClassName = makeClassName("Checkbox");
export interface CheckBoxProps {
  label: string;
  onChange: (checked: boolean) => void;
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  checkBoxClassName?: string;
}

const CheckBox = React.forwardRef<HTMLDivElement, CheckBoxProps>(
  (
    {
      label,
      onChange,
      checked,
      className,
      defaultChecked = false,
      disabled = false,
      containerClassName,
      labelClassName,
      checkBoxClassName,
    }: CheckBoxProps,
    ref,
  ) => {
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
        className={twMerge(
          "flex items-center",
          makeCheckboxClassName("root"),
          containerClassName,
          className,
        )}
      >
        <input
          type="checkbox"
          className={twMerge("cursor-pointer", checkBoxClassName)}
          checked={value}
          onChange={handleChange}
          disabled={disabled}
        />
        <label className={twMerge("ml-2", labelClassName)}>{label}</label>
      </div>
    );
  },
);

CheckBox.displayName = "CheckBox";

export default CheckBox;
