"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { fontSize } from "lib/font";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";
import { getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

import { Combobox } from "@headlessui/react";

const makeSelectBoxItemClassName = makeClassName("SelectBoxItem");

export interface SelectBoxItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  text?: string;
  icon?: React.ElementType;
}

const SelectBoxItem = React.forwardRef<HTMLLIElement, SelectBoxItemProps>((props, ref) => {
  const { value, text, icon, className, ...other } = props;
  const Icon = icon;

  return (
    <Combobox.Option
      className={tremorTwMerge(
        makeSelectBoxItemClassName("root"),
        "flex justify-start items-center ui-active:bg-tremor-background-muted ui-active:text-tremor-content-strong",
        "text-tremor-content-emphasis cursor-default",
        spacing.md.paddingX,
        spacing.md.paddingY,
        fontSize.sm,
        className,
      )}
      ref={ref}
      key={value}
      value={value}
      {...other}
    >
      {Icon && (
        <Icon
          className={tremorTwMerge(
            makeSelectBoxItemClassName("icon"),
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.lg.marginRight,
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
          )}
        />
      )}
      <p className="whitespace-nowrap truncate">{text ?? value}</p>
    </Combobox.Option>
  );
});

SelectBoxItem.displayName = "SelectBoxItem";

export default SelectBoxItem;
