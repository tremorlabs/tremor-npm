"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";
import { makeClassName } from "lib";
import { Listbox } from "@headlessui/react";

const makeSelectItemClassName = makeClassName("SelectItem");

export interface SelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  icon?: React.ElementType;
}

const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>((props, ref) => {
  const { value, icon, className, children, ...other } = props;

  const Icon = icon;

  return (
    <Listbox.Option
      className={tremorTwMerge(
        makeSelectItemClassName("root"),
        "flex justify-start items-center hover:bg-tremor-background-muted ui-active:bg-tremor-background-muted ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong",
        "text-tremor-content-emphasis cursor-default text-tremor-default",
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
            makeSelectItemClassName("icon"),
            "flex-none text-tremor-content-subtle",
            sizing.lg.width,
            spacing.xs.marginRight,
          )}
        />
      )}
      <span className="whitespace-nowrap truncate">{children ?? value}</span>
    </Listbox.Option>
  );
});

SelectItem.displayName = "SelectItem";

export default SelectItem;
