import React, { useContext } from "react";
import clsx from "clsx";

import { BaseColorContext, SelectedValueContext } from "contexts";

import {
  borderRadius,
  boxShadow,
  defaultColors,
  fontSize,
  getColor,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";
import { textElem } from "lib/baseStyles";

export interface ToggleItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  text?: string;
  icon?: React.ElementType;
}

const ToggleItem = React.forwardRef<HTMLButtonElement, ToggleItemProps>((props, ref) => {
  const { value, text, icon, className, onClick, ...other } = props;
  const { selectedValue, handleValueChange } = useContext(SelectedValueContext);
  const color = useContext(BaseColorContext);

  const isActive = selectedValue === value;

  const activeClassNames = clsx(
    getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
    getColorVariantsFromColorThemeValue(getColor(color).text).textColor,
    getColorVariantsFromColorThemeValue(defaultColors.lightBorder).ringColor,
    boxShadow.sm,
  );
  const inActiveClassNames = clsx(
    getColorVariantsFromColorThemeValue(defaultColors.transparent).bgColor,
    getColorVariantsFromColorThemeValue(defaultColors.darkText).hoverTextColor,
    getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
    getColorVariantsFromColorThemeValue(defaultColors.transparent).ringColor,
  );
  const Icon = icon;
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "flex items-center ring-1",
        spacing.lg.paddingLeft,
        spacing.lg.paddingRight,
        spacing.xs.paddingTop,
        spacing.xs.paddingBottom,
        fontSize.sm,
        borderRadius.md.all,
        isActive ? activeClassNames : inActiveClassNames,
        className,
      )}
      onClick={(e) => {
        handleValueChange?.(value);
        onClick?.(e);
      }}
      {...other}
    >
      {Icon ? (
        <Icon
          className={clsx(
            "opacity-70",
            text ? spacing.xs.marginRight : "",
            sizing.lg.height,
            sizing.lg.width,
          )}
          aria-hidden="true"
        />
      ) : null}
      {text ? <span className={textElem}>{text}</span> : null}
    </button>
  );
});

export default ToggleItem;
