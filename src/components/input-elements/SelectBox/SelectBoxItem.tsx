import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { getColorVariantsFromColorThemeValue } from "lib/classnameUtils";
import { defaultColors } from "lib/colors";
import { fontSize } from "lib/font";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";

export interface SelectBoxItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  text: string;
  icon?: React.ElementType;
}

const SelectBoxItem = React.forwardRef<HTMLButtonElement, SelectBoxItemProps>((props, ref) => {
  const { value, text, icon, className, onClick, ...other } = props;
  const { selectedValue, handleValueChange } = useContext(SelectedValueContext);
  const { hoveredValue } = useContext(HoveredValueContext);
  const isActive = selectedValue === value || hoveredValue === value;

  const Icon = icon;

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        handleValueChange?.(value);
        onClick?.(e);
      }}
      className={twMerge(
        "flex items-center justify-between w-full",
        spacing.twoXl.paddingX,
        spacing.md.paddingY,
        fontSize.sm,
        isActive
          ? twMerge(
              getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
              getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor,
            )
          : twMerge(
              getColorVariantsFromColorThemeValue(defaultColors.lightBackground).hoverBgColor,
              getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
            ),
        className,
      )}
      {...other}
    >
      <div className="flex items-center truncate">
        {Icon ? (
          <Icon
            className={twMerge(
              "flex-none",
              sizing.lg.height,
              sizing.lg.width,
              spacing.lg.marginRight,
              getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
            )}
            aria-hidden="true"
          />
        ) : null}
        <p className="whitespace-nowrap truncate">{text}</p>
      </div>
    </button>
  );
});

export default SelectBoxItem;
