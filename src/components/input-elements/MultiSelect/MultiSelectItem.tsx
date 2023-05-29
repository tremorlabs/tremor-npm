"use client";
import React, { useContext } from "react";
import { tremorTwMerge } from "lib";
import { SelectedValueContext } from "contexts";

import { isValueInArray, makeClassName, spacing } from "lib";

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
        "flex justify-start items-center hover:bg-tremor-background-muted ui-active:bg-tremor-background-muted ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted",
        "text-tremor-content-emphasis cursor-default text-tremor-default",
        spacing.md.paddingX,
        spacing.md.paddingY,
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
          "flex-none focus:ring-none focus:outline-none cursor-pointer accent-tremor-brand",
          spacing.sm.marginRight,
        )}
        checked={isSelected}
        readOnly={true}
      />
      <span className="whitespace-nowrap truncate ">{children ?? value}</span>
    </Listbox.Option>
  );
});

MultiSelectItem.displayName = "MultiSelectItem";

export default MultiSelectItem;
