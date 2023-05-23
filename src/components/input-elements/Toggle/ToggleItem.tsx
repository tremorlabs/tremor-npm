"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { BaseColorContext, SelectedValueContext } from "contexts";

import {
  borderRadius,
  boxShadow,
  fontSize,
  getColorClassNames,
  makeClassName,
  sizing,
  spacing,
} from "lib";

import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeToggleItemClassName = makeClassName("ToggleItem");

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
    getColorClassNames("white").bgColor,
    getColorClassNames(color, colorPalette.text).textColor,
    getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).ringColor,
    boxShadow.sm,
  );
  const inActiveClassNames = twMerge(
    getColorClassNames("transparent").bgColor,
    getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).hoverTextColor,
    getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
    getColorClassNames("transparent").ringColor,
  );
  const Icon = icon;
  return (
    <button
      ref={ref}
      type="button"
      className={twMerge(
        makeToggleItemClassName("root"),
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
            makeToggleItemClassName("icon"),
            "opacity-70",
            text ? spacing.xs.marginRight : "",
            sizing.lg.height,
            sizing.lg.width,
          )}
          aria-hidden="true"
        />
      ) : null}
      {text ? (
        <span className={twMerge(makeToggleItemClassName(text), "text-sm whitespace-nowrap")}>
          {text}
        </span>
      ) : null}
    </button>
  );
});

ToggleItem.displayName = "ToggleItem";

export default ToggleItem;
