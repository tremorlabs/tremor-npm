"use client";
import React, { useMemo, useState } from "react";
import { tremorTwMerge } from "lib";

import { SelectedValueContext } from "contexts";

import { useInternalState } from "hooks";

import { ArrowDownHeadIcon, SearchIcon, XCircleIcon } from "assets";

import { border, fontSize, makeClassName, sizing, spacing } from "lib";
import { getFilteredOptions, getSelectButtonColors } from "../selectUtils";
import { Listbox } from "@headlessui/react";

const makeMultiSelectClassName = makeClassName("MultiSelect");

export interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  children: React.ReactElement[] | React.ReactElement;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    placeholder = "Select...",
    disabled = false,
    icon,
    children,
    className,
    ...other
  } = props;

  const Icon = icon;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = useMemo(
    () => getFilteredOptions(searchQuery, children as React.ReactElement[]),
    [searchQuery, children],
  );

  const handleReset = () => {
    setSelectedValue([]);
    onValueChange?.([]);
  };

  return (
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
      className={tremorTwMerge("w-full min-w-[10rem] relative", fontSize.sm, className)}
      {...other}
      multiple
    >
      {({ value }) => (
        <>
          <Listbox.Button
            className={tremorTwMerge(
              "w-full relative outline-none border-tremor-border cursor-default text-left font-tremor-normal rounded-tremor-default shadow-tremor-sm",
              "focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted transition duration-100",
              Icon ? spacing.fourXl.paddingLeft : spacing.twoXl.paddingLeft,
              spacing.fourXl.paddingRight,
              spacing.sm.paddingY,
              border.sm.all,
              getSelectButtonColors(value.length > 0, disabled),
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
                    makeMultiSelectClassName("Icon"),
                    "flex-none text-tremor-content-subtle",
                    sizing.lg.height,
                    sizing.lg.width,
                  )}
                />
              </span>
            )}
            {value.length > 0 ? `${value.length} selected` : placeholder}
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
                  makeMultiSelectClassName("clearIcon"),
                  "flex-none text-tremor-content-subtle",
                  sizing.md.height,
                  sizing.md.width,
                )}
              />
            </button>
            <span
              className={tremorTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                spacing.md.marginRight,
              )}
            >
              <ArrowDownHeadIcon
                className={tremorTwMerge(
                  makeMultiSelectClassName("arrowDownIcon"),
                  "flex-none text-tremor-content-subtle",
                  sizing.lg.height,
                  sizing.lg.width,
                )}
              />
            </span>
          </Listbox.Button>
          <Listbox.Options
            className={tremorTwMerge(
              "absolute z-10 divide-y overflow-y-auto max-h-[228px] w-full left-0 outline-none bg-tremor-background border-tremor-border divide-tremor-border rounded-tremor-default shadow-tremor-md",
              spacing.twoXs.marginTop,
              spacing.twoXs.marginBottom,
              border.sm.all,
            )}
          >
            <div
              className={tremorTwMerge(
                "flex items-center w-full bg-tremor-background-muted",
                spacing.twoXl.paddingX,
              )}
            >
              <span>
                <SearchIcon
                  className={tremorTwMerge(
                    "flex-none text-tremor-content-subtle",
                    spacing.threeXs.negativeMarginLeft,
                    spacing.lg.marginRight,
                    sizing.md.height,
                    sizing.md.width,
                  )}
                />
              </span>
              <input
                name="search"
                type="input"
                placeholder="Search"
                className={tremorTwMerge(
                  "w-full focus:outline-none focus:ring-none bg-transparent text-tremor-sm text-tremor-content-emphasis",
                  spacing.sm.paddingY,
                )}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <SelectedValueContext.Provider value={{ selectedValue: value }}>
              {filteredOptions}
            </SelectedValueContext.Provider>
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
});

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
