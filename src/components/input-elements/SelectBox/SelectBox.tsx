import React, { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

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
import {
  constructValueToNameMapping,
  getFilteredOptions,
  getSelectButtonColors,
  hasValue,
} from "../selectUtils";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
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
  const hasSelection = hasValue(value);

  return (
    <Combobox
      as="div"
      defaultValue={defaultValue}
      value={value}
      onChange={onValueChange as any}
      ref={ref}
      className={twMerge("w-full min-w-[10rem] relative", fontSize.sm, className)}
      {...other}
    >
      <Combobox.Button
        className={twMerge("absolute inset-y-0 left-0 flex items-center", spacing.md.paddingLeft)}
      >
        {Icon && (
          <Icon
            className={twMerge(
              makeSelectBoxClassName("Icon"),
              "flex-none",
              sizing.lg.height,
              sizing.lg.width,
              getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
            )}
            aria-hidden="true"
          />
        )}
      </Combobox.Button>
      <Combobox.Input
        className={twMerge(
          "w-full outline-none focus:ring-2 cursor-default",
          Icon ? spacing.fourXl.paddingLeft : spacing.twoXl.paddingLeft,
          spacing.fourXl.paddingRight,
          spacing.sm.paddingY,
          fontWeight.md,
          borderRadius.md.all,
          border.sm.all,
          boxShadow.sm,
          disabled ? "placeholder:text-gray-400" : "placeholder:text-gray-500",
          getSelectButtonColors(hasSelection, disabled),
        )}
        placeholder={placeholder}
        onChange={(event) => setSearchQuery(event.target.value)}
        displayValue={(value: string) => valueToNameMapping.get(value) ?? ""}
      />
      <Combobox.Button
        className={twMerge("absolute inset-y-0 right-0 flex items-center", spacing.md.paddingRight)}
      >
        <ArrowDownHeadIcon
          className={twMerge(
            makeSelectBoxClassName("arrowDownIcon"),
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
          )}
          aria-hidden="true"
        />
      </Combobox.Button>
      <Combobox.Options
        className={twMerge(
          "absolute z-10 divide-y overflow-y-auto max-h-[228px] w-full left-0",
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
        {React.Children.map(children, (child) => {
          const optionValue = child.props.text ?? child.props.value;
          if (filteredOptionTexts.has(String(optionValue))) {
            return React.cloneElement(child);
          }
          return null;
        })}
      </Combobox.Options>
    </Combobox>
  );
});

export default SelectBox;
