"use client";
import React, { cloneElement, isValidElement } from "react";

import { makeClassName, tremorTwMerge } from "lib";

import { Combobox } from "@headlessui/react";

const makeSearchSelectItemClassName = makeClassName("SearchSelectItem");

export interface SearchSelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  icon?: React.ElementType | React.ReactElement;
}

const SearchSelectItem = React.forwardRef<HTMLLIElement, SearchSelectItemProps>((props, ref) => {
  const { value, icon, className, children, ...other } = props;

  let Icon;
  if (icon) {
    if (isValidElement(icon)) {
      Icon = cloneElement(icon as React.ReactElement, {
        className: tremorTwMerge(
          makeSearchSelectItemClassName("icon"),
          // common
          "flex-none h-5 w-5 mr-3",
          // light
          "text-tremor-content-subtle",
          // dark
          "dark:text-dark-tremor-content-subtle",
        ),
      });
    } else {
      const IconElm = icon as React.ElementType;
      Icon = (
        <IconElm
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
      );
    }
  }

  return (
    <Combobox.Option
      className={tremorTwMerge(
        makeSearchSelectItemClassName("root"),
        // common
        "flex justify-start items-center cursor-default text-tremor-default p-2.5",
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
      {Icon}
      <span className="whitespace-nowrap truncate">{children ?? value}</span>
    </Combobox.Option>
  );
});

SearchSelectItem.displayName = "SearchSelectItem";

export default SearchSelectItem;
