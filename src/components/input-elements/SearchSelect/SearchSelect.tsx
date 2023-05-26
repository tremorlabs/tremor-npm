"use client";
import React, { useMemo, useState } from "react";
import { tremorTwMerge } from "lib";

import { border, fontSize, makeClassName, sizing, spacing } from "lib";
import {
  constructValueToNameMapping,
  getFilteredOptions,
  getSelectButtonColors,
  hasValue,
} from "../selectUtils";
import { Combobox } from "@headlessui/react";
import { ArrowDownHeadIcon } from "assets";

const makeSearchSelectClassName = makeClassName("SearchSelect");

export interface SearchSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  children: React.ReactElement[] | React.ReactElement;
}

const SearchSelect = React.forwardRef<HTMLDivElement, SearchSelectProps>((props, ref) => {
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

  const [searchQuery, setSearchQuery] = useState("");

  const Icon = icon;
  const valueToNameMapping = useMemo(() => constructValueToNameMapping(children), [children]);
  const filteredOptions = useMemo(
    () => getFilteredOptions(searchQuery, children as React.ReactElement[]),
    [searchQuery, children],
  );

  return (
    <Combobox
      as="div"
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      onChange={onValueChange as any}
      disabled={disabled}
      className={tremorTwMerge("w-full min-w-[10rem] relative", fontSize.sm, className)}
      {...other}
    >
      {({ value }) => (
        <>
          <Combobox.Button className="w-full">
            {Icon && (
              <div
                className={tremorTwMerge(
                  "absolute inset-y-0 left-0 flex items-center",
                  spacing.md.paddingLeft,
                )}
              >
                <Icon
                  className={tremorTwMerge(
                    makeSearchSelectClassName("Icon"),
                    "flex-none text-tremor-content-subtle",
                    sizing.lg.height,
                    sizing.lg.width,
                  )}
                />
              </div>
            )}
            <Combobox.Input
              className={tremorTwMerge(
                "w-full outline-none focus:ring-2 focus:ring-tremor-brand focus:ring-offset-1 transition duration-100 cursor-default font-tremor-normal rounded-tremor-default shadow-tremor-sm",
                Icon ? spacing.fourXl.paddingLeft : spacing.twoXl.paddingLeft,
                spacing.fourXl.paddingRight,
                spacing.sm.paddingY,
                border.sm.all,
                disabled
                  ? "placeholder:text-tremor-content-subtle"
                  : "placeholder:text-tremor-content",
                getSelectButtonColors(hasValue(value), disabled),
              )}
              placeholder={placeholder}
              onChange={(event) => setSearchQuery(event.target.value)}
              displayValue={(value: string) => valueToNameMapping.get(value) ?? ""}
            />
            <div
              className={tremorTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                spacing.md.paddingRight,
              )}
            >
              <ArrowDownHeadIcon
                className={tremorTwMerge(
                  makeSearchSelectClassName("arrowDownIcon"),
                  "flex-none text-tremor-content-subtle",
                  sizing.lg.height,
                  sizing.lg.width,
                )}
              />
            </div>
          </Combobox.Button>
          {filteredOptions.length > 0 && (
            <Combobox.Options
              className={tremorTwMerge(
                "absolute z-10 divide-y overflow-y-auto max-h-[228px] w-full left-0 outline-none bg-tremor-background border-tremor-border divide-tremor-border rounded-tremor-default shadow-tremor-md",
                spacing.twoXs.marginTop,
                spacing.twoXs.marginBottom,
                border.sm.all,
              )}
            >
              {filteredOptions}
            </Combobox.Options>
          )}
        </>
      )}
    </Combobox>
  );
});

SearchSelect.displayName = "SearchSelect";

export default SearchSelect;
