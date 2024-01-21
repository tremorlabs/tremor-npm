"use client";
// <<<<<<< HEAD
// import { useInternalState } from "hooks";
// import { tremorTwMerge } from "lib";
// import React, { cloneElement, isValidElement, useMemo, useState } from "react";

// =======
import React, { cloneElement, isValidElement, useMemo, useState } from "react";
import { useInternalState } from "hooks";
// >>>>>>> main
import { Combobox, Transition } from "@headlessui/react";
import { ArrowDownHeadIcon, XCircleIcon } from "assets";
import { makeClassName, tremorTwMerge } from "lib";
import {
  constructValueToNameMapping,
  getFilteredOptions,
  getSelectButtonColors,
  hasValue,
} from "../selectUtils";

const makeSearchSelectClassName = makeClassName("SearchSelect");

export interface SearchSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any> | React.ReactElement;
  enableClear?: boolean;
  children: React.ReactNode;
}

const makeSelectClassName = makeClassName("SearchSelect");

const SearchSelect = React.forwardRef<HTMLDivElement, SearchSelectProps>((props, ref) => {
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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

  let Icon: React.ReactElement | undefined;
  if (icon) {
    if (isValidElement(icon)) {
      Icon = cloneElement(icon as React.ReactElement, {
        className: tremorTwMerge(
          makeSearchSelectClassName("Icon"),
          // common
          "flex-none h-5 w-5",
          // light
          "text-tremor-content-subtle",
          // dark
          "dark:text-dark-tremor-content-subtle",
        ),
      });
    } else {
      const IconElm = icon as React.ElementType | React.JSXElementConstructor<any>;
      Icon = (
        <IconElm
          className={tremorTwMerge(
            makeSearchSelectClassName("Icon"),
            // common
            "flex-none h-5 w-5",
            // light
            "text-tremor-content-subtle",
            // dark
            "dark:text-dark-tremor-content-subtle",
          )}
        />
      );
    }
  }

  const { reactElementChildren, valueToNameMapping } = useMemo(() => {
    const reactElementChildren = React.Children.toArray(children).filter(isValidElement);
    const valueToNameMapping = constructValueToNameMapping(reactElementChildren);
    return { reactElementChildren, valueToNameMapping };
  }, [children]);

  const filteredOptions = useMemo(
    () => getFilteredOptions(searchQuery, reactElementChildren),
    [searchQuery, reactElementChildren],
  );

  const handleReset = () => {
    setSelectedValue("");
    setSearchQuery("");
    onValueChange?.("");
  };

  return (
    <Combobox
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
          <Combobox.Button className="w-full">
            {Icon && (
              <span
                className={tremorTwMerge(
                  "absolute inset-y-0 left-0 flex items-center ml-px pl-2.5",
                )}
              >
                {Icon}
              </span>
            )}

            <Combobox.Input
              className={tremorTwMerge(
                // common
                "w-full outline-none text-left whitespace-nowrap truncate rounded-tremor-default focus:ring-2 transition duration-100 text-tremor-default pr-14 border py-2",
                // light
                "border-tremor-border shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted",
                // dark
                "dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
                Icon ? "pl-10" : "pl-3",
                disabled
                  ? "placeholder:text-tremor-content-subtle dark:placeholder:text-tremor-content-subtle"
                  : "placeholder:text-tremor-content dark:placeholder:text-tremor-content",
                getSelectButtonColors(hasValue(value), disabled),
              )}
              placeholder={placeholder}
              onChange={(event) => setSearchQuery(event.target.value)}
              displayValue={(value: string) => valueToNameMapping.get(value) ?? ""}
            />
            <div className={tremorTwMerge("absolute inset-y-0 right-0 flex items-center pr-2.5")}>
              <ArrowDownHeadIcon
                className={tremorTwMerge(
                  makeSearchSelectClassName("arrowDownIcon"),
                  // common
                  "flex-none h-5 w-5",
                  // light
                  "text-tremor-content-subtle",
                  // dark
                  "dark:text-dark-tremor-content-subtle",
                )}
              />
            </div>
          </Combobox.Button>
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
          {filteredOptions.length > 0 && (
            <Transition
              className="absolute z-10 w-full"
              enter="transition ease duration-100 transform"
              enterFrom="opacity-0 -translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease duration-100 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-4"
            >
              <Combobox.Options
                className={tremorTwMerge(
                  // common
                  "divide-y overflow-y-auto outline-none rounded-tremor-default text-tremor-default max-h-[228px] left-0 border my-1",
                  // light
                  "bg-tremor-background border-tremor-border divide-tremor-border shadow-tremor-dropdown",
                  // dark
                  "dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border dark:shadow-dark-tremor-dropdown",
                )}
              >
                {filteredOptions}
              </Combobox.Options>
            </Transition>
          )}
        </>
      )}
    </Combobox>
  );
});

SearchSelect.displayName = "SearchSelect";

export default SearchSelect;
