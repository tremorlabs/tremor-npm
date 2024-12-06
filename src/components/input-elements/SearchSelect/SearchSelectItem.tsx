"use client";
import React from "react";

import { makeClassName, tremorTwMerge } from "lib";

import { ComboboxOption } from "@headlessui/react";

const makeSearchSelectItemClassName = makeClassName("SearchSelectItem");

export interface SearchSelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  icon?: React.ElementType;
}

const SearchSelectItem = React.forwardRef<HTMLDivElement, SearchSelectItemProps>((props, ref) => {
  const { value, icon, className, children, ...other } = props;
  const Icon = icon;

  return (
    <ComboboxOption
      className={tremorTwMerge(
        makeSearchSelectItemClassName("root"),
        // common
        "flex justify-start items-center cursor-default text-tremor-default p-2.5",
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
            makeSearchSelectItemClassName("icon"),
            // common
            "flex-none h-5 w-5 mr-3",
            // light
            "text-tremor-content-subtle",
            // dark
            "dark:text-dark-tremor-content-subtle",
          )}
        />
      )}
      <span className="whitespace-nowrap truncate">{children ?? value}</span>
    </ComboboxOption>
  );
});

SearchSelectItem.displayName = "SearchSelectItem";

export default SearchSelectItem;
