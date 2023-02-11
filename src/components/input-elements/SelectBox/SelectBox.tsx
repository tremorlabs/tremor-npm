import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { ArrowDownHeadIcon } from "assets";

import { useInternalState, useSelectOnKeyDown } from "hooks";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import {
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
import Modal from "components/layout-elements/Modal";
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
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    ...other
  } = props;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSelectBoxHovered, setIsSelectBoxHovered] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = icon;
  const valueToNameMapping = constructValueToNameMapping(children);

  useEffect(() => {
    setInputValue(valueToNameMapping.get(selectedValue) || "");
  }, [selectedValue]);

  const options = React.Children.map(children, (child: { props: SelectBoxItemProps }) => ({
    ...child.props,
  }));

  const filteredOptions = getFilteredOptions(searchQuery, options);

  const filteredOptionTexts = new Set(filteredOptions.map((option) => option.text));
  const filteredOptionValues = filteredOptions.map((option) => option.value);

  const handleFocusChange = (isFocused: boolean) => {
    if (isFocused === false) {
      inputRef.current?.blur();
    }
    setIsFocused(isFocused);
  };

  const handleValueChange = (value: string) => {
    setSearchQuery("");
    setInputValue(valueToNameMapping.get(selectedValue) || "");
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
      onClick={(e) => {
        handleFocusChange(!isFocused);
        onClick?.(e);
      }}
      onKeyDown={(e) => {
        handleKeyDown(e);
        onKeyDown?.(e);
      }}
      className={twMerge(
        "relative w-full min-w-[10rem]",
        !isSelectBoxHovered
          ? colorClassNames[WHITE]["none"].bgColor
          : colorClassNames[DEFAULT_COLOR][colorPalette.lightBackground].bgColor,
        colorClassNames[DEFAULT_COLOR][colorPalette.border].borderColor,
        borderRadius.md.all,
        border.sm.all,
        boxShadow.sm,
        className,
      )}
      onMouseEnter={(e) => {
        setIsSelectBoxHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsSelectBoxHovered(false);
        onMouseLeave?.(e);
      }}
      {...other}
    >
      <div className="flex items-center overflow-hidden">
        {Icon ? (
          <button type="button" className={twMerge("p-0", spacing.xl.marginLeft)}>
            <Icon
              className={twMerge(
                "shrink-0 bg-inherit",
                sizing.lg.height,
                sizing.lg.width,
                colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
              )}
              aria-hidden="true"
            />
          </button>
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
            "pr-10", // avoid text overflow at arrow down icon
          )}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputValueChange}
        />
        <button
          type="button"
          className={twMerge("absolute top-1/2 -translate-y-1/2 bg-inherit", spacing.twoXl.right)}
        >
          <ArrowDownHeadIcon
            className={twMerge(
              "flex-none",
              sizing.lg.height,
              sizing.lg.width,
              spacing.twoXs.negativeMarginRight,
              colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
            )}
            aria-hidden="true"
          />
        </button>
      </div>
      <Modal
        showModal={filteredOptions.length === 0 ? false : isFocused}
        setShowModal={handleFocusChange}
        parentRef={dropdownRef}
      >
        <SelectedValueContext.Provider value={{ selectedValue, handleValueChange }}>
          <HoveredValueContext.Provider value={{ hoveredValue }}>
            {React.Children.map(children, (child) => {
              if (filteredOptionTexts.has(String(child.props.text))) {
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
