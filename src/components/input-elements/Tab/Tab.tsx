import React, { useContext } from "react";
import clsx from "clsx";

import { BaseColorContext, SelectedValueContext } from "contexts";

import {
  border,
  defaultColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";
import { textElem } from "lib/baseStyles";

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  text: string;
  icon?: React.ElementType;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { value, text, icon, className, onClick, ...other } = props;
  const { selectedValue, handleValueChange } = useContext(SelectedValueContext);
  const color = useContext(BaseColorContext);

  const isActive = selectedValue === value;
  const Icon = icon;

  const activeClassNames = clsx(
    getColorVariantsFromColorThemeValue(getColor(color).text).textColor,
    getColorVariantsFromColorThemeValue(getColor(color).darkBorder).borderColor,
    border.md.bottom,
  );
  const inActiveClassNames = clsx(
    getColorVariantsFromColorThemeValue(defaultColors.transparent).borderColor,
    getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
    getColorVariantsFromColorThemeValue(defaultColors.text).hoverTextColor,
    getColorVariantsFromColorThemeValue(defaultColors.border).hoverBorderColor,
    "hover:border-b-2",
  );

  return (
    <button
      ref={ref}
      className={clsx(
        "flex whitespace-nowrap max-w-xs truncate",
        "focus:outline-0 focus:ring-0",
        spacing.twoXs.paddingRight,
        spacing.twoXs.paddingLeft,
        spacing.sm.paddingTop,
        spacing.sm.paddingBottom,
        spacing.px.negativeMarginBottom,
        fontSize.sm,
        fontWeight.md,
        isActive ? activeClassNames : inActiveClassNames,
        className,
      )}
      value={value}
      onClick={(e) => {
        handleValueChange?.(value);
        onClick?.(e);
      }}
      {...other}
    >
      {Icon ? (
        <Icon
          className={clsx(
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.sm.marginRight,
            isActive
              ? getColorVariantsFromColorThemeValue(getColor(color).text).textColor
              : getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
          )}
          aria-hidden="true"
        />
      ) : null}
      <p className={textElem}>{text}</p>
    </button>
  );
});

export default Tab;
