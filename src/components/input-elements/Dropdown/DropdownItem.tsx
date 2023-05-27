"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { fontSize } from "lib/font";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";

import { getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeDropdownItemClassName = makeClassName("DropdownItem");

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  text?: string;
  icon?: React.ElementType;
}

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>((props, ref) => {
  const { value, text, icon, className, ...other } = props;
  const { selectedValue, handleValueChange } = useContext(SelectedValueContext);
  const { hoveredValue } = useContext(HoveredValueContext);
  const isActive = selectedValue === value;
  const isHovered = hoveredValue === value;
  const bgColor = isActive
    ? getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).bgColor
    : isHovered
    ? getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).bgColor
    : getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).hoverBgColor;
  const textColor = isActive
    ? getColorClassNames(DEFAULT_COLOR, colorPalette.darkestText).textColor
    : getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor;

  const Icon = icon ? icon : null;
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => handleValueChange?.(value)}
      className={twMerge(
        makeDropdownItemClassName("root"),
        "flex items-center justify-start w-full truncate",
        spacing.twoXl.paddingX,
        spacing.md.paddingY,
        fontSize.sm,
        bgColor,
        textColor,
        className,
      )}
      {...other}
    >
      {Icon ? (
        <Icon
          className={twMerge(
            makeDropdownItemClassName("icon"),
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.lg.marginRight,
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
          )}
          aria-hidden="true"
        />
      ) : null}
      <p
        className={twMerge(makeDropdownItemClassName("text"), "text-sm whitespace-nowrap truncate")}
      >
        {text ?? value}
      </p>
    </button>
  );
});

DropdownItem.displayName = "DropdownItem";

export default DropdownItem;
