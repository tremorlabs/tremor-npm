import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { BaseColorContext, SelectedValueContext } from "contexts";

import { borderRadius, boxShadow, colorClassNames, fontSize, sizing, spacing } from "lib";
import { textElem } from "lib/baseStyles";
import { DEFAULT_COLOR, TRANSPARENT, WHITE, colorPalette } from "lib/theme";

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

  const activeClassNames = twMerge(
    colorClassNames[WHITE]["none"].bgColor,
    colorClassNames[color][colorPalette.text].textColor,
    colorClassNames[DEFAULT_COLOR][colorPalette.lightBorder].ringColor,
    boxShadow.sm,
  );
  const inActiveClassNames = twMerge(
    colorClassNames[TRANSPARENT]["none"].bgColor,
    colorClassNames[DEFAULT_COLOR][colorPalette.darkText].hoverTextColor,
    colorClassNames[DEFAULT_COLOR][colorPalette.text].textColor,
    colorClassNames[TRANSPARENT]["none"].ringColor,
  );
  const Icon = icon;
  return (
    <button
      ref={ref}
      type="button"
      className={twMerge(
        "flex items-center ring-1",
        spacing.lg.paddingX,
        spacing.xs.paddingY,
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
          className={twMerge(
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
