"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { HoveredValueContext, SelectedValueContext } from "contexts";

import {
  BaseColors,
  border,
  borderRadius,
  colorClassNames,
  fontSize,
  getColorClassNames,
  isValueInArray,
  makeClassName,
  spacing,
} from "lib";

import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeMultiSelectBoxItenClassName = makeClassName("MultiSelectBoxItem");

export interface MultiSelectBoxItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  text?: string;
}

const MultiSelectBoxItem = React.forwardRef<HTMLButtonElement, MultiSelectBoxItemProps>(
  (props, ref) => {
    const { value, text, className, onClick, ...other } = props;
    const { selectedValue: selectedItems, handleValueChange: handleValuesChange } =
      useContext(SelectedValueContext);
    const { hoveredValue } = useContext(HoveredValueContext);
    const isActive = isValueInArray(value, selectedItems as any[]);
    const isHovered = hoveredValue === value;

    const bgColor = isActive
      ? getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).bgColor
      : isHovered
      ? getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).bgColor
      : getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).hoverBgColor;
    const textColor = isActive
      ? getColorClassNames(DEFAULT_COLOR, colorPalette.darkestText).textColor
      : getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor;

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          handleValuesChange?.(value);
          onClick?.(e);
        }}
        className={twMerge(
          makeMultiSelectBoxItenClassName("root"),
          "flex items-center justify-start w-full",
          spacing.twoXl.paddingX,
          spacing.md.paddingY,
          fontSize.sm,
          getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).hoverBgColor,
          getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
          bgColor,
          textColor,
          className,
        )}
        {...other}
      >
        <input
          type="checkbox"
          className={twMerge(
            makeMultiSelectBoxItenClassName("checkbox"),
            "flex-none focus:ring-none focus:outline-none cursor-pointer",
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightRing).focusRingColor,
            colorClassNames[BaseColors.Blue][colorPalette.text].textColor,
            getColorClassNames(DEFAULT_COLOR, colorPalette.ring).borderColor,
            spacing.lg.marginRight,
            borderRadius.sm.all,
            border.sm.all,
          )}
          checked={isActive}
          readOnly={true}
        />
        <p
          className={twMerge(
            makeMultiSelectBoxItenClassName("text"),
            "text-sm whitespace-nowrap truncate",
          )}
        >
          {text ?? value}
        </p>
      </button>
    );
  },
);

export default MultiSelectBoxItem;
