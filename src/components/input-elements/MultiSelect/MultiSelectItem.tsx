"use client";
import { ListboxOption } from "@headlessui/react";
import { SelectedValueContext } from "contexts";
import { isValueInArray, makeClassName, tremorTwMerge } from "lib";
import React, { useContext } from "react";

const makeMultiSelectItemClassName = makeClassName("MultiSelectItem");

interface MultiSelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
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
        "text-tremor-default data-focus:bg-tremor-background-muted data-focus:text-tremor-content-strong data-[select]ed:text-tremor-content-strong text-tremor-content-emphasis flex cursor-default items-center justify-start p-2.5",
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
          "focus:ring-none accent-tremor-brand-default mr-2.5 flex-none cursor-pointer focus:outline-none",
        )}
        checked={isSelected}
        readOnly={true}
      />
      <span className="truncate whitespace-nowrap">{children ?? value}</span>
    </ListboxOption>
  );
});

MultiSelectItem.displayName = "MultiSelectItem";

export { MultiSelectItem, type MultiSelectItemProps };
