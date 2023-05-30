"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";
import { getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

import { Combobox } from "@headlessui/react";

const makeSearchSelectItemClassName = makeClassName("SearchSelectItem");

export interface SearchSelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  icon?: React.ElementType;
}

const SearchSelectItem = React.forwardRef<HTMLLIElement, SearchSelectItemProps>((props, ref) => {
  const { value, icon, className, children, ...other } = props;
  const Icon = icon;

  return (
    <Combobox.Option
      className={tremorTwMerge(
        makeSearchSelectItemClassName("root"),
        // common
        "flex justify-start items-center cursor-default",
        // light
        "ui-active:bg-tremor-background-muted  ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis text-tremor-default",
        // dark
        "dark:ui-active:bg-dark-tremor-background-muted  dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis dark:text-dark-tremor-default",
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
            makeSearchSelectItemClassName("icon"),
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.lg.marginRight,
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
          )}
        />
      )}
      <span className="whitespace-nowrap truncate">{children ?? value}</span>
    </Combobox.Option>
  );
});

SearchSelectItem.displayName = "SearchSelectItem";

export default SearchSelectItem;
