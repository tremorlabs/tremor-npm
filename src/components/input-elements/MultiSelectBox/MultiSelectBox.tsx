"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { SelectedValueContext } from "contexts";

import { useInternalState } from "hooks";

import { ArrowDownHeadIcon, SearchIcon, XCircleIcon } from "assets";

import {
  border,
  borderRadius,
  boxShadow,
  fontSize,
  fontWeight,
  getColorClassNames,
  makeClassName,
  sizing,
  spacing,
} from "lib";
import { getFilteredOptions, getSelectButtonColors } from "../selectUtils";
import { MultiSelectBoxItemProps } from "./MultiSelectBoxItem";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
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
      defaultValue={selectedValue}
      value={selectedValue}
      onChange={
        ((values: string[]) => {
          onValueChange?.(values);
          setSelectedValue(values);
        }) as any
      }
      ref={ref}
      className={twMerge("w-full min-w-[10rem] relative", fontSize.sm, className)}
      {...other}
      multiple
    >
      {({ value }) => (
        <>
          {Icon && (
            <span
              className={twMerge(
                "absolute inset-y-0 left-0 flex items-center",
                spacing.md.paddingLeft,
              )}
            >
              <Icon
                className={twMerge(
                  makeMultiSelectBoxClassName("Icon"),
                  "flex-none",
                  sizing.lg.height,
                  sizing.lg.width,
                  getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
                )}
                aria-hidden="true"
              />
            </span>
          )}
          <Listbox.Button
            className={twMerge(
              "w-full outline-none focus:ring-2 cursor-default text-left",
              Icon ? spacing.fourXl.paddingLeft : spacing.twoXl.paddingLeft,
              spacing.fourXl.paddingRight,
              spacing.sm.paddingY,
              fontWeight.md,
              borderRadius.md.all,
              border.sm.all,
              boxShadow.sm,
              getSelectButtonColors(true, disabled),
              getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
            )}
          >
            {value.length > 0 ? `${value.length} selected` : placeholder}
          </Listbox.Button>
          <button
            className={twMerge(
              "absolute inset-y-0 right-0 flex items-center",
              spacing.fourXl.marginRight,
            )}
            onClick={(e) => {
              e.preventDefault();
              handleReset();
            }}
          >
            <XCircleIcon
              className={twMerge(
                makeMultiSelectBoxClassName("arrowDownIcon"),
                "flex-none",
                sizing.md.height,
                sizing.md.width,
                getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
              )}
              aria-hidden="true"
            />
          </button>
          <span
            className={twMerge(
              "absolute inset-y-0 right-0 flex items-center",
              spacing.md.marginRight,
            )}
          >
            <ArrowDownHeadIcon
              className={twMerge(
                makeMultiSelectBoxClassName("arrowDownIcon"),
                "flex-none",
                sizing.lg.height,
                sizing.lg.width,
                getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
              )}
              aria-hidden="true"
            />
          </span>
          <Listbox.Options
            className={twMerge(
              "absolute z-10 divide-y overflow-y-auto max-h-[228px] w-full left-0 outline-none",
              getColorClassNames("white").bgColor,
              getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).borderColor,
              getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).divideColor,
              spacing.twoXs.marginTop,
              spacing.twoXs.marginBottom,
              borderRadius.md.all,
              border.sm.all,
              boxShadow.lg,
            )}
          >
            <div
              className={twMerge(
                "flex items-center w-full",
                getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).bgColor,
                spacing.twoXl.paddingX,
              )}
            >
              <span>
                <SearchIcon
                  className={twMerge(
                    "flex-none",
                    getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
                    spacing.threeXs.negativeMarginLeft,
                    spacing.lg.marginRight,
                    sizing.md.height,
                    sizing.md.width,
                  )}
                  aria-hidden="true"
                />
              </span>
              <input
                name="search"
                type="input"
                placeholder="Search"
                className={twMerge(
                  "w-full focus:outline-none focus:ring-none",
                  getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
                  getColorClassNames("transparent").bgColor,
                  spacing.sm.paddingY,
                  fontSize.sm,
                  fontWeight.md,
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
