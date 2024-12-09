"use client";

import { ArrowDownHeadIcon, XCircleIcon } from "assets";
import { makeClassName, tremorTwMerge } from "lib";
import React, { Children, isValidElement, useMemo, useRef } from "react";
import { constructValueToNameMapping, getSelectButtonColors, hasValue } from "../selectUtils";

import { Listbox, ListboxButton, ListboxOptions, Transition } from "@headlessui/react";
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
        "text-tremor-default w-full min-w-[10rem]",
        className,
      )}
    >
      <div className="relative">
        <select
          title="select-hidden"
          required={required}
          className={tremorTwMerge("absolute top-0 left-0 -z-10 h-full w-full opacity-0")}
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
          id={id}
          {...other}
        >
          {({ value }) => (
            <>
              <ListboxButton
                ref={listboxButtonRef}
                className={tremorTwMerge(
                  // common
                  "rounded-tremor-default w-full truncate border py-2 pr-8 text-left whitespace-nowrap transition duration-100 outline-none focus:ring-2",
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
                      "absolute inset-y-0 left-0 ml-px flex items-center pl-2.5",
                    )}
                  >
                    <Icon
                      className={tremorTwMerge(
                        makeSelectClassName("Icon"),
                        // common
                        "h-5 w-5 flex-none",
                        // light
                        "text-tremor-content-subtle",
                        // dark
                        "dark:text-dark-tremor-content-subtle",
                      )}
                    />
                  </span>
                )}
                <span className="block w-[90%] truncate">
                  {value ? (valueToNameMapping.get(value) ?? placeholder) : placeholder}
                </span>
                <span
                  className={tremorTwMerge("absolute inset-y-0 right-0 mr-3 flex items-center")}
                >
                  <ArrowDownHeadIcon
                    className={tremorTwMerge(
                      makeSelectClassName("arrowDownIcon"),
                      // common
                      "h-5 w-5 flex-none",
                      // light
                      "text-tremor-content-subtle",
                      // dark
                      "dark:text-dark-tremor-content-subtle",
                    )}
                  />
                </span>
              </ListboxButton>
              {enableClear && selectedValue ? (
                <button
                  type="button"
                  className={tremorTwMerge("absolute inset-y-0 right-0 mr-8 flex items-center")}
                  onClick={(e) => {
                    e.preventDefault();
                    handleReset();
                  }}
                >
                  <XCircleIcon
                    className={tremorTwMerge(
                      makeSelectClassName("clearIcon"),
                      // common
                      "h-4 w-4 flex-none",
                      // light
                      "text-tremor-content-subtle",
                      // dark
                      "dark:text-dark-tremor-content-subtle",
                    )}
                  />
                </button>
              ) : null}
              <Transition
                enter="transition ease duration-100 transform"
                enterFrom="opacity-0 -translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease duration-100 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-4"
              >
                <ListboxOptions
                  anchor="bottom start"
                  className={tremorTwMerge(
                    // common
                    "rounded-tremor-default z-10 max-h-[228px] divide-y overflow-y-auto border [--anchor-gap:4px] outline-none",
                    // light
                    "bg-tremor-background border-tremor-border divide-tremor-border shadow-tremor-dropdown",
                    // dark
                    "dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border dark:shadow-dark-tremor-dropdown",
                  )}
                >
                  {children}
                </ListboxOptions>
              </Transition>
            </>
          )}
        </Listbox>
      </div>
      {error && errorMessage ? (
        <p className={tremorTwMerge("errorMessage", "mt-1 text-sm text-rose-500")}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
