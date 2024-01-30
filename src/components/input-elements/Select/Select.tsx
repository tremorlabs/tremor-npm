"use client";

import React, { isValidElement, useMemo, Children, useRef } from "react";
import { ArrowDownHeadIcon, XCircleIcon } from "assets";
import { makeClassName, tremorTwMerge } from "lib";
import { constructValueToNameMapping, getSelectButtonColors, hasValue } from "../selectUtils";

import { Listbox, Transition } from "@headlessui/react";
import { useInternalState } from "hooks";

const makeSelectClassName = makeClassName("Select");

export interface SelectProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  name?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.JSXElementConstructor<any>;
  enableClear?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  const {
    defaultValue = "",
    value,
    onValueChange,
    placeholder = "Select...",
    disabled = false,
    icon,
    enableClear = false,
    required,
    children,
    name,
    error = false,
    errorMessage,
    className,
    id,
    ...other
  } = props;
  const listboxButtonRef = useRef<HTMLButtonElement | null>(null);
  const childrenArray = Children.toArray(children); // @sev

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
    <div
      className={tremorTwMerge(
        // common
        "w-full min-w-[10rem] relative text-tremor-default",
      )}
    >
      <select
        title="select-hidden"
        required={required}
        className={tremorTwMerge("h-full w-full absolute left-0 top-0 z-0 opacity-0")}
        value={selectedValue}
        onChange={(e) => {
          e.preventDefault();
        }}
        name={name}
        disabled={disabled}
        id={id}
        onFocus={() => {
          const listboxButton = listboxButtonRef.current;
          if (listboxButton) listboxButton.focus();
        }}
      >
        <option className="hidden" value="" disabled hidden>
          {placeholder}
        </option>
        {childrenArray.map((child: any) => {
          const value = child.props.value;
          const name = child.props.children;
          return (
            <option className="hidden" key={value} value={value}>
              {name}
            </option>
          );
        })}
      </select>
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
        id={id}
        {...other}
      >
        {({ value }) => (
          <>
            <Listbox.Button
              ref={listboxButtonRef}
              className={tremorTwMerge(
                // common
                "w-full outline-none text-left whitespace-nowrap truncate rounded-tremor-default focus:ring-2 transition duration-100 border pr-8 py-2",
                // light
                "border-tremor-border shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted",
                // dark
                "dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
                Icon ? "pl-10" : "pl-3",
                getSelectButtonColors(hasValue(value), disabled, error),
              )}
            >
              {Icon && (
                <span
                  className={tremorTwMerge(
                    "absolute inset-y-0 left-0 flex items-center ml-px pl-2.5",
                  )}
                >
                  <Icon
                    className={tremorTwMerge(
                      makeSelectClassName("Icon"),
                      // common
                      "flex-none h-5 w-5",
                      // light
                      "text-tremor-content-subtle",
                      // dark
                      "dark:text-dark-tremor-content-subtle",
                    )}
                  />
                </span>
              )}
              <span className="w-[90%] block truncate">
                {value ? valueToNameMapping.get(value) ?? placeholder : placeholder}
              </span>
              <span className={tremorTwMerge("absolute inset-y-0 right-0 flex items-center mr-3")}>
                <ArrowDownHeadIcon
                  className={tremorTwMerge(
                    makeSelectClassName("arrowDownIcon"),
                    // common
                    "flex-none h-5 w-5",
                    // light
                    "text-tremor-content-subtle",
                    // dark
                    "dark:text-dark-tremor-content-subtle",
                  )}
                />
              </span>
            </Listbox.Button>
            {enableClear && selectedValue ? (
              <button
                type="button"
                className={tremorTwMerge("absolute inset-y-0 right-0 flex items-center mr-8")}
                onClick={(e) => {
                  e.preventDefault();
                  handleReset();
                }}
              >
                <XCircleIcon
                  className={tremorTwMerge(
                    makeSelectClassName("clearIcon"),
                    // common
                    "flex-none h-4 w-4",
                    // light
                    "text-tremor-content-subtle",
                    // dark
                    "dark:text-dark-tremor-content-subtle",
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
                  "divide-y overflow-y-auto outline-none rounded-tremor-default max-h-[228px] left-0 border my-1",
                  // light
                  "bg-tremor-background border-tremor-border divide-tremor-border shadow-tremor-dropdown",
                  // dark
                  "dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border dark:shadow-dark-tremor-dropdown",
                )}
              >
                {children}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
      {error && errorMessage ? (
        <p className={tremorTwMerge("errorMessage", "text-sm text-rose-500 mt-1")}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
