"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";
import { makeClassName } from "lib";
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
      className={tremorTwMerge(
        makeDropdownItemClassName("root"),
        "flex justify-start items-center ui-active:bg-tremor-background-muted ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong",
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
      {Icon && (
        <Icon
          className={tremorTwMerge(
            makeDropdownItemClassName("icon"),
            "flex-none text-tremor-content-subtle",
            sizing.lg.width,
            spacing.xs.marginRight,
          )}
        />
      )}
      <p className="whitespace-nowrap truncate"> {text ?? value}</p>
    </Listbox.Option>
  );
});

DropdownItem.displayName = "DropdownItem";

export default DropdownItem;
