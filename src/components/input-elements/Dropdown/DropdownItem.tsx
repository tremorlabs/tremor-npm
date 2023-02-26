"use client";

import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { fontSize } from "lib/font";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";

import { getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

export const makeDropdownItemClassName = makeClassName("DropdownItem");

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  text?: string;
  icon?: React.ElementType;
}

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>((props, ref) => {
  const { value, text, icon, className, ...other } = props;
  const { selectedValue, handleValueChange } = useContext(SelectedValueContext);
  const { hoveredValue } = useContext(HoveredValueContext);
  const isActive = selectedValue === value || hoveredValue === value;

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
        isActive
          ? twMerge(
              getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).bgColor,
              getColorClassNames(DEFAULT_COLOR, colorPalette.darkestText).textColor,
            )
          : twMerge(
              getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).hoverBgColor,
              getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
            ),
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

export default DropdownItem;
