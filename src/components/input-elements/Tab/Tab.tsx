"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { BaseColorContext, SelectedValueContext } from "contexts";

import {
  border,
  fontSize,
  fontWeight,
  getColorClassNames,
  makeClassName,
  sizing,
  spacing,
} from "lib";

import { colorPalette, DEFAULT_COLOR } from "lib/theme";

const makeTabClassName = makeClassName("Tab");

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
    getColorClassNames(color, colorPalette.text).textColor,
    getColorClassNames(color, colorPalette.border).borderColor,
    border.md.bottom,
  );
  const inActiveClassNames = twMerge(
    getColorClassNames("transparent").borderColor,
    getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
    getColorClassNames(DEFAULT_COLOR, colorPalette.text).hoverTextColor,
    getColorClassNames(DEFAULT_COLOR, colorPalette.border).hoverBorderColor,
    "hover:border-b-2",
  );

  return (
    <button
      ref={ref}
      className={twMerge(
        makeTabClassName("root"),
        "flex whitespace-nowrap max-w-xs truncate",
        "focus:outline-none focus:ring-0",
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
            makeTabClassName("icon"),
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.sm.marginRight,
            isActive
              ? getColorClassNames(color, colorPalette.text).textColor
              : getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
          )}
          aria-hidden="true"
        />
      ) : null}
      <p className={twMerge(makeTabClassName("text"), "text-sm whitespace-nowrap")}>{text}</p>
    </button>
  );
});

Tab.displayName = "Tab";

export default Tab;
