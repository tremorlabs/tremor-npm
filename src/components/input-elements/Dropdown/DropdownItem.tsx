"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { fontSize } from "lib/font";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";

import { getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { Listbox } from "@headlessui/react";

const makeDropdownItemClassName = makeClassName("DropdownItem");

export interface DropdownItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  text?: string;
  icon?: React.ElementType;
}

const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>((props, ref) => {
  const { value, text, icon, className, ...other } = props;

  const Icon = icon;

  return (
    <Listbox.Option
      className={twMerge(
        makeDropdownItemClassName("root"),
        "flex justify-start items-center ui-active:bg-gray-100 ui-active:text-gray-900",
        "text-gray-700 cursor-default",
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
      )}
      <p className="whitespace-nowrap truncate"> {text ?? value}</p>
    </Listbox.Option>
  );
});

export default DropdownItem;
