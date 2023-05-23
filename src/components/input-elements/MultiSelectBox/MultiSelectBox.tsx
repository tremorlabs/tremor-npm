"use client";
import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { useInternalState, useSelectOnKeyDown } from "hooks";

import { ArrowDownHeadIcon, SearchIcon, XCircleIcon } from "assets";

import {
  border,
  borderRadius,
  boxShadow,
  fontSize,
  fontWeight,
  getColorClassNames,
  isValueInArray,
  makeClassName,
  mergeRefs,
  removeValueFromArray,
  sizing,
  spacing,
} from "lib";
import { getFilteredOptions, getSelectButtonColors } from "../selectUtils";
import { Modal } from "components/util-elements/Modal";
import { MultiSelectBoxItemProps } from "./MultiSelectBoxItem";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeMultiSelectBoxClassName = makeClassName("MultiSelectBox");

export interface MultiSelectBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  children: React.ReactElement[] | React.ReactElement;
}

const MultiSelectBox = React.forwardRef<HTMLDivElement, MultiSelectBoxProps>((props, ref) => {
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

  const Icon = icon;
  const dropdownRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedItems = selectedValue ?? [];
  const hasSelection = selectedItems.length > 0;
  const displayText = hasSelection ? `${selectedItems.length} Selected` : placeholder;

  const options = React.Children.map(children, (child: { props: MultiSelectBoxItemProps }) => ({
    ...child.props,
  }));
  const filteredOptions = getFilteredOptions(searchQuery, options);
  const filteredOptionTexts = new Set(filteredOptions.map((option) => option.text ?? option.value));
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
      className={twMerge(
        makeMultiSelectBoxClassName("root"),
        "relative w-full min-w-[10rem]",
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
        className={twMerge(
          makeMultiSelectBoxClassName("button"),
          "flex justify-between items-center w-full focus:outline-none focus:ring-2",
          getSelectButtonColors(hasSelection, disabled),
          getColorClassNames("blue", colorPalette.lightRing).focusRingColor,
          borderRadius.md.all,
          border.sm.all,
          boxShadow.sm,
          Icon ? spacing.xl.paddingLeft : spacing.twoXl.paddingLeft,
          spacing.twoXl.paddingRight,
          spacing.sm.paddingY,
        )}
        onClick={() => handleModalToggle(!showModal)}
        disabled={disabled}
      >
        <div className="flex justify-start items-center truncate">
          {Icon ? (
            <Icon
              className={twMerge(
                makeMultiSelectBoxClassName("icon"),
                "shrink-0",
                sizing.lg.height,
                sizing.lg.width,
                getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
                spacing.lg.marginRight,
              )}
              aria-hidden="true"
            />
          ) : null}
          <p
            className={twMerge(
              makeMultiSelectBoxClassName("text"),
              "whitespace-nowrap truncate",
              fontSize.sm,
              fontWeight.md,
            )}
          >
            {displayText}
          </p>
        </div>
        <div className="flex items-center">
          {hasSelection && !disabled ? (
            <div
              role="button"
              className={twMerge(
                makeMultiSelectBoxClassName("resetButton"),
                spacing.xs.marginRight,
              )}
              onClick={(e) => {
                e.stopPropagation(); // prevent firing parent button
                handleReset();
              }}
            >
              <XCircleIcon
                className={twMerge(
                  "flex-none",
                  sizing.md.height,
                  sizing.md.width,
                  getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
                )}
                aria-hidden="true"
              />
            </div>
          ) : null}
          <ArrowDownHeadIcon
            className={twMerge(
              "flex-none",
              sizing.lg.height,
              sizing.lg.width,
              spacing.twoXs.negativeMarginRight,
              getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
            )}
            aria-hidden="true"
          />
        </div>
      </button>
      <Modal showModal={showModal} setShowModal={handleModalToggle} parentRef={dropdownRef}>
        <div
          className={twMerge(
            "flex items-center w-full",
            getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).bgColor,
            spacing.twoXl.paddingX,
          )}
        >
          <span>
            <SearchIcon
              className={twMerge(
                "flex-none",
                getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
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
            className={twMerge(
              "w-full focus:outline-none focus:ring-none",
              getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
              getColorClassNames("transparent").bgColor,
              spacing.sm.paddingY,
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
              const optionText = child.props.text ?? child.props.value;
              if (filteredOptionTexts.has(String(optionText))) {
                return React.cloneElement(child);
              }
            })}
          </HoveredValueContext.Provider>
        </SelectedValueContext.Provider>
      </Modal>
    </div>
  );
});

MultiSelectBox.displayName = "MultiSelectBox";

export default MultiSelectBox;
