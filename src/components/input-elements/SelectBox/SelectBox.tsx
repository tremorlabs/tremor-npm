import React, { FormEventHandler, Fragment, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { ArrowDownHeadIcon } from "assets";

import { useInternalState, useSelectOnKeyDown } from "hooks";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import {
  BaseColors,
  border,
  borderRadius,
  boxShadow,
  fontSize,
  fontWeight,
  getColorClassNames,
  makeClassName,
  mergeRefs,
  sizing,
  spacing,
} from "lib";
import {
  constructValueToNameMapping,
  getFilteredOptions,
  getSelectButtonColors,
  hasValue,
} from "../selectUtils";
import Modal from "components/util-elements/Modal";
import { SelectBoxItemProps } from "./SelectBoxItem";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { Combobox } from "@headlessui/react";

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
    onKeyDown,
    ...other
  } = props;
  const valueToNameMapping = useMemo(() => constructValueToNameMapping(children), [children]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = icon;

  const options = React.Children.map(children, (child: { props: SelectBoxItemProps }) => ({
    ...child.props,
  }));

  const filteredOptions = getFilteredOptions(searchQuery, options);

  const filteredOptionTexts = new Set(filteredOptions.map((option) => option.text ?? option.value));
  const filteredOptionValues = filteredOptions.map((option) => option.value);

  const handleFocusChange = (isFocused: boolean) => {
    if (isFocused === false) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.value.length;
        inputRef.current.selectionEnd = inputRef.current.value.length;
      }
    }
    setIsFocused(isFocused);
  };

  return (
    <Combobox
      as="div"
      defaultValue={defaultValue}
      value={value}
      onChange={onValueChange}
      ref={mergeRefs([dropdownRef, ref])}
      className={twMerge("w-full min-w-[10rem] relative", fontSize.sm, className)}
      {...other}
    >
      <Combobox.Input
        className={twMerge(
          spacing.twoXl.paddingLeft,
          spacing.twoXl.paddingRight,
          spacing.sm.paddingY,
          borderRadius.md.all,
          border.sm.all,
          boxShadow.sm,
        )}
        placeholder="Select..."
        onChange={(event) => setSearchQuery(event.target.value)}
        displayValue={(value: string) => valueToNameMapping.get(value) ?? ""}
      />
      <Combobox.Options className="bg-white z-10 absolute border rounded-md divide-y">
        {children}
      </Combobox.Options>
    </Combobox>
  );
});

export default SelectBox;
