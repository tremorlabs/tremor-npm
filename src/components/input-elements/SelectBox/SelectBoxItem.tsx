"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { HoveredValueContext, SelectedValueContext } from "contexts";

import { fontSize } from "lib/font";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";
import { getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeSelectBoxItemClassName = makeClassName("SelectBoxItem");

export interface SelectBoxItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  text?: string;
  icon?: React.ElementType;
}

const SelectBoxItem = React.forwardRef<HTMLButtonElement, SelectBoxItemProps>((props, ref) => {
  const { value, text, icon, className, onClick, ...other } = props;
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

  const Icon = icon;

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        handleValueChange?.(value);
        onClick?.(e);
      }}
      className={twMerge(
        makeSelectBoxItemClassName("root"),
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
            makeSelectBoxItemClassName("icon"),
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
        className={twMerge(
          makeSelectBoxItemClassName("text"),
          "text-sm whitespace-nowrap truncate",
        )}
      >
        {text ?? value}
      </p>
    </button>
  );
});

SelectBoxItem.displayName = "SelectBoxItem";

export default SelectBoxItem;
