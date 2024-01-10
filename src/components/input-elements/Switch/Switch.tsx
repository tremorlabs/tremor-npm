"use client";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { useInternalState } from "hooks";
import {
  Color,
  makeClassName,
  tremorTwMerge,
  colorPalette,
  getColorClassNames,
  mergeRefs,
} from "lib";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

import React, { useState } from "react";

const getSwitchColors = (color?: Color) => {
  return {
    bgColor: color
      ? getColorClassNames(color, colorPalette.background).bgColor
      : "bg-tremor-brand dark:bg-dark-tremor-brand",
    ringColor: color
      ? getColorClassNames(color, colorPalette.ring).ringColor
      : "ring-tremor-brand-muted dark:ring-dark-tremor-brand-muted",
  };
};

const makeSwitchClassName = makeClassName("Switch");

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
  color?: Color;
  name?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  tooltip?: string;
}

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>((props, ref) => {
  const {
    checked,
    defaultChecked = false,
    onChange,
    color,
    name,
    error,
    errorMessage,
    disabled,
    required,
    tooltip,
    id,
    ...other
  } = props;
  const switchColorStyles = getSwitchColors(color);

  const [isChecked, setIsChecked] = useInternalState(defaultChecked, checked);
  const [isFocused, setIsFocused] = useState(false);
  const delay = 300;
  const { tooltipProps, getReferenceProps } = useTooltip(delay);

  return (
    <div className="flex flex-row items-center justify-start">
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={mergeRefs([ref, tooltipProps.refs.setReference])}
        className={tremorTwMerge(makeSwitchClassName("root"), "flex flex-row relative h-5")}
        {...other}
        {...getReferenceProps}
      >
        <input
          type="checkbox"
          className={tremorTwMerge(
            makeSwitchClassName("input"),
            "absolute w-5 h-5 cursor-pointer left-0 top-0 opacity-0",
          )}
          name={name}
          required={required}
          checked={isChecked}
          onChange={(e) => {
            e.preventDefault();
          }}
        />
        <HeadlessSwitch
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e);
            onChange?.(e);
          }}
          disabled={disabled}
          className={tremorTwMerge(
            makeSwitchClassName("switch"),
            "w-10 h-5 group relative inline-flex flex-shrink-0 cursor-pointer items-center justify-center rounded-tremor-full",
            "focus:outline-none",
            disabled ? "cursor-not-allowed" : "",
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          id={id}
        >
          <span className={tremorTwMerge(makeSwitchClassName("sr-only"), "sr-only")}>
            Switch {isChecked ? "on" : "off"}
          </span>
          <span
            aria-hidden="true"
            className={tremorTwMerge(
              makeSwitchClassName("background"),
              isChecked ? switchColorStyles.bgColor : "bg-tremor-border dark:bg-dark-tremor-border",
              "pointer-events-none absolute mx-auto h-3 w-9 rounded-tremor-full transition-colors duration-100 ease-in-out",
            )}
          />
          <span
            aria-hidden="true"
            className={tremorTwMerge(
              makeSwitchClassName("round"),
              isChecked
                ? tremorTwMerge(
                    switchColorStyles.bgColor,
                    "translate-x-5 border-tremor-background dark:border-dark-tremor-background",
                  )
                : "translate-x-0 bg-tremor-border dark:bg-dark-tremor-border border-tremor-background dark:border-dark-tremor-background",
              "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-tremor-full border-2 shadow-tremor-input duration-100 ease-in-out transition",
              isFocused ? tremorTwMerge("ring-2", switchColorStyles.ringColor) : "",
            )}
          />
        </HeadlessSwitch>
      </div>
      {error && errorMessage ? (
        <p
          className={tremorTwMerge(
            makeSwitchClassName("errorMessage"),
            "text-sm text-red-500 mt-1 ",
          )}
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
});

Switch.displayName = "Switch";

export default Switch;
