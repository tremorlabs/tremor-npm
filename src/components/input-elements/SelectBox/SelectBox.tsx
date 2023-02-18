import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { ArrowDownHeadIcon } from "assets";

import { useInternalState, useSelectOnKeyDown } from "hooks";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import {
  BaseColors,
  border,
  borderRadius,
  boxShadow,
  colorClassNames,
  constructValueToNameMapping,
  fontSize,
  fontWeight,
  getFilteredOptions,
  mergeRefs,
  sizing,
  spacing,
} from "lib";
import Modal from "components/util-elements/Modal";
import { SelectBoxItemProps } from "./SelectBoxItem";
import { DEFAULT_COLOR, WHITE, colorPalette } from "lib/theme";

export interface SelectBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  children: React.ReactElement[] | React.ReactElement;
}

const SelectBox = React.forwardRef<HTMLDivElement, SelectBoxProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    placeholder = "Select...",
    icon,
    children,
    className,
    onKeyDown,
    ...other
  } = props;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = icon;
  const valueToNameMapping = constructValueToNameMapping(children);

  useEffect(() => {
    if (selectedValue) setInputValue(valueToNameMapping.get(selectedValue) || "");
  }, [selectedValue]);

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
    }
    setIsFocused(isFocused);
  };

  const handleValueChange = (value: string) => {
    setSearchQuery("");
    if (selectedValue) setInputValue(valueToNameMapping.get(selectedValue) || "");
    handleFocusChange(false);
    setSelectedValue(value);
    inputRef.current?.blur();

    onValueChange?.(value);
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setInputValue(e.target.value);
  };

  const [hoveredValue, handleKeyDown] = useSelectOnKeyDown(
    handleValueChange,
    filteredOptionValues,
    isFocused,
    handleFocusChange,
    selectedValue,
  );

  return (
    <div
      ref={mergeRefs([dropdownRef, ref])}
      onKeyDown={(e) => {
        handleKeyDown(e);
        onKeyDown?.(e);
      }}
      className={twMerge("w-full min-w-[10rem]", className)}
      {...other}
    >
      <div
        className={twMerge(
          "flex w-full items-center overflow-hidden focus:outline-none focus:ring-2",
          colorClassNames[WHITE]["none"].bgColor,
          colorClassNames[DEFAULT_COLOR][colorPalette.canvasBackground].hoverBgColor,
          isFocused &&
            twMerge("ring-2", colorClassNames[BaseColors.Blue][colorPalette.border].ringColor),
          colorClassNames[DEFAULT_COLOR][colorPalette.border].borderColor,
          colorClassNames[BaseColors.Blue][colorPalette.border].focusRingColor,
          borderRadius.md.all,
          border.sm.all,
          boxShadow.sm,
        )}
        onClick={(e) => {
          handleFocusChange(!isFocused);
          e.preventDefault();
        }}
      >
        {Icon ? (
          <Icon
            className={twMerge(
              "shrink-0 bg-inherit",
              sizing.lg.height,
              sizing.lg.width,
              spacing.xl.marginLeft,
              colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
            )}
            aria-hidden="true"
          />
        ) : null}
        <input
          ref={inputRef}
          type="text"
          className={twMerge(
            "w-full focus:outline-0 focus:ring-0 bg-inherit",
            colorClassNames[DEFAULT_COLOR][colorPalette.darkText].textColor,
            Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
            spacing.sm.paddingY,
            fontSize.sm,
            fontWeight.md,
            border.none.all,
            "placeholder:text-gray-500",
          )}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputValueChange}
          onFocus={() => handleFocusChange(true)}
          onMouseDown={(e) => e.preventDefault()}
        />
        <ArrowDownHeadIcon
          className={twMerge(
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.lg.marginRight,
            colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
          )}
          aria-hidden="true"
        />
      </div>
      <Modal
        showModal={filteredOptions.length === 0 ? false : isFocused}
        setShowModal={handleFocusChange}
        parentRef={dropdownRef}
      >
        <SelectedValueContext.Provider value={{ selectedValue, handleValueChange }}>
          <HoveredValueContext.Provider value={{ hoveredValue }}>
            {React.Children.map(children, (child) => {
              const optionValue = child.props.text ?? child.props.value;
              if (filteredOptionTexts.has(String(optionValue))) {
                return React.cloneElement(child);
              }
              return null;
            })}
          </HoveredValueContext.Provider>
        </SelectedValueContext.Provider>
      </Modal>
    </div>
  );
});

export default SelectBox;