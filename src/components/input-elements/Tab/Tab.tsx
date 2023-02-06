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
    <li>
      <button
        type="button"
        className={clsx(
          "input-elem flex whitespace-nowrap max-w-xs truncate",
          "focus:outline-0 focus:ring-0",
          spacing.twoXs.paddingRight,
          spacing.twoXs.paddingLeft,
          spacing.sm.paddingTop,
          spacing.sm.paddingBottom,
          spacing.px.negativeMarginBottom,
          fontSize.sm,
          fontWeight.md,
          isActive ? activeClassNames : inActiveClassNames,
        )}
        value={value}
        onClick={() => handleValueChange?.(value)}
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
        <p className="text-elem whitespace-nowrap truncate">{text}</p>
      </button>
    </li>
  );
};

export default Tab;
