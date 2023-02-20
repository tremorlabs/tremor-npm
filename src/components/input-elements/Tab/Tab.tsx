"use client";

import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { BaseColorContext, SelectedValueContext } from "contexts";

import { border, colorClassNames, fontSize, fontWeight, sizing, spacing } from "lib";

import { colorPalette, TRANSPARENT, DEFAULT_COLOR } from "lib/theme";

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

  const activeClassNames = twMerge(
    colorClassNames[color][colorPalette.text].textColor,
    colorClassNames[color][colorPalette.darkBorder].borderColor,
    border.md.bottom,
  );
  const inActiveClassNames = twMerge(
    colorClassNames[TRANSPARENT]["none"].borderColor,
    colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
    colorClassNames[DEFAULT_COLOR][colorPalette.text].hoverTextColor,
    colorClassNames[DEFAULT_COLOR][colorPalette.border].hoverBorderColor,
    "hover:border-b-2",
  );

  return (
    <button
      ref={ref}
      className={twMerge(
        "flex whitespace-nowrap max-w-xs truncate",
        "focus:outline-0 focus:ring-0",
        spacing.twoXs.paddingX,
        spacing.sm.paddingY,
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
          className={twMerge(
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.sm.marginRight,
            isActive
              ? colorClassNames[color][colorPalette.text].textColor
              : colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
          )}
          aria-hidden="true"
        />
      ) : null}
      <p className="text-sm whitespace-nowrap">{text}</p>
    </button>
  );
});

export default Tab;
