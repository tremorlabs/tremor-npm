"use client";
import { ListboxOption } from "@headlessui/react";
import { tremorTwMerge } from "lib";
import React from "react";

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  icon?: React.ElementType;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const { value, icon, className, children, ...other } = props;

  const Icon = icon;

  return (
    <ListboxOption
      className={tremorTwMerge(
        "text-tremor-default data-focus:bg-tremor-background-muted data-focus:text-tremor-content-strong data-selected:text-tremor-content-strong data-selected:bg-tremor-background-muted text-tremor-content-emphasis flex cursor-default items-center justify-start px-2.5 py-2.5",
        className,
      )}
      ref={ref}
      key={value}
      value={value}
      {...other}
    >
      {Icon && (
        <Icon className={tremorTwMerge("text-tremor-content-subtle mr-1.5 h-5 w-5 flex-none")} />
      )}
      <span className="truncate whitespace-nowrap">{children ?? value}</span>
    </ListboxOption>
  );
});

SelectItem.displayName = "SelectItem";

export { SelectItem, type SelectItemProps };
