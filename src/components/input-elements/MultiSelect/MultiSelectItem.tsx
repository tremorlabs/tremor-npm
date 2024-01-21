"use client";
import { SelectedValueContext } from "contexts";
import React, { useContext } from "react";
import { isValueInArray, makeClassName, tremorTwMerge } from "lib";
import { Listbox } from "@headlessui/react";

const makeMultiSelectItemClassName = makeClassName("MultiSelectItem");

export interface MultiSelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
}

const MultiSelectItem = React.forwardRef<HTMLLIElement, MultiSelectItemProps>((props, ref) => {
  const { value, className, children, ...other } = props;

  const { selectedValue } = useContext(SelectedValueContext);
  const isSelected = isValueInArray(value, selectedValue);

  return (
    <Listbox.Option
      className={tremorTwMerge(
        makeMultiSelectItemClassName("root"),
        // common
        "flex justify-start items-center cursor-default text-tremor-default p-2.5",
        // light
        // "ui-active:bg-tremor-background-muted ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis",
        "ui-active:bg-tremor-background-muted ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong text-tremor-content-emphasis",
        // dark
        "dark:ui-active:bg-dark-tremor-background-muted dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis",
        className,
      )}
      ref={ref}
      key={value}
      value={value}
      {...other}
    >
      <input
        type="checkbox"
        className={tremorTwMerge(
          makeMultiSelectItemClassName("checkbox"),
          // common
          "flex-none focus:ring-none focus:outline-none cursor-pointer mr-2.5",
          // light
          "accent-tremor-brand",
          // dark
          "dark:accent-dark-tremor-brand",
        )}
        checked={isSelected}
        readOnly={true}
      />
      <span className="whitespace-nowrap truncate">{children ?? value}</span>
    </Listbox.Option>
  );
});

MultiSelectItem.displayName = "MultiSelectItem";

export default MultiSelectItem;
