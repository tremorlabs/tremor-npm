import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { ArrowDownHeadIcon } from "assets";

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
import { constructValueToNameMapping, getSelectButtonColors } from "../selectUtils";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
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
      defaultValue={defaultValue}
      value={value}
      onChange={onValueChange as any}
      ref={ref}
      className={twMerge("w-full min-w-[10rem] relative", fontSize.sm, className)}
      {...other}
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
                  makeDropdownClassName("Icon"),
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
              "w-full outline-none focus:ring-2 cursor-default text-left whitespace-nowrap truncate",
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
            {value ? valueToNameMapping.get(value) ?? placeholder : placeholder}
          </Listbox.Button>
          <span
            className={twMerge(
              "absolute inset-y-0 right-0 flex items-center",
              spacing.md.marginRight,
            )}
          >
            <ArrowDownHeadIcon
              className={twMerge(
                makeDropdownClassName("arrowDownIcon"),
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
            {children}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
});

export default Dropdown;
