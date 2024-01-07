"use client";
import React from "react";
import { Listbox } from "@headlessui/react";
import { makeClassName, tremorTwMerge } from "lib";

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
        // common
        "flex justify-start items-center cursor-default text-tremor-default px-2.5 py-2.5",
        // light
        "ui-active:bg-tremor-background-muted  ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis",
        // dark
        "dark:ui-active:bg-dark-tremor-background-muted  dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis",
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
            // common
            "flex-none w-5 h-5 mr-1.5",
            // light
            "text-tremor-content-subtle",
            // dark
            "dark:text-dark-tremor-content-subtle",
          )}
        />
      )}
      <span className="whitespace-nowrap truncate">{children ?? value}</span>
    </Listbox.Option>
  );
});

SelectItem.displayName = "SelectItem";

export default SelectItem;
