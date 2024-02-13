"use client";
import React, { isValidElement, useMemo, useRef, useState } from "react";
import { SelectedValueContext } from "contexts";
import { useInternalState } from "hooks";
import { ArrowDownHeadIcon, SearchIcon, XCircleIcon } from "assets";
import { Listbox, Transition } from "@headlessui/react";
import XIcon from "assets/XIcon";
import { makeClassName, tremorTwMerge } from "lib";
import { getFilteredOptions, getSelectButtonColors } from "../selectUtils";

const makeMultiSelectClassName = makeClassName("MultiSelect");

export interface MultiSelectProps extends React.HTMLAttributes<HTMLInputElement> {
  defaultValue?: string[];
  name?: string;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  placeholderSearch?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
}

const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>((props, ref) => {
  const {
    defaultValue = [],
    value,
    onValueChange,
    placeholder = "Select...",
    placeholderSearch = "Search",
    disabled = false,
    icon,
    children,
    className,
    required,
    name,
    error = false,
    errorMessage,
    id,
    ...other
  } = props;
  const listboxButtonRef = useRef<HTMLButtonElement | null>(null);

  const Icon = icon;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

  const { reactElementChildren, optionsAvailable } = useMemo(() => {
    const reactElementChildren = React.Children.toArray(children).filter(isValidElement);
    const optionsAvailable = getFilteredOptions("", reactElementChildren);
    return { reactElementChildren, optionsAvailable };
  }, [children]);

  const [searchQuery, setSearchQuery] = useState("");

  // checked if there are selected options
  // used the same code from the previous version
  const selectedItems = selectedValue ?? [];
  const hasSelection = selectedItems.length > 0;

  const filteredOptions = useMemo(
    () => (searchQuery ? getFilteredOptions(searchQuery, reactElementChildren) : optionsAvailable),
    [searchQuery, reactElementChildren, optionsAvailable],
  );

  const handleReset = () => {
    setSelectedValue([]);
    onValueChange?.([]);
  };

  const handleResetSearch = () => {
    setSearchQuery("");
  };

  return (
    <div
      className={tremorTwMerge(
        // common
        "w-full min-w-[10rem] relative text-tremor-default",
      )}
    >
      <select
        title="multi-select-hidden"
        required={required}
        className={tremorTwMerge("h-full w-full absolute left-0 top-0 z-0 opacity-0")}
        value={selectedValue}
        onChange={(e) => {
          e.preventDefault();
        }}
        name={name}
        disabled={disabled}
        multiple
        id={id}
        onFocus={() => {
          const listboxButton = listboxButtonRef.current;
          if (listboxButton) listboxButton.focus();
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
      <Listbox
        as="div"
        ref={ref}
        defaultValue={selectedValue}
        value={selectedValue}
        onChange={
          ((values: string[]) => {
            onValueChange?.(values);
            setSelectedValue(values);
          }) as any
        }
        disabled={disabled}
        className={tremorTwMerge(
          // common
          "w-full min-w-[10rem] relative text-tremor-default",
          className,
        )}
        id={id}
        multiple
        {...other}
      >
        {({ value }) => (
          <>
            <Listbox.Button
              className={tremorTwMerge(
                // common
                "w-full outline-none text-left whitespace-nowrap truncate rounded-tremor-default focus:ring-2 transition duration-100 border pr-8 py-1.5",
                // light
                "border-tremor-border shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted",
                // dark
                "dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
                Icon ? "pl-11 -ml-0.5" : "pl-3",
                getSelectButtonColors(value.length > 0, disabled, error),
              )}
              ref={listboxButtonRef}
            >
              {Icon && (
                <span
                  className={tremorTwMerge(
                    "absolute inset-y-0 left-0 flex items-center ml-px pl-2.5",
                  )}
                >
                  <Icon
                    className={tremorTwMerge(
                      makeMultiSelectClassName("Icon"),
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
              <div className="h-6 flex items-center">
                {value.length > 0 ? (
                  <div className="flex flex-nowrap overflow-x-scroll [&::-webkit-scrollbar]:hidden [scrollbar-width:none] gap-x-1 mr-5 -ml-1.5 relative">
                    {optionsAvailable
                      .filter((option) => value.includes(option.props.value))
                      .map((option, index) => {
                        return (
                          <div
                            key={index}
                            className={tremorTwMerge(
                              "max-w-[100px] lg:max-w-[200px] flex justify-center items-center pl-2 pr-1.5 py-1 font-medium",
                              "rounded-tremor-small",
                              "bg-tremor-background-muted dark:bg-dark-tremor-background-muted",
                              "bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle",
                              "text-tremor-content-default dark:text-dark-tremor-content-default",
                              "text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis",
                            )}
                          >
                            <div className="text-xs truncate ">
                              {option.props.children ?? option.props.value}
                            </div>
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                const newValue = value.filter((v) => v !== option.props.value);
                                onValueChange?.(newValue);
                                setSelectedValue(newValue);
                              }}
                            >
                              <XIcon
                                className={tremorTwMerge(
                                  makeMultiSelectClassName("clearIconItem"),
                                  // common
                                  "cursor-pointer rounded-tremor-full w-3.5 h-3.5 ml-2",
                                  // light
                                  "text-tremor-content-subtle hover:text-tremor-content",
                                  // dark
                                  "dark:text-dark-tremor-content-subtle dark:hover:text-tremor-content",
                                )}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <span>{placeholder}</span>
                )}
              </div>
              <span
                className={tremorTwMerge("absolute inset-y-0 right-0 flex items-center mr-2.5")}
              >
                <ArrowDownHeadIcon
                  className={tremorTwMerge(
                    makeMultiSelectClassName("arrowDownIcon"),
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

            {hasSelection && !disabled ? (
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
                    makeMultiSelectClassName("clearIconAllItems"),
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
                <div
                  className={tremorTwMerge(
                    // common
                    "flex items-center w-full px-2.5",
                    // light
                    "bg-tremor-background-muted",
                    // dark
                    "dark:bg-dark-tremor-background-muted",
                  )}
                >
                  <span>
                    <SearchIcon
                      className={tremorTwMerge(
                        // common
                        "flex-none w-4 h-4 mr-2",
                        // light
                        "text-tremor-content-subtle",
                        // dark
                        "dark:text-dark-tremor-content-subtle",
                      )}
                    />
                  </span>
                  <input
                    name="search"
                    type="input"
                    autoComplete="off"
                    placeholder={placeholderSearch}
                    className={tremorTwMerge(
                      // common
                      "w-full focus:outline-none focus:ring-none bg-transparent text-tremor-default py-2",
                      // light
                      "text-tremor-content-emphasis",
                      // dark
                      "dark:text-dark-tremor-content-subtle",
                    )}
                    onKeyDown={(e) => {
                      if (e.code === "Space" && (e.target as HTMLInputElement).value !== "") {
                        e.stopPropagation();
                      }
                    }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                </div>
                <SelectedValueContext.Provider
                  {...{ onBlur: { handleResetSearch } }}
                  value={{ selectedValue: value }}
                >
                  {filteredOptions}
                </SelectedValueContext.Provider>
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

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
