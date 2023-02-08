import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { useInternalState, useSelectOnKeyDown } from "hooks";

import { ArrowDownHeadIcon } from "assets";

import {
  border,
  borderRadius,
  boxShadow,
  constructValueToNameMapping,
  defaultColors,
  fontSize,
  fontWeight,
  getColorVariantsFromColorThemeValue,
  mergeRefs,
  sizing,
  spacing,
} from "lib";
import { DropdownItemProps } from "./DropdownItem";
import Modal from "components/layout-elements/Modal";

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  icon?: React.JSXElementConstructor<any>;
  children: React.ReactElement[] | React.ReactElement;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    placeholder = "Select...",
    icon,
    children,
    className,
    ...other
  } = props;
  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef(null);

  const Icon = icon;
  const valueToNameMapping = constructValueToNameMapping(children);
  const optionValues = React.Children.map(
    children,
    (child: { props: DropdownItemProps }) => child.props.value,
  );

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setIsFocused(false);
    onValueChange?.(value);
  };

  const [hoveredValue, handleKeyDown] = useSelectOnKeyDown(
    handleValueChange,
    optionValues,
    isFocused,
    setIsFocused,
    selectedValue,
  );

  return (
    <div
      ref={mergeRefs([dropdownRef, ref])}
      onKeyDown={handleKeyDown}
      className={twMerge(
        "relative w-full min-w-[10rem]",
        getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
        getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
        getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
        borderRadius.md.all,
        border.sm.all,
        boxShadow.sm,
        className,
      )}
      {...other}
    >
      <button
        type="button"
        className={twMerge(
          "flex justify-between items-center w-full",
          "focus:outline-0 focus:ring-0",
          Icon ? spacing.xl.paddingLeft : spacing.twoXl.paddingLeft,
          spacing.twoXl.paddingRight,
          spacing.sm.paddingY,
        )}
        onClick={() => setIsFocused(!isFocused)}
      >
        <div className="flex justify-start items-center truncate">
          {Icon ? (
            <Icon
              className={twMerge(
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
            className={twMerge(
              "whitespace-nowrap truncate",
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
          className={twMerge(
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.twoXs.negativeMarginRight,
            getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
          )}
          aria-hidden="true"
        />
      </button>
      <Modal showModal={isFocused} setShowModal={setIsFocused} parentRef={dropdownRef}>
        <SelectedValueContext.Provider value={{ selectedValue, handleValueChange }}>
          <HoveredValueContext.Provider value={{ hoveredValue }}>
            {React.Children.map(children, (child: React.ReactElement) => React.cloneElement(child))}
          </HoveredValueContext.Provider>
        </SelectedValueContext.Provider>
      </Modal>
    </div>
  );
});

export default Dropdown;
