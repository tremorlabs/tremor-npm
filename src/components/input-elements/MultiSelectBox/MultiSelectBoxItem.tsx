import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { SelectedValueContext } from "contexts";

import {
  BaseColors,
  border,
  borderRadius,
  colorClassNames,
  fontSize,
  getColorClassNames,
  isValueInArray,
  makeClassName,
  spacing,
} from "lib";

import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { Listbox } from "@headlessui/react";

const makeMultiSelectBoxItenClassName = makeClassName("MultiSelectBoxItem");

export interface MultiSelectBoxItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  text?: string;
}

const MultiSelectBoxItem = React.forwardRef<HTMLLIElement, MultiSelectBoxItemProps>(
  (props, ref) => {
    const { value, text, className, ...other } = props;

    const { selectedValue } = useContext(SelectedValueContext);
    const isSelected = isValueInArray(value, selectedValue);

    return (
      <Listbox.Option
        className={twMerge(
          makeMultiSelectBoxItenClassName("root"),
          "flex justify-start items-center ui-active:bg-gray-100 ui-active:text-gray-900",
          "text-gray-700 whitespace-nowrap truncate cursor-default",
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
        <input
          type="checkbox"
          className={twMerge(
            makeMultiSelectBoxItenClassName("checkbox"),
            "flex-none focus:ring-none focus:outline-none cursor-pointer",
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightRing).focusRingColor,
            colorClassNames[BaseColors.Blue][colorPalette.text].textColor,
            getColorClassNames(DEFAULT_COLOR, colorPalette.ring).borderColor,
            spacing.lg.marginRight,
            borderRadius.sm.all,
            border.sm.all,
          )}
          checked={isSelected}
          readOnly={true}
        />
        {text ?? value}
      </Listbox.Option>
    );
  },
);

export default MultiSelectBoxItem;
