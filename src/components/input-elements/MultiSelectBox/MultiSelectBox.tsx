import React, { useRef, useState } from "react";
import clsx from "clsx";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { useInternalState, useSelectOnKeyDown } from "hooks";

import { ArrowDownHeadIcon, SearchIcon, XCircleIcon } from "assets";

import { MarginTop, MaxWidth } from "../../../lib/inputTypes";
import {
  border,
  borderRadius,
  boxShadow,
  defaultColors,
  fontSize,
  fontWeight,
  getColorVariantsFromColorThemeValue,
  getFilteredOptions,
  isValueInArray,
  mergeRefs,
  removeValueFromArray,
  sizing,
  spacing,
} from "lib";
import Modal from "components/layout-elements/Modal";
import { MultiSelectBoxItemProps } from "./MultiSelectBoxItem";

export interface MultiSelectBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  marginTop?: MarginTop;
  maxWidth?: MaxWidth;
  children: React.ReactElement[] | React.ReactElement;
}

const MultiSelectBox = React.forwardRef<HTMLDivElement, MultiSelectBoxProps>((props, ref) => {
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

  const Icon = icon;
  const dropdownRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedItems = selectedValue ?? [];
  const displayText = selectedItems.length !== 0 ? `${selectedItems.length} Selected` : placeholder;
  const showResetButton = selectedItems.length > 0;

  const options = React.Children.map(children, (child: { props: MultiSelectBoxItemProps }) => ({
    ...child.props,
  }));
  const filteredOptions = getFilteredOptions(searchQuery, options);
  const filteredOptionTexts = new Set(filteredOptions.map((option) => option.text));
  const filteredOptionValues = filteredOptions.map((option) => option.value);

  const handleModalToggle = (show: boolean) => {
    setSearchQuery("");
    setShowModal(show);
  };

  const handleValueChange = (value: string) => {
    let newSelectedItems = [];
    if (!isValueInArray(value, selectedItems)) {
      newSelectedItems = [...selectedItems, value];
    } else {
      newSelectedItems = [...removeValueFromArray(value, selectedItems!)];
    }
    setSelectedValue(newSelectedItems);
    onValueChange?.(newSelectedItems);
  };

  const handleReset = () => {
    setSelectedValue([]);
    onValueChange?.([]);
  };

  const [hoveredValue, handleKeyDown] = useSelectOnKeyDown(
    handleValueChange,
    filteredOptionValues,
    showModal,
    setShowModal,
  );

  return (
    <div
      ref={mergeRefs([dropdownRef, ref])}
      className={clsx(
        "relative w-full min-w-[10rem]",
        getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
        getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
        getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
        borderRadius.md.all,
        border.sm.all,
        boxShadow.sm,
        className,
      )}
      onKeyDown={(e) => {
        handleKeyDown(e);
        onKeyDown?.(e);
      }}
      {...other}
    >
      <button
        type="button"
        className={clsx(
          "flex justify-between items-center w-full",
          "focus:ring-0 focus:outline-0",
          Icon ? spacing.xl.paddingLeft : spacing.twoXl.paddingLeft,
          spacing.twoXl.paddingRight,
          spacing.sm.paddingTop,
          spacing.sm.paddingBottom,
        )}
        onClick={() => handleModalToggle(!showModal)}
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
              "whitespace-nowrap truncate",
              fontSize.sm,
              fontWeight.md,
              selectedItems.length !== 0
                ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
            )}
          >
            {displayText}
          </p>
        </div>
        <div className="flex items-center">
          {showResetButton ? (
            <div
              role="button"
              className={clsx(spacing.xs.marginRight)}
              onClick={(e) => {
                e.stopPropagation(); // prevent firing parent button
                handleReset();
              }}
            >
              <XCircleIcon
                className={clsx(
                  "flex-none",
                  sizing.md.height,
                  sizing.md.width,
                  getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                )}
                aria-hidden="true"
              />
            </div>
          ) : null}
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
        </div>
      </button>
      <Modal showModal={showModal} setShowModal={handleModalToggle} parentRef={dropdownRef}>
        <div
          className={clsx(
            "flex items-center w-full",
            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).bgColor,
            spacing.twoXl.paddingLeft,
            spacing.twoXl.paddingRight,
          )}
        >
          <span>
            <SearchIcon
              className={clsx(
                "flex-none",
                getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
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
            className={clsx(
              "w-full focus:outline-none focus:ring-none",
              getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
              getColorVariantsFromColorThemeValue(defaultColors.transparent).bgColor,
              spacing.sm.paddingTop,
              spacing.sm.paddingBottom,
              fontSize.sm,
              fontWeight.md,
            )}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <SelectedValueContext.Provider
          value={{
            selectedValue: selectedItems,
            handleValueChange,
          }}
        >
          <HoveredValueContext.Provider value={{ hoveredValue }}>
            {React.Children.map(children, (child) => {
              if (filteredOptionTexts.has(String(child.props.text))) {
                return React.cloneElement(child);
              }
            })}
          </HoveredValueContext.Provider>
        </SelectedValueContext.Provider>
      </Modal>
    </div>
  );
});

export default MultiSelectBox;
