"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { makeClassName, mergeRefs } from "lib";
import { useInternalState } from "hooks";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  tooltip?: string;
}

const makeCheckboxClassName = makeClassName("Checkbox");

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    onChange,
    checked,
    defaultChecked = false,
    disabled,
    required,
    id,
    tooltip,
    className,
    ...other
  } = props;
  const [isChecked, setIsChecked] = useInternalState(defaultChecked, checked);
  const delay = 300;
  const { tooltipProps, getReferenceProps } = useTooltip(delay);

  return (
    <div className="w-fit" ref={mergeRefs([ref, tooltipProps.refs.setReference])}>
      <Tooltip text={tooltip} {...tooltipProps} />
      <input
        {...other}
        {...getReferenceProps}
        type="checkbox"
        className={twMerge(
          makeCheckboxClassName("root"),
          // common
          "h-4 w-4 appearance-none cursor-pointer disabled:cursor-not-allowed rounded-tremor-small border-2 focus:ring-0 focus:outline-none focus:outline-transparent checked:border-0 checked:border-transparent focus:ring-transparent focus-visible:ring-2 transition duration-100 bg-transparent disabled:opacity-50",
          // light
          "border-tremor-border text-tremor-brand focus-visible:ring-tremor-brand",
          // dark
          "dark:border-dark-tremor-border  dark:text-dark-tremor-brand dark:focus-visible:ring-dark-tremor-brand ",
          className,
        )}
        onChange={(e) => {
          onChange?.(e.target.checked);
          setIsChecked(e.target.checked);
        }}
        checked={isChecked}
        disabled={disabled}
        required={required}
        id={id}
      />
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
