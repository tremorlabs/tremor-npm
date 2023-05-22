"use client";
import React, { useState } from "react";
import { tremorTwMerge } from "lib";

import { SelectedValueContext } from "contexts";

import { useInternalState } from "hooks";

import { ArrowDownHeadIcon, SearchIcon, XCircleIcon } from "assets";

import { border, fontSize, makeClassName, sizing, spacing } from "lib";
import { getFilteredOptions, getSelectButtonColors } from "../selectUtils";
import { MultiSelectBoxItemProps } from "./MultiSelectBoxItem";
import { Listbox } from "@headlessui/react";

const makeMultiSelectBoxClassName = makeClassName("MultiSelectBox");

export interface MultiSelectBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  children: React.ReactElement[] | React.ReactElement;
}

const MultiSelectBox = React.forwardRef<HTMLDivElement, MultiSelectBoxProps>((props, ref) => {
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

  const options = React.Children.map(children, (child: { props: MultiSelectBoxItemProps }) => ({
    ...child.props,
  }));
  const filteredOptions = getFilteredOptions(searchQuery, options);
  const filteredOptionTexts = new Set(filteredOptions.map((option) => option.text ?? option.value));

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
          {Icon && (
            <span
              className={tremorTwMerge(
                "absolute inset-y-0 left-0 flex items-center",
                spacing.md.paddingLeft,
              )}
            >
              <Icon
                className={tremorTwMerge(
                  makeMultiSelectBoxClassName("Icon"),
                  "flex-none text-tremor-content-subtle",
                  sizing.lg.height,
                  sizing.lg.width,
                )}
              />
            </span>
          )}
          <Listbox.Button
            className={tremorTwMerge(
              "w-full outline-none focus:ring-2 focus:ring-tremor-brand focus:ring-offset-1 transition duration-100 cursor-default text-left font-tremor-normal rounded-tremor-default shadow-tremor-sm",
              Icon ? spacing.fourXl.paddingLeft : spacing.twoXl.paddingLeft,
              spacing.fourXl.paddingRight,
              spacing.sm.paddingY,
              border.sm.all,
              getSelectButtonColors(value.length > 0, disabled),
            )}
          >
            {value.length > 0 ? `${value.length} selected` : placeholder}
          </Listbox.Button>
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
                makeMultiSelectBoxClassName("arrowDownIcon"),
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
                makeMultiSelectBoxClassName("arrowDownIcon"),
                "flex-none text-tremor-content-subtle",
                sizing.lg.height,
                sizing.lg.width,
              )}
            />
          </span>
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
              {React.Children.map(children, (child) => {
                const optionText = child.props.text ?? child.props.value;
                if (filteredOptionTexts.has(String(optionText))) {
                  return React.cloneElement(child);
                }
              })}
            </SelectedValueContext.Provider>
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
});

export default MultiSelectBox;
