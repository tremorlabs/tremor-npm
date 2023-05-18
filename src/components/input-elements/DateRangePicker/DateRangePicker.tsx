"use client";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { DateRange, DayPicker } from "react-day-picker";

import { startOfMonth, startOfToday } from "date-fns";
import { enUS } from "date-fns/locale";

import { useInternalState } from "hooks";

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
  DateRangePickerOption,
  defaultOptions,
  formatSelectedDates,
  makeDateRangePickerClassName,
  parseEndDate,
  parseStartDate,
} from "./dateRangePickerUtils";

import { DropdownItem } from "components/input-elements/Dropdown";
import { ArrowLeftHeadIcon, ArrowRightHeadIcon } from "assets";
import { Listbox, Popover } from "@headlessui/react";
import { getSelectButtonColors } from "components/input-elements/selectUtils";

const TODAY = startOfToday();

export type Locale = typeof enUS;

export type DateRangePickerValue = [(Date | null)?, (Date | null)?, (string | null)?];

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

  const dropdownOptions = options ?? defaultOptions;
  const disabledDays = useMemo(() => {
    const disabledDays = [];
    if (minDate) disabledDays.push({ before: minDate });
    if (maxDate) disabledDays.push({ after: maxDate });
    return disabledDays;
  }, [minDate, maxDate]);

  const dropdownValues = useMemo(() => {
    const dropdownValues = new Map<string, Omit<DateRangePickerOption, "value">>();
    dropdownOptions.map((option: DateRangePickerOption) => {
      dropdownValues.set(option.value, {
        text: option.text,
        from: option.from,
        to: option.to,
      });
    });
    return dropdownValues;
  }, [dropdownOptions]);

  console.log(dropdownValues);

  const hasSelectedValue = selectedValue ? selectedValue.length >= 2 : false;
  const selectedDropdownValue = hasSelectedValue ? selectedValue![2] ?? null : null;
  const selectedStartDate = hasSelectedValue
    ? parseStartDate(selectedValue![0], minDate, selectedDropdownValue, dropdownValues)
    : undefined;
  const selectedEndDate = hasSelectedValue
    ? parseEndDate(selectedValue![1], maxDate, selectedDropdownValue, dropdownValues)
    : undefined;
  const formattedSelection = hasSelectedValue
    ? !selectedStartDate && !selectedEndDate
      ? placeholder
      : formatSelectedDates(selectedStartDate, selectedEndDate, locale)
    : placeholder;
  const defaultMonth = startOfMonth(selectedEndDate ?? selectedStartDate ?? TODAY);

  const handleDropdownClick = (value: string) => {
    const { from, to } = dropdownValues.get(value)!;
    const toDate = to ?? TODAY;
    onValueChange?.([from, toDate, value]);
    setSelectedValue([from, toDate, value]);
    console.log("set");
  };

  return (
    <div
      ref={ref}
      className={twMerge(
        "w-full min-w-[10rem] relative flex justify-between",
        fontSize.sm,
        className,
      )}
      {...other}
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
            defaultMonth={defaultMonth}
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
            locale={locale}
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
            components={{
              IconLeft: ({ ...props }) => <ArrowLeftHeadIcon className="h-4 w-4" {...props} />,
              IconRight: ({ ...props }) => <ArrowRightHeadIcon className="h-4 w-4" {...props} />,
            }}
            {...props}
          />
        </Popover.Panel>
      </Popover>
      {enableDropdown && (
        <Listbox as="div" className="w-48" onChange={handleDropdownClick}>
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
                {value
                  ? dropdownValues.get(value)?.text ?? dropdownPlaceholder
                  : dropdownPlaceholder}
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
                {dropdownOptions.map((option) => (
                  <DropdownItem key={option.value} value={option.value} text={option.text} />
                ))}
              </Listbox.Options>
            </>
          )}
        </Listbox>
      )}
    </div>
  );
});

export default DateRangePicker;
