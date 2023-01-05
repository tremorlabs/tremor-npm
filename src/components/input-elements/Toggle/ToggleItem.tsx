import React, { useContext } from "react";

import { BaseColorContext, SelectedValueContext } from "contexts";

import {
  borderRadius,
  boxShadow,
  classNames,
  defaultColors,
  fontSize,
  getColorTheme,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

export interface ToggleItemProps {
  value: any;
  text?: string;
  icon?: React.ElementType;
}

const ToggleItem = ({ value, text, icon }: ToggleItemProps) => {
  const { selectedValue, handleValueChange } = useContext(SelectedValueContext);
  const color = useContext(BaseColorContext);

  const isActive = selectedValue === value;

  const activeClassNames = classNames(
    getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
    getColorVariantsFromColorThemeValue(getColorTheme(color).text).textColor,
    getColorVariantsFromColorThemeValue(defaultColors.lightBorder).ringColor,
    boxShadow.sm
  );
  const inActiveClassNames = classNames(
    getColorVariantsFromColorThemeValue(defaultColors.transparent).bgColor,
    getColorVariantsFromColorThemeValue(defaultColors.darkText).hoverTextColor,
    getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
    getColorVariantsFromColorThemeValue(defaultColors.transparent).ringColor
  );
  const Icon = icon ? icon : null;
  return (
    <button
      type="button"
      className={classNames(
        "input-elem tr-flex tr-items-center tr-ring-1",
        spacing.lg.paddingLeft,
        spacing.lg.paddingRight,
        spacing.xs.paddingTop,
        spacing.xs.paddingBottom,
        fontSize.sm,
        borderRadius.md.all,
        isActive ? activeClassNames : inActiveClassNames
      )}
      onClick={() => {
        handleValueChange?.(value);
      }}
    >
      {Icon ? (
        <Icon
          className={classNames(
            "tr-opacity-70",
            text ? spacing.xs.marginRight : "",
            sizing.lg.height,
            sizing.lg.width
          )}
          aria-hidden="true"
        />
      ) : null}
      {text ? (
        <span className="tr-whitespace-nowrap tr-truncate">{text}</span>
      ) : null}
    </button>
  );
};

export default ToggleItem;
