"use client";

import { ArrowDownHeadIcon, XCircleIcon } from "assets";
import React, { useMemo } from "react";
import { border, makeClassName, sizing, spacing } from "lib";
import { constructValueToNameMapping, getSelectButtonColors, hasValue } from "../selectUtils";

import { Listbox } from "@headlessui/react";
import { tremorTwMerge } from "lib";
import { useInternalState } from "hooks";

const makeSelectClassName = makeClassName("Select");

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.JSXElementConstructor<any>;
  enableClear?: boolean;
  children: React.ReactElement[] | React.ReactElement;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    placeholder = "Select...",
    disabled = false,
    icon,
    enableClear = false,
    children,
    className,
    ...other
  } = props;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const Icon = icon;
  const valueToNameMapping = useMemo(() => constructValueToNameMapping(children), [children]);

  const handleReset = () => {
    setSelectedValue("");
    onValueChange?.("");
  };

  return (
    <Listbox
      as="div"
      ref={ref}
      defaultValue={selectedValue}
      value={selectedValue}
      onChange={
        ((value: string) => {
          onValueChange?.(value);
          setSelectedValue(value);
        }) as any
      }
      disabled={disabled}
      className={tremorTwMerge(
        // common
        "w-full min-w-[10rem] relative text-tremor-default",
        className,
      )}
      {...other}
    >
      {({ value }) => (
        <>
          <Listbox.Button
            className={tremorTwMerge(
              // common
              "w-full outline-none text-left whitespace-nowrap truncate rounded-tremor-default focus:ring-2 transition duration-100",
              // light
              "border-tremor-border shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted",
              // dark
              "dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
              Icon ? spacing.fourXl.paddingLeft : spacing.twoXl.paddingLeft,
              spacing.fourXl.paddingRight,
              spacing.sm.paddingY,
              border.sm.all,
              getSelectButtonColors(hasValue(value), disabled),
            )}
          >
            {Icon && (
              <span
                className={tremorTwMerge(
                  "absolute inset-y-0 left-0 flex items-center",
                  spacing.md.paddingLeft,
                )}
              >
                <Icon
                  className={tremorTwMerge(
                    makeSelectClassName("Icon"),
                    // common
                    "flex-none",
                    // light
                    "text-tremor-content-subtle",
                    // dark
                    "dark:text-dark-tremor-content-subtle",
                    sizing.lg.height,
                    sizing.lg.width,
                  )}
                />
              </span>
            )}
            <span className="w-[90%] block truncate">
              {value ? valueToNameMapping.get(value) ?? placeholder : placeholder}
            </span>
            <span
              className={tremorTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                spacing.md.marginRight,
              )}
            >
              <ArrowDownHeadIcon
                className={tremorTwMerge(
                  makeSelectClassName("arrowDownIcon"),
                  // common
                  "flex-none",
                  // light
                  "text-tremor-content-subtle",
                  // dark
                  "dark:text-dark-tremor-content-subtle",
                  sizing.md.height,
                  sizing.md.width,
                )}
              />
            </span>
          </Listbox.Button>
          {enableClear && selectedValue ? (
            <button
              className={tremorTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                spacing.fourXl.marginRight,
              )}
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
              <XCircleIcon
                className={tremorTwMerge(
                  makeSelectClassName("clearIcon"),
                  // common
                  "flex-none",
                  // light
                  "text-tremor-content-subtle",
                  // dark
                  "dark:text-dark-tremor-content-subtle",
                  sizing.md.height,
                  sizing.md.width,
                )}
              />
            </button>
          ) : null}
          <Listbox.Options
            className={tremorTwMerge(
              // common
              "absolute z-10 divide-y overflow-y-auto max-h-[228px] w-full left-0 outline-none rounded-tremor-default",
              // light
              "bg-tremor-background border-tremor-border divide-tremor-border shadow-tremor-dropdown",
              // dark
              "dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border dark:shadow-dark-tremor-dropdown",
              spacing.twoXs.marginTop,
              spacing.twoXs.marginBottom,
              border.sm.all,
            )}
          >
            {children}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
});

Select.displayName = "Select";

export default Select;
