"use client";
import React from "react";
import { tremorTwMerge } from "lib";

import { fontSize } from "lib/font";
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
        "flex justify-start items-center ui-active:bg-tremor-background-muted ui-active:text-tremor-content-strong",
        "text-tremor-content-emphasis cursor-default",
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
