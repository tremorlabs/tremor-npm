"use client";
import React from "react";

import { tremorTwMerge } from "lib";

import { ComboboxOption } from "@headlessui/react";

interface SearchSelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  icon?: React.ElementType;
}

const SearchSelectItem = React.forwardRef<HTMLDivElement, SearchSelectItemProps>((props, ref) => {
  const { value, icon, className, children, ...other } = props;
  const Icon = icon;

  return (
    <ComboboxOption
      className={tremorTwMerge(
        "text-tremor-default data-focus:bg-tremor-background-muted data-focus:text-tremor-content-strong data-selected:text-tremor-content-strong data-selected:bg-tremor-background-muted text-tremor-content-emphasis flex cursor-default items-center justify-start p-2.5",
        className,
      )}
      ref={ref}
      key={value}
      value={value}
      {...other}
    >
      {Icon && (
        <Icon className={tremorTwMerge("text-tremor-content-subtle mr-3 h-5 w-5 shrink-0")} />
      )}
      <span className="truncate whitespace-nowrap">{children ?? value}</span>
    </ComboboxOption>
  );
});

SearchSelectItem.displayName = "SearchSelectItem";

export { SearchSelectItem, type SearchSelectItemProps };
