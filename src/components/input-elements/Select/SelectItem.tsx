"use client";
import React from "react";
import { ListboxOption } from "@headlessui/react";
import { makeClassName, tremorTwMerge } from "lib";

const makeSelectItemClassName = makeClassName("SelectItem");

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  icon?: React.ElementType;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const { value, icon, className, children, ...other } = props;

  const Icon = icon;

  return (
    <ListboxOption
      className={tremorTwMerge(
        makeSelectItemClassName("root"),
        // common
        "flex justify-start items-center cursor-default text-tremor-default px-2.5 py-2.5",
        // light
        "data-[focus]:bg-tremor-background-muted  data-[focus]:text-tremor-content-strong data-[selected]:text-tremor-content-strong data-[selected]:bg-tremor-background-muted text-tremor-content-emphasis",
        // dark
        "dark:data-[focus]:bg-dark-tremor-background-muted  dark:data-[focus]:text-dark-tremor-content-strong dark:data-[selected]:text-dark-tremor-content-strong dark:data-[selected]:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis",
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
    </ListboxOption>
  );
});

SelectItem.displayName = "SelectItem";

export default SelectItem;
