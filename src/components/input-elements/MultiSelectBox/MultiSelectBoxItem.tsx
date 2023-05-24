"use client";
import React, { useContext } from "react";
import { tremorTwMerge } from "lib";
import { SelectedValueContext } from "contexts";

import { isValueInArray, makeClassName, spacing } from "lib";

import { Listbox } from "@headlessui/react";

const makeMultiSelectBoxItemClassName = makeClassName("MultiSelectBoxItem");

export interface MultiSelectBoxItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
}

const MultiSelectBoxItem = React.forwardRef<HTMLLIElement, MultiSelectBoxItemProps>(
  (props, ref) => {
    const { value, className, children, ...other } = props;

    const { selectedValue } = useContext(SelectedValueContext);
    const isSelected = isValueInArray(value, selectedValue);

    return (
      <Listbox.Option
        className={tremorTwMerge(
          makeMultiSelectBoxItemClassName("root"),
          "flex justify-start items-center ui-active:bg-tremor-background-muted ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong",
          "text-tremor-content-emphasis cursor-default text-tremor-sm",
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
            makeMultiSelectBoxItemClassName("checkbox"),
            "flex-none focus:ring-none focus:outline-none cursor-pointer accent-tremor-brand",
            spacing.sm.marginRight,
          )}
          checked={isSelected}
          readOnly={true}
        />
        <span className="whitespace-nowrap truncate ">{children ?? value}</span>
      </Listbox.Option>
    );
  },
);

MultiSelectBoxItem.displayName = "MultiSelectBoxItem";

export default MultiSelectBoxItem;
