import React, { useContext } from "react";
import clsx from "clsx";
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

export interface MultiSelectBoxItemProps {
  value: any;
  text: string;
}

const MultiSelectBoxItem = ({ value, text }: MultiSelectBoxItemProps) => {
  const { selectedValue: selectedItems, handleValueChange: handleValuesChange } =
    useContext(SelectedValueContext);
  const { hoveredValue } = useContext(HoveredValueContext);
  const isActive = isValueInArray(value, selectedItems as any[]);
  const isHovered = hoveredValue === value;

  return (
    <button
      type="button"
      onClick={() => handleValuesChange?.(value)}
      className={clsx(
        "input-elem flex items-center justify-between w-full",
        spacing.twoXl.paddingLeft,
        spacing.twoXl.paddingRight,
        spacing.md.paddingTop,
        spacing.md.paddingBottom,
        fontSize.sm,
        getColorVariantsFromColorThemeValue(defaultColors.lightBackground).hoverBgColor,
        getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
        isHovered ? getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor : "",
      )}
    >
      <div className="flex items-center truncate">
        <input
          type="checkbox"
          className={clsx(
            "input-elem flex-none focus:ring-none focus:outline-none cursor-pointer",
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
        <p className="text-elem whitespace-nowrap truncate">{text}</p>
      </div>
    </button>
  );
};

export default MultiSelectBoxItem;
