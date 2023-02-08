import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { HoveredValueContext, SelectedValueContext } from "contexts";

import {
  BaseColors,
  border,
  borderRadius,
  defaultColors,
  fontSize,
  getColor,
  getColorVariantsFromColorThemeValue,
  isValueInArray,
  spacing,
} from "lib";
import { textElem } from "lib/baseStyles";

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
          "flex items-center justify-between w-full",
          spacing.twoXl.paddingX,
          spacing.md.paddingY,
          fontSize.sm,
          getColorVariantsFromColorThemeValue(defaultColors.lightBackground).hoverBgColor,
          getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
          isHovered
            ? getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor
            : "",
          className,
        )}
        {...other}
      >
        <div className="flex items-center truncate">
          <input
            type="checkbox"
            className={twMerge(
              "flex-none focus:ring-none focus:outline-none cursor-pointer",
              getColorVariantsFromColorThemeValue(defaultColors.lightRing).focusRingColor,
              getColorVariantsFromColorThemeValue(getColor(BaseColors.Blue).text).textColor,
              getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
              spacing.lg.marginRight,
              borderRadius.sm.all,
              border.sm.all,
            )}
            checked={isActive}
            readOnly={true}
          />
          <p className={textElem}>{text}</p>
        </div>
      </button>
    );
  },
);

export default MultiSelectBoxItem;
