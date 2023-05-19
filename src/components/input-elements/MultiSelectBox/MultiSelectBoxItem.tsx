"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { SelectedValueContext } from "contexts";

import {
  BaseColors,
  border,
  borderRadius,
  colorClassNames,
  fontSize,
  getColorClassNames,
  isValueInArray,
  makeClassName,
  spacing,
} from "lib";

import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { Listbox } from "@headlessui/react";

const makeMultiSelectBoxItemClassName = makeClassName("MultiSelectBoxItem");

export interface MultiSelectBoxItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  text?: string;
}

const MultiSelectBoxItem = React.forwardRef<HTMLLIElement, MultiSelectBoxItemProps>(
  (props, ref) => {
    const { value, text, className, ...other } = props;

    const { selectedValue } = useContext(SelectedValueContext);
    const isSelected = isValueInArray(value, selectedValue);

    return (
      <Listbox.Option
        className={twMerge(
          makeMultiSelectBoxItemClassName("root"),
          "flex justify-start items-center ui-active:bg-tremor-background-muted ui-active:text-tremor-content-strong",
          "text-tremor-content-emphasis cursor-default text-tremor-sm",
          spacing.md.paddingX,
          spacing.md.paddingY,
          className,
        )}
        ref={ref}
        key={value}
        value={value}
        {...other}
      >
        <input
          type="checkbox"
          className={twMerge(
            makeMultiSelectBoxItemClassName("checkbox"),
            "flex-none focus:ring-none focus:outline-none cursor-pointer accent-tremor-brand",
            spacing.lg.marginRight,
          )}
          checked={isSelected}
          readOnly={true}
        />
        <p className="whitespace-nowrap truncate ">{text ?? value}</p>
      </Listbox.Option>
    );
  },
);

export default MultiSelectBoxItem;
