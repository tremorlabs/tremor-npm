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
import { SelectBoxItemProps } from "./SelectBoxItem";
import { ArrowDownHeadIcon } from "assets";

const makeSelectBoxClassName = makeClassName("SelectBox");

export interface SelectBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  children: React.ReactElement[] | React.ReactElement;
}

const SelectBox = React.forwardRef<HTMLDivElement, SelectBoxProps>((props, ref) => {
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
  const valueToNameMapping = useMemo(() => constructValueToNameMapping(children), [children]);

  const [searchQuery, setSearchQuery] = useState("");

  const Icon = icon;
  const options = React.Children.map(children, (child: { props: SelectBoxItemProps }) => ({
    ...child.props,
  }));
  const filteredOptions = getFilteredOptions(searchQuery, options);
  const filteredOptionTexts = new Set(filteredOptions.map((option) => option.text ?? option.value));

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
          {Icon && (
            <Combobox.Button
              className={tremorTwMerge(
                "absolute inset-y-0 left-0 flex items-center",
                spacing.md.paddingLeft,
              )}
            >
              <Icon
                className={tremorTwMerge(
                  makeSelectBoxClassName("Icon"),
                  "flex-none text-tremor-content-subtle",
                  sizing.lg.height,
                  sizing.lg.width,
                )}
                aria-hidden="true"
              />
            </Combobox.Button>
          )}
          <Combobox.Input
            className={tremorTwMerge(
              "w-full outline-none focus:ring-2 cursor-default font-tremor-normal rounded-tremor-default shadow-tremor-sm",
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
          <Combobox.Button
            className={tremorTwMerge(
              "absolute inset-y-0 right-0 flex items-center",
              spacing.md.paddingRight,
            )}
          >
            <ArrowDownHeadIcon
              className={tremorTwMerge(
                makeSelectBoxClassName("arrowDownIcon"),
                "flex-none text-tremor-content-subtle",
                sizing.lg.height,
                sizing.lg.width,
              )}
              aria-hidden="true"
            />
          </Combobox.Button>
          {filteredOptionTexts.size > 0 && (
            <Combobox.Options
              className={tremorTwMerge(
                "absolute z-10 divide-y overflow-y-auto max-h-[228px] w-full left-0 outline-none bg-tremor-background border-tremor-border divide-tremor-border rounded-tremor-default shadow-tremor-md",
                spacing.twoXs.marginTop,
                spacing.twoXs.marginBottom,
                border.sm.all,
              )}
            >
              {React.Children.map(children, (child) => {
                const optionValue = child.props.text ?? child.props.value;
                if (filteredOptionTexts.has(String(optionValue))) {
                  return React.cloneElement(child);
                }
                return null;
              })}
            </Combobox.Options>
          )}
        </>
      )}
    </Combobox>
  );
});

export default SelectBox;
