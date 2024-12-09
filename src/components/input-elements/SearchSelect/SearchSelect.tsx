"use client";
import { useInternalState } from "hooks";
import React, { isValidElement, useMemo, useRef } from "react";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { ArrowDownHeadIcon, XCircleIcon } from "assets";
import { makeClassName, tremorTwMerge } from "lib";
import {
  constructValueToNameMapping,
  getFilteredOptions,
  getSelectButtonColors,
  hasValue,
} from "../selectUtils";

const makeSearchSelectClassName = makeClassName("SearchSelect");

export interface SearchSelectProps extends React.HTMLAttributes<HTMLInputElement> {
  defaultValue?: string;
  name?: string;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  enableClear?: boolean;
  children: React.ReactNode;
  autoComplete?: string;
}

const makeSelectClassName = makeClassName("SearchSelect");

const SearchSelect = React.forwardRef<HTMLInputElement, SearchSelectProps>((props, ref) => {
  const {
    defaultValue = "",
    searchValue,
    onSearchValueChange,
    value,
    onValueChange,
    placeholder = "Select...",
    disabled = false,
    icon,
    enableClear = true,
    name,
    required,
    error = false,
    errorMessage,
    children,
    className,
    id,
    autoComplete = "off",
    ...other
  } = props;
  const comboboxInputRef = useRef<HTMLInputElement | null>(null);

  const [searchQuery, setSearchQuery] = useInternalState("", searchValue);
  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

  const Icon = icon;

  const { reactElementChildren, valueToNameMapping } = useMemo(() => {
    const reactElementChildren = React.Children.toArray(children).filter(isValidElement);
    const valueToNameMapping = constructValueToNameMapping(reactElementChildren);
    return { reactElementChildren, valueToNameMapping };
  }, [children]);

  const filteredOptions = useMemo(
    () => getFilteredOptions(searchQuery ?? "", reactElementChildren),
    [searchQuery, reactElementChildren],
  );

  const handleReset = () => {
    setSelectedValue("");
    setSearchQuery("");
    onValueChange?.("");
    onSearchValueChange?.("");
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
          title="search-select-hidden"
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
            const comboboxInput = comboboxInputRef.current;
            if (comboboxInput) comboboxInput.focus();
          }}
        >
          <option className="hidden" value="" disabled hidden>
            {placeholder}
          </option>
          {filteredOptions.map((child: any) => {
            const value = child.props.value;
            const name = child.props.children;
            return (
              <option className="hidden" key={value} value={value}>
                {name}
              </option>
            );
          })}
        </select>
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
          id={id}
          {...other}
        >
          {({ value }) => (
            <>
              <ComboboxButton className="w-full">
                {Icon && (
                  <span
                    className={tremorTwMerge(
                      "absolute inset-y-0 left-0 ml-px flex items-center pl-2.5",
                    )}
                  >
                    <Icon
                      className={tremorTwMerge(
                        makeSearchSelectClassName("Icon"),
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

                <ComboboxInput
                  ref={comboboxInputRef}
                  className={tremorTwMerge(
                    // common
                    "rounded-tremor-default text-tremor-default w-full truncate border py-2 pr-14 text-left whitespace-nowrap transition duration-100 outline-none focus:ring-2",
                    // light
                    "border-tremor-border shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted",
                    // dark
                    "dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
                    Icon ? "pl-10" : "pl-3",
                    disabled
                      ? "placeholder:text-tremor-content-subtle dark:placeholder:text-tremor-content-subtle"
                      : "placeholder:text-tremor-content dark:placeholder:text-tremor-content",
                    getSelectButtonColors(hasValue(value), disabled, error),
                  )}
                  placeholder={placeholder}
                  onChange={(event) => {
                    onSearchValueChange?.(event.target.value);
                    setSearchQuery(event.target.value);
                  }}
                  displayValue={(value: string) => valueToNameMapping.get(value) ?? ""}
                  autoComplete={autoComplete}
                />
                <div
                  className={tremorTwMerge("absolute inset-y-0 right-0 flex items-center pr-2.5")}
                >
                  <ArrowDownHeadIcon
                    className={tremorTwMerge(
                      makeSearchSelectClassName("arrowDownIcon"),
                      // common
                      "h-5 w-5 flex-none",
                      // light
                      "text-tremor-content-subtle!",
                      // dark
                      "!dark:text-dark-tremor-content-subtle",
                    )}
                  />
                </div>
              </ComboboxButton>

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
              {filteredOptions.length > 0 && (
                <Transition
                  enter="transition ease duration-100 transform"
                  enterFrom="opacity-0 -translate-y-4"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease duration-100 transform"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-4"
                >
                  <ComboboxOptions
                    anchor="bottom start"
                    className={tremorTwMerge(
                      // common
                      "rounded-tremor-default text-tremor-default z-10 max-h-[228px] divide-y overflow-y-auto border [--anchor-gap:4px] outline-none",
                      // light
                      "bg-tremor-background border-tremor-border divide-tremor-border shadow-tremor-dropdown",
                      // dark
                      "dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border dark:shadow-dark-tremor-dropdown",
                    )}
                  >
                    {filteredOptions}
                  </ComboboxOptions>
                </Transition>
              )}
            </>
          )}
        </Combobox>
      </div>
      {error && errorMessage ? (
        <p className={tremorTwMerge("errorMessage", "mt-1 text-sm text-rose-500")}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
});

SearchSelect.displayName = "SearchSelect";

export default SearchSelect;
