"use client";

import { ArrowDownHeadIcon, XCircleIcon } from "assets";
import { border, makeClassName, sizing, spacing } from "lib";
import React, { isValidElement, useMemo } from "react";
import { constructValueToNameMapping, getSelectButtonColors, hasValue } from "../selectUtils";

import { Listbox, Transition } from "@headlessui/react";
import { useInternalState } from "hooks";
import { tremorTwMerge } from "lib";

const makeSelectClassName = makeClassName("Select");

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.JSXElementConstructor<any>;
  enableClear?: boolean;
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    placeholder = "Select...",
    disabled = false,
    icon,
    enableClear = true,
    children,
    className,
    ...other
  } = props;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const Icon = icon;
  const valueToNameMapping = useMemo(() => {
    const reactElementChildren = React.Children.toArray(children).filter(isValidElement);
    const valueToNameMapping = constructValueToNameMapping(reactElementChildren);
    return valueToNameMapping;
  }, [children]);

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
              Icon ? "p-10 -ml-0.5" : spacing.lg.paddingLeft,
              spacing.fourXl.paddingRight,
              spacing.sm.paddingY,
              border.sm.all,
              getSelectButtonColors(hasValue(value), disabled),
            )}
          >
            {Icon && (
              <span
                className={tremorTwMerge(
                  "absolute inset-y-0 left-0 flex items-center ml-px",
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
                spacing.lg.marginRight,
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
              type="button"
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
          <Transition
            className="absolute z-10 w-full"
            enter="transition ease duration-100 transform"
            enterFrom="opacity-0 -translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease duration-100 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-4"
          >
            <Listbox.Options
              className={tremorTwMerge(
                // common
                "divide-y overflow-y-auto outline-none rounded-tremor-default max-h-[228px] left-0",
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
          </Transition>
        </>
      )}
    </Listbox>
  );
});

Select.displayName = "Select";

export default Select;
