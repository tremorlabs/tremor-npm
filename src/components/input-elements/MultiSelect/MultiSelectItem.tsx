"use client";
import { SelectedValueContext } from "contexts";
import React, { useContext } from "react";
import { isValueInArray, makeClassName, tremorTwMerge } from "lib";
import { ListboxOption } from "@headlessui/react";

const makeMultiSelectItemClassName = makeClassName("MultiSelectItem");

export interface MultiSelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const MultiSelectItem = React.forwardRef<HTMLDivElement, MultiSelectItemProps>((props, ref) => {
  const { value, className, children, ...other } = props;

  const { selectedValue } = useContext(SelectedValueContext);
  const isSelected = isValueInArray(value, selectedValue);

  return (
    <ListboxOption
      className={tremorTwMerge(
        makeMultiSelectItemClassName("root"),
        // common
        "flex justify-start items-center cursor-default text-tremor-default p-2.5",
        // light
        // "data-[focus]:bg-tremor-background-muted data-[focus]:text-tremor-content-strong data-[select]ed:text-tremor-content-strong data-[select]ed:bg-tremor-background-muted text-tremor-content-emphasis",
        "data-[focus]:bg-tremor-background-muted data-[focus]:text-tremor-content-strong data-[select]ed:text-tremor-content-strong text-tremor-content-emphasis",
        // dark
        "dark:data-[focus]:bg-dark-tremor-background-muted dark:data-[focus]:text-dark-tremor-content-strong dark:data-[select]ed:text-dark-tremor-content-strong dark:data-[select]ed:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis",
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
    </ListboxOption>
  );
});

MultiSelectItem.displayName = "MultiSelectItem";

export default MultiSelectItem;
