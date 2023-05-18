"use client";
import React, { useContext, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DateRange, DayPicker, SelectRangeContext } from "react-day-picker";

import { startOfMonth, startOfToday } from "date-fns";
import { enUS } from "date-fns/locale";

import { BaseColorContext, HoveredValueContext, SelectedValueContext } from "contexts";

import { useInternalState, useSelectOnKeyDown } from "hooks";

import {
  BaseColors,
  DEFAULT_COLOR,
  border,
  borderRadius,
  boxShadow,
  colorPalette,
  fontSize,
  fontWeight,
  getColorClassNames,
  spacing,
} from "lib";
import { Color } from "../../../lib/inputTypes";
import {
  defaultOptions,
  formatSelectedDates,
  getEndDateByDropdownValue,
  getStartDateByDropdownValue,
  makeDateRangePickerClassName,
  parseEndDate,
  parseStartDate,
} from "./dateRangePickerUtils";

import Calendar from "./Calendar";
import DateRangePickerButton from "./DateRangePickerButton";
import { DropdownItem } from "components/input-elements/Dropdown";
import Modal from "components/util-elements/Modal";
import { ArrowLeftHeadIcon, ArrowRightHeadIcon } from "assets";
import { Listbox, Menu, Popover } from "@headlessui/react";
import { Icon } from "components/icon-elements";
import { getSelectButtonColors } from "components/input-elements/selectUtils";

export type Locale = typeof enUS;

export type DateRangePickerValue = [(Date | null)?, (Date | null)?, (string | null)?];
export type DateRangePickerOption = {
  value: string;
  text: string;
  startDate: Date;
  endDate?: Date;
};

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue"> {
  value?: DateRangePickerValue;
  defaultValue?: DateRangePickerValue;
  onValueChange?: (value: DateRangePickerValue) => void;
  enableDropdown?: boolean;
  options?: DateRangePickerOption[];
  minDate?: Date | null;
  maxDate?: Date | null;
  placeholder?: string;
  dropdownPlaceholder?: string;
  enableYearPagination?: boolean;
  disabled?: boolean;
  color?: Color;
  locale?: Locale;
}

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onValueChange,
    enableDropdown = true,
    options,
    minDate = null,
    maxDate = null,
    placeholder = "Select",
    dropdownPlaceholder = "Select",
    disabled = false,
    color = BaseColors.Blue,
    enableYearPagination = false,
    locale = enUS,
    className,
    ...other
  } = props;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

  const hasSelectedValue = selectedValue ? selectedValue.length >= 2 : false;
  const dropdownOptions = options ?? defaultOptions;
  const selectedDropdownValue = hasSelectedValue ? selectedValue![2] ?? null : null;
  const selectedStartDate = hasSelectedValue
    ? parseStartDate(selectedValue![0], minDate, selectedDropdownValue, dropdownOptions)
    : undefined;
  const selectedEndDate = hasSelectedValue
    ? parseEndDate(selectedValue![1], maxDate, selectedDropdownValue, dropdownOptions)
    : undefined;

  const disabledDays = useMemo(() => {
    const disabledDays = [];
    if (minDate) disabledDays.push({ before: new Date(2023, 4, 5) });
    if (maxDate) disabledDays.push({ after: maxDate });
    return disabledDays;
  }, [minDate, maxDate]);

  const formattedSelection = hasSelectedValue
    ? formatSelectedDates(selectedStartDate, selectedEndDate, locale)
    : placeholder;

  return (
    <div
      ref={ref}
      className={twMerge(
        "w-full min-w-[10rem] relative flex justify-between",
        fontSize.sm,
        className,
      )}
    >
      <Popover as="div" className="w-full">
        <Popover.Button
          className={twMerge(
            "w-full outline-none focus:ring-2 cursor-default text-left whitespace-nowrap truncate",
            "rounded-l-md",
            spacing.twoXl.paddingLeft,
            spacing.twoXl.paddingRight,
            spacing.sm.paddingY,
            fontWeight.md,
            border.sm.all,
            boxShadow.sm,
            getSelectButtonColors(true, disabled),
            getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
          )}
        >
          {formattedSelection}
        </Popover.Button>
        <Popover.Panel
          className={twMerge(
            "absolute z-10 divide-y overflow-y-auto w-fit left-0 outline-none",
            getColorClassNames("white").bgColor,
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).borderColor,
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).divideColor,
            spacing.twoXs.marginTop,
            spacing.twoXs.marginBottom,
            borderRadius.md.all,
            border.sm.all,
            boxShadow.lg,
          )}
        >
          <DayPicker
            mode="range"
            showOutsideDays={true}
            selected={{
              from: selectedStartDate,
              to: selectedEndDate,
            }}
            onSelect={
              ((v: DateRange) => {
                onValueChange?.([v?.from, v?.to]);
                setSelectedValue([v?.from, v?.to]);
              }) as any
            }
            disabled={disabledDays}
            className={twMerge("p-3 text-gray-700", className)}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button:
                "flex items-center justify-center border border-gray-300 hover:bg-gray-50 h-7 w-7 bg-transparent rounded-md",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "rounded-md w-9 font-normal text-[0.8rem] text-center",
              row: "flex w-full mt-0.5",
              cell: "text-center text-sm p-0 relative focus-within:relative",
              day: "h-9 w-9 p-0 font-normal hover:bg-gray-100 outline-blue-100 rounded-md",
              day_selected: "aria-selected:bg-blue-500 text-white",
              day_today: "text-blue-500",
              day_disabled: "text-gray-300 hover:bg-transparent",
              day_range_middle:
                "aria-selected:bg-gray-100 aria-selected:text-blue-500 rounded-none",
              day_hidden: "invisible",
              day_outside: "text-gray-300",
              day_range_start: "rounded-none rounded-l-md",
              day_range_end: "rounded-none rounded-r-md",
            }}
            labels={{}}
            components={{
              IconLeft: ({ ...props }) => <ArrowLeftHeadIcon className="h-4 w-4" />,
              IconRight: ({ ...props }) => <ArrowRightHeadIcon className="h-4 w-4" />,
            }}
            {...props}
          />
        </Popover.Panel>
      </Popover>
      {enableDropdown && (
        <Listbox as="div" className="w-48">
          {({ value }) => (
            <>
              <Listbox.Button
                className={twMerge(
                  "w-full outline-none focus:ring-2 cursor-default text-left whitespace-nowrap truncate",
                  "rounded-r-md -ml-px",
                  spacing.twoXl.paddingLeft,
                  spacing.twoXl.paddingRight,
                  spacing.sm.paddingY,
                  fontWeight.md,
                  border.sm.all,
                  boxShadow.sm,
                  getSelectButtonColors(true, disabled),
                  getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
                )}
              >
                {dropdownPlaceholder}
              </Listbox.Button>
              <Listbox.Options
                className={twMerge(
                  "absolute z-10 divide-y overflow-y-auto w-full inset-x-0 right-0 outline-none",
                  getColorClassNames("white").bgColor,
                  getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).borderColor,
                  getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).divideColor,
                  spacing.twoXs.marginTop,
                  spacing.twoXs.marginBottom,
                  borderRadius.md.all,
                  border.sm.all,
                  boxShadow.lg,
                )}
              >
                <DropdownItem value="One" />
              </Listbox.Options>
            </>
          )}
        </Listbox>
      )}
    </div>
  );
});

export default DateRangePicker;
