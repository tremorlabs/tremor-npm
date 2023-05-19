"use client";
import React, { useContext } from "react";
import { tremorTwMerge } from "lib";

import { BaseColorContext, SelectedValueContext } from "contexts";

import { getColorClassNames, makeClassName, sizing, spacing } from "lib";

import { colorPalette } from "lib/theme";

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

  const activeClassNames = tremorTwMerge(
    "bg-tremor-background text-tremor-brand shadow-tremor-sm ring-tremor-ring",
    color && getColorClassNames(color, colorPalette.text).textColor,
  );
  const inActiveClassNames = tremorTwMerge(
    "bg-transparent ring-transparent text-tremor-sm text-tremor-content-subtle hover:text-tremor-content",
  );
  const Icon = icon;
  return (
    <button
      ref={ref}
      type="button"
      className={tremorTwMerge(
        makeToggleItemClassName("root"),
        "flex items-center ring-1 transition duration-100 text-tremor-sm rounded-tremor-sm",
        spacing.lg.paddingX,
        spacing.xs.paddingY,
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
          className={tremorTwMerge(
            makeToggleItemClassName("icon"),
            text ? spacing.xs.marginRight : "",
            sizing.lg.height,
            sizing.lg.width,
          )}
          aria-hidden="true"
        />
      ) : null}
      {text ? (
        <span
          className={tremorTwMerge(
            makeToggleItemClassName(text),
            "text-tremor-sm whitespace-nowrap",
          )}
        >
          {text}
        </span>
      ) : null}
    </button>
  );
});

export default ToggleItem;
