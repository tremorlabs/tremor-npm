import React, { useContext } from "react";
import clsx from "clsx";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { getColorVariantsFromColorThemeValue } from "lib/classnameUtils";
import { defaultColors } from "lib/colors";
import { fontSize } from "lib/font";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";
import { textElem } from "lib/baseStyles";

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  text?: string;
  icon?: React.ElementType;
}

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>((props, ref) => {
  const { value, text, icon, className, ...other } = props;
  const { selectedValue, handleValueChange } = useContext(SelectedValueContext);
  const { hoveredValue } = useContext(HoveredValueContext);
  const isActive = selectedValue === value || hoveredValue === value;

  const Icon = icon ? icon : null;
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => handleValueChange?.(value)}
      className={clsx(
        "flex items-center justify-between w-full",
        spacing.twoXl.paddingX,
        spacing.md.paddingY,
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
        className,
      )}
      {...other}
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
        <p className={textElem}>{text ?? value}</p>
      </div>
    </button>
  );
});

export default DropdownItem;
