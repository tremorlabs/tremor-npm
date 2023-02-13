import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { HoveredValueContext, SelectedValueContext } from "contexts";

import {
  BaseColors,
  border,
  borderRadius,
  colorClassNames,
  fontSize,
  isValueInArray,
  spacing,
} from "lib";

import { DEFAULT_COLOR, colorPalette } from "lib/theme";

export interface MultiSelectBoxItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  text: string;
}

const MultiSelectBoxItem = React.forwardRef<HTMLButtonElement, MultiSelectBoxItemProps>(
  (props, ref) => {
    const { value, text, className, onClick, ...other } = props;
    const { selectedValue: selectedItems, handleValueChange: handleValuesChange } =
      useContext(SelectedValueContext);
    const { hoveredValue } = useContext(HoveredValueContext);
    const isActive = isValueInArray(value, selectedItems as any[]);
    const isHovered = hoveredValue === value;

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          handleValuesChange?.(value);
          onClick?.(e);
        }}
        className={twMerge(
          "flex items-center justify-start w-full",
          spacing.twoXl.paddingX,
          spacing.md.paddingY,
          fontSize.sm,
          colorClassNames[DEFAULT_COLOR][colorPalette.lightBackground].hoverBgColor,
          colorClassNames[DEFAULT_COLOR][colorPalette.darkText].textColor,
          isHovered ? colorClassNames[DEFAULT_COLOR][colorPalette.lightBackground].bgColor : "",
          className,
        )}
        {...other}
      >
        <input
          type="checkbox"
          className={twMerge(
            "flex-none focus:ring-none focus:outline-none cursor-pointer",
            colorClassNames[DEFAULT_COLOR][colorPalette.lightRing].focusRingColor,
            colorClassNames[BaseColors.Blue][colorPalette.text].textColor,
            colorClassNames[DEFAULT_COLOR][colorPalette.border].borderColor,
            spacing.lg.marginRight,
            borderRadius.sm.all,
            border.sm.all,
          )}
          checked={isActive}
          readOnly={true}
        />
        <p className="text-sm whitespace-nowrap truncate">{text}</p>
      </button>
    );
  },
);

export default MultiSelectBoxItem;
