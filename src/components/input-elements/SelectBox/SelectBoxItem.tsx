import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { fontSize } from "lib/font";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";
import { colorClassNames } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

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
              colorClassNames[DEFAULT_COLOR][colorPalette.lightBackground].bgColor,
              colorClassNames[DEFAULT_COLOR][colorPalette.darkestText].textColor,
            )
          : twMerge(
              colorClassNames[DEFAULT_COLOR][colorPalette.lightBackground].hoverBgColor,
              colorClassNames[DEFAULT_COLOR][colorPalette.darkText].textColor,
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
              colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
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
