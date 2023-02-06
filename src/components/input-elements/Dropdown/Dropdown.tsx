import React, { useRef, useState } from "react";
import clsx from "clsx";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { useInternalState, useSelectOnKeyDown } from "hooks";

import { ArrowDownHeadIcon } from "assets";

import { MarginTop, MaxWidth } from "../../../lib/inputTypes";
import {
  border,
  borderRadius,
  boxShadow,
  constructValueToNameMapping,
  defaultColors,
  fontSize,
  fontWeight,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
  parseMaxWidth,
  sizing,
  spacing,
} from "lib";
import { DropdownItemProps } from "./DropdownItem";
import Modal from "components/layout-elements/Modal";

export interface DropdownProps<T> {
  defaultValue?: T;
  value?: T;
  onValueChange?: (value: T) => void;
  handleSelect?: (value: any) => void;
  placeholder?: string;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  marginTop?: MarginTop;
  maxWidth?: MaxWidth;
  children: React.ReactElement[] | React.ReactElement;
}

const Dropdown = <T,>({
  defaultValue,
  value,
  onValueChange,
  handleSelect, // Deprecated
  placeholder = "Select...",
  icon,
  marginTop = "mt-0",
  maxWidth = "max-w-none",
  children,
}: DropdownProps<T>) => {
  if (handleSelect !== undefined) {
    console.warn(
      "DeprecationWarning: The `handleSelect` property is deprecated and will be removed in the next major release. Please use `onValueChange` instead.",
    );
  }

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef(null);

  const Icon = icon;
  const valueToNameMapping = constructValueToNameMapping(children);
  const optionValues = React.Children.map(
    children,
    (child: { props: DropdownItemProps }) => child.props.value,
  );

  const handleValueChange = (value: T) => {
    setSelectedValue(value);
    handleSelect?.(value);
    setIsFocused(false);
    onValueChange?.(value);
  };

  const [hoveredValue, handleKeyDown] = useSelectOnKeyDown(
    handleValueChange,
    optionValues,
    isFocused,
    setIsFocused,
    selectedValue as T,
  );

  return (
    <div
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      className={clsx(
        "tremor-base relative w-full min-w-[10rem]",
        parseMaxWidth(maxWidth),
        getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
        getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
        getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
        parseMarginTop(marginTop),
        borderRadius.md.all,
        border.sm.all,
        boxShadow.sm,
      )}
    >
      <button
        type="button"
        className={clsx(
          "input-elem flex justify-between items-center w-full",
          "focus:outline-0 focus:ring-0",
          Icon ? spacing.xl.paddingLeft : spacing.twoXl.paddingLeft,
          spacing.twoXl.paddingRight,
          spacing.sm.paddingTop,
          spacing.sm.paddingBottom,
        )}
        onClick={() => setIsFocused(!isFocused)}
      >
        <div className="flex justify-start items-center truncate">
          {Icon ? (
            <Icon
              className={clsx(
                "shrink-0",
                sizing.lg.height,
                sizing.lg.width,
                getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                spacing.lg.marginRight,
              )}
              aria-hidden="true"
            />
          ) : null}
          <p
            className={clsx(
              "text-elem whitespace-nowrap truncate",
              fontSize.sm,
              fontWeight.md,
              selectedValue
                ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
            )}
          >
            {selectedValue ? valueToNameMapping.get(selectedValue) : placeholder}
          </p>
        </div>
        <ArrowDownHeadIcon
          className={clsx(
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.twoXs.negativeMarginRight,
            getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
          )}
          aria-hidden="true"
        />
      </button>
      <Modal showModal={isFocused} setShowModal={setIsFocused} triggerRef={dropdownRef}>
        <SelectedValueContext.Provider value={{ selectedValue, handleValueChange }}>
          <HoveredValueContext.Provider value={{ hoveredValue }}>
            {React.Children.map(children, (child: React.ReactElement) => React.cloneElement(child))}
          </HoveredValueContext.Provider>
        </SelectedValueContext.Provider>
      </Modal>
    </div>
  );
};

export default Dropdown;
