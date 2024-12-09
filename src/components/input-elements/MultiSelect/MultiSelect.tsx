"use client";
import { Listbox, ListboxButton, ListboxOptions, Transition } from "@headlessui/react";
import { ArrowDownHeadIcon, SearchIcon, XCircleIcon } from "assets";
import XIcon from "assets/XIcon";
import { SelectedValueContext } from "contexts";
import { useInternalState } from "hooks";
import { makeClassName, tremorTwMerge } from "lib";
import React, { isValidElement, useMemo, useRef, useState } from "react";
import { getFilteredOptions, getSelectButtonColors } from "../selectUtils";

const makeMultiSelectClassName = makeClassName("MultiSelect");

interface MultiSelectProps extends React.HTMLAttributes<HTMLInputElement> {
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
    <div className={tremorTwMerge("text-tremor-default w-full min-w-[10rem]", className)}>
      <div className="relative">
        <select
          title="multi-select-hidden"
          required={required}
          className={tremorTwMerge("absolute top-0 left-0 -z-10 h-full w-full opacity-0")}
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
          id={id}
          multiple
          {...other}
        >
          {({ value }) => (
            <>
              <ListboxButton
                className={tremorTwMerge(
                  "rounded-tremor-default border-tremor-border-default shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted w-full truncate border py-1.5 pr-8 text-left whitespace-nowrap transition duration-100 outline-none focus:ring-2",
                  Icon ? "-ml-0.5 pl-11" : "pl-3",
                  getSelectButtonColors(value.length > 0, disabled, error),
                )}
                ref={listboxButtonRef}
              >
                {Icon && (
                  <span
                    className={tremorTwMerge(
                      "absolute inset-y-0 left-0 ml-px flex items-center pl-2.5",
                    )}
                  >
                    <Icon
                      className={tremorTwMerge(
                        makeMultiSelectClassName("Icon"),
                        "text-tremor-content-subtle h-5 w-5 shrink-0",
                      )}
                    />
                  </span>
                )}
                <div className="flex h-6 items-center">
                  {value.length > 0 ? (
                    <div className="relative mr-5 -ml-1.5 flex flex-nowrap gap-x-1 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {optionsAvailable
                        .filter((option) => value.includes(option.props.value))
                        .map((option, index) => {
                          return (
                            <div
                              key={index}
                              className={tremorTwMerge(
                                "rounded-tremor-small bg-tremor-background-muted text-tremor-content-default flex max-w-[100px] items-center justify-center py-1 pr-1.5 pl-2 font-medium lg:max-w-[200px]",
                              )}
                            >
                              <div className="truncate text-xs">
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
                                    "rounded-tremor-full text-tremor-content-subtle hover:text-tremor-content ml-2 h-3.5 w-3.5 cursor-pointer",
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
                  className={tremorTwMerge("absolute inset-y-0 right-0 mr-2.5 flex items-center")}
                >
                  <ArrowDownHeadIcon
                    className={tremorTwMerge(
                      makeMultiSelectClassName("arrowDownIcon"),
                      "text-tremor-content-subtle h-5 w-5 flex-none",
                    )}
                  />
                </span>
              </ListboxButton>

              {hasSelection && !disabled ? (
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
                      makeMultiSelectClassName("clearIconAllItems"),
                      "text-tremor-content-subtle h-4 w-4 flex-none",
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
                    "rounded-tremor-default bg-tremor-background-defualt border-tremor-border-default divide-tremor-border-default shadow-tremor-dropdown z-10 max-h-[228px] divide-y overflow-y-auto border [--anchor-gap:4px] outline-none",
                  )}
                >
                  <div
                    className={tremorTwMerge(
                      "bg-tremor-background-muted flex w-full items-center px-2.5",
                    )}
                  >
                    <span>
                      <SearchIcon
                        className={tremorTwMerge(
                          "text-tremor-content-subtle mr-2 h-4 w-4 flex-none",
                        )}
                      />
                    </span>
                    <input
                      name="search"
                      type="input"
                      autoComplete="off"
                      placeholder={placeholderSearch}
                      className={tremorTwMerge(
                        "focus:ring-none text-tremor-default text-tremor-content-emphasis w-full bg-transparent py-2 focus:outline-none",
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

MultiSelect.displayName = "MultiSelect";

export { MultiSelect, type MultiSelectProps };
