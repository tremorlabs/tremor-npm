import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { useInternalState, useSelectOnKeyDown } from "hooks";

import { ArrowDownHeadIcon, SearchIcon, XCircleIcon } from "assets";

import {
  border,
  borderRadius,
  boxShadow,
  colorClassNames,
  fontSize,
  fontWeight,
  getFilteredOptions,
  isValueInArray,
  mergeRefs,
  removeValueFromArray,
  sizing,
  spacing,
} from "lib";
import Modal from "components/util-elements/Modal";
import { MultiSelectBoxItemProps } from "./MultiSelectBoxItem";
import { DEFAULT_COLOR, TRANSPARENT, WHITE, colorPalette } from "lib/theme";

export interface MultiSelectBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
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
      className={twMerge(
        "relative w-full min-w-[10rem]",
        colorClassNames[WHITE]["none"].bgColor,
        colorClassNames[DEFAULT_COLOR][colorPalette.border].borderColor,
        colorClassNames[DEFAULT_COLOR][colorPalette.canvasBackground].hoverBgColor,
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
        className={twMerge(
          "flex justify-between items-center w-full",
          "focus:ring-0 focus:outline-0",
          Icon ? spacing.xl.paddingLeft : spacing.twoXl.paddingLeft,
          spacing.twoXl.paddingRight,
          spacing.sm.paddingY,
        )}
        onClick={() => handleModalToggle(!showModal)}
      >
        <div className="flex justify-start items-center truncate">
          {Icon ? (
            <Icon
              className={twMerge(
                "shrink-0",
                sizing.lg.height,
                sizing.lg.width,
                colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
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
              selectedItems.length !== 0
                ? colorClassNames[DEFAULT_COLOR][colorPalette.darkText].textColor
                : colorClassNames[DEFAULT_COLOR][colorPalette.text].textColor,
            )}
          >
            {displayText}
          </p>
        </div>
        <div className="flex items-center">
          {showResetButton ? (
            <div
              role="button"
              className={twMerge(spacing.xs.marginRight)}
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
                  colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
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
              colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
            )}
            aria-hidden="true"
          />
        </div>
      </button>
      <Modal showModal={showModal} setShowModal={handleModalToggle} parentRef={dropdownRef}>
        <div
          className={twMerge(
            "flex items-center w-full",
            colorClassNames[DEFAULT_COLOR][colorPalette.canvasBackground].bgColor,
            spacing.twoXl.paddingX,
          )}
        >
          <span>
            <SearchIcon
              className={twMerge(
                "flex-none",
                colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
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
              colorClassNames[DEFAULT_COLOR][colorPalette.darkText].textColor,
              colorClassNames[TRANSPARENT]["none"].bgColor,
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
