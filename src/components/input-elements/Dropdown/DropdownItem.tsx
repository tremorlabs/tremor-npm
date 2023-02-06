import React, { useContext } from "react";
import clsx from "clsx";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { getColorVariantsFromColorThemeValue } from "lib/classnameUtils";
import { defaultColors } from "lib/colors";
import { fontSize } from "lib/font";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";

export interface DropdownItemProps {
  value: any;
  text: string;
  icon?: React.ElementType;
}

const DropdownItem = ({ value, text, icon }: DropdownItemProps) => {
  const { selectedValue, handleValueChange } = useContext(SelectedValueContext);
  const { hoveredValue } = useContext(HoveredValueContext);
  const isActive = selectedValue === value || hoveredValue === value;

  const Icon = icon ? icon : null;
  return (
    <button
      type="button"
      onClick={() => handleValueChange?.(value)}
      className={clsx(
        "input-elem flex items-center justify-between w-full",
        spacing.twoXl.paddingLeft,
        spacing.twoXl.paddingRight,
        spacing.md.paddingTop,
        spacing.md.paddingBottom,
        fontSize.sm,
        isActive
          ? clsx(
              getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
              getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor,
            )
          : clsx(
              getColorVariantsFromColorThemeValue(defaultColors.lightBackground).hoverBgColor,
              getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
            ),
      )}
    >
      <div className="flex items-center truncate">
        {Icon ? (
          <Icon
            className={clsx(
              "flex-none",
              sizing.lg.height,
              sizing.lg.width,
              spacing.lg.marginRight,
              getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
            )}
            aria-hidden="true"
          />
        ) : null}
        <p className="text-elem whitespace-nowrap truncate">{text}</p>
      </div>
    </button>
  );
};

export default DropdownItem;
