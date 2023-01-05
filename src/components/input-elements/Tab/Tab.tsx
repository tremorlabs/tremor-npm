import React, { useContext } from "react";

import { BaseColorContext, SelectedValueContext } from "contexts";

import {
  border,
  classNames,
  defaultColors,
  fontSize,
  fontWeight,
  getColorTheme,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

export interface TabProps {
  value: any;
  text: string;
  icon?: React.ElementType;
}

const Tab = ({ value, text, icon }: TabProps) => {
  const { selectedValue, handleValueChange } = useContext(SelectedValueContext);
  const color = useContext(BaseColorContext);

  const isActive = selectedValue === value;
  const Icon = icon;

  const activeClassNames = classNames(
    getColorVariantsFromColorThemeValue(getColorTheme(color).text).textColor,
    getColorVariantsFromColorThemeValue(getColorTheme(color).darkBorder)
      .borderColor,
    border.md.bottom
  );
  const inActiveClassNames = classNames(
    getColorVariantsFromColorThemeValue(defaultColors.transparent).borderColor,
    getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
    getColorVariantsFromColorThemeValue(defaultColors.text).hoverTextColor,
    getColorVariantsFromColorThemeValue(defaultColors.border).hoverBorderColor,
    "hover:tr-border-b-2"
  );

  return (
    <li>
      <button
        type="button"
        className={classNames(
          "input-elem tr-flex tr-whitespace-nowrap tr-max-w-xs tr-truncate",
          "focus:tr-outline-0 focus:tr-ring-0",
          spacing.twoXs.paddingRight,
          spacing.twoXs.paddingLeft,
          spacing.sm.paddingTop,
          spacing.sm.paddingBottom,
          spacing.px.negativeMarginBottom,
          fontSize.sm,
          fontWeight.md,
          isActive ? activeClassNames : inActiveClassNames
        )}
        value={value}
        onClick={() => handleValueChange?.(value)}
      >
        {Icon ? (
          <Icon
            className={classNames(
              "tr-flex-none",
              sizing.lg.height,
              sizing.lg.width,
              spacing.sm.marginRight,
              isActive
                ? getColorVariantsFromColorThemeValue(getColorTheme(color).text)
                    .textColor
                : getColorVariantsFromColorThemeValue(defaultColors.lightText)
                    .textColor
            )}
            aria-hidden="true"
          />
        ) : null}
        <p className="text-elem tr-whitespace-nowrap tr-truncate">{text}</p>
      </button>
    </li>
  );
};

export default Tab;
