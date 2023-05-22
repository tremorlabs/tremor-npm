"use client";
import React, { useMemo } from "react";
import { tremorTwMerge } from "lib";

import { ArrowDownHeadIcon } from "assets";

import { border, fontSize, makeClassName, sizing, spacing } from "lib";
import { constructValueToNameMapping, getSelectButtonColors, hasValue } from "../selectUtils";
import { Listbox } from "@headlessui/react";

const makeDropdownClassName = makeClassName("Dropdown");

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.JSXElementConstructor<any>;
  children: React.ReactElement[] | React.ReactElement;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
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
  const valueToNameMapping = useMemo(() => constructValueToNameMapping(children), [children]);

  return (
    <Listbox
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
            <span
              className={tremorTwMerge(
                "absolute inset-y-0 left-0 flex items-center",
                spacing.md.paddingLeft,
              )}
            >
              <Icon
                className={tremorTwMerge(
                  makeDropdownClassName("Icon"),
                  "flex-none text-tremor-content-subtle",
                  sizing.lg.height,
                  sizing.lg.width,
                )}
              />
            </span>
          )}
          <Listbox.Button
            className={tremorTwMerge(
              "w-full outline-none focus:ring-2 focus:ring-tremor-brand focus:ring-offset-1 transition duration-100 cursor-default text-left whitespace-nowrap truncate shadow-tremor-sm rounded-tremor-default",
              Icon ? spacing.fourXl.paddingLeft : spacing.twoXl.paddingLeft,
              spacing.fourXl.paddingRight,
              spacing.sm.paddingY,
              border.sm.all,
              getSelectButtonColors(hasValue(value), disabled),
            )}
          >
            {value ? valueToNameMapping.get(value) ?? placeholder : placeholder}
          </Listbox.Button>
          <span
            className={tremorTwMerge(
              "absolute inset-y-0 right-0 flex items-center",
              spacing.md.marginRight,
            )}
          >
            <ArrowDownHeadIcon
              className={tremorTwMerge(
                makeDropdownClassName("arrowDownIcon"),
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
            {children}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
});

export default Dropdown;
