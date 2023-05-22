"use client";
import React, { useMemo } from "react";
import { tremorTwMerge } from "lib";
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
  fontWeight,
  getColorClassNames,
  spacing,
} from "lib";
import { Color } from "../../../lib/inputTypes";
import {
  DateRangePickerOption,
  defaultOptions,
  formatSelectedDates,
  parseEndDate,
  parseStartDate,
} from "./dateRangePickerUtils";

import { DropdownItem } from "components/input-elements/Dropdown";
import { ArrowLeftHeadIcon, ArrowRightHeadIcon } from "assets";
import { Listbox, Popover } from "@headlessui/react";
import { getSelectButtonColors, hasValue } from "components/input-elements/selectUtils";

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
    enableYearPagination = false, // @achi
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
  };

  return (
    <div
      ref={ref}
      className={tremorTwMerge(
        "w-full min-w-[10rem] relative flex justify-between text-tremor-sm",
        className,
      )}
      {...other}
    >
      <Popover as="div" className="w-full">
        <Popover.Button
          disabled={disabled}
          className={tremorTwMerge(
            "w-full outline-none focus:ring-2 focus:ring-tremor-brand focus:ring-offset-1 cursor-default text-left whitespace-nowrap truncate transition duration-100",
            "rounded-l-tremor-default font-tremor-medium shadow-tremor-sm text-tremor-content-emphasis",
            spacing.twoXl.paddingLeft,
            spacing.twoXl.paddingRight,
            spacing.sm.paddingY,
            border.sm.all,
            getSelectButtonColors(hasValue<Date>(selectedStartDate || selectedEndDate), disabled),
          )}
        >
          {formattedSelection}
        </Popover.Button>
        <Popover.Panel
          className={tremorTwMerge(
            "absolute z-10 divide-y overflow-y-auto w-fit left-0 outline-none bg-tremor-background border-tremor-border divide-tremor-border rounded-tremor-default",
            spacing.twoXs.marginTop,
            spacing.twoXs.marginBottom,
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
            className={tremorTwMerge("p-3 text-tremor-content-emphasis", className)}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption:
                "flex text-tremor-content-emphasis justify-center pt-1 relative items-center",
              caption_label: "text-tremor-sm font-tremor-medium",
              nav: "space-x-1 flex items-center",
              nav_button:
                "flex items-center justify-center border border-tremor-border hover:bg-tremor-background-muted h-7 w-7 bg-transparent rounded-tremor-sm focus:ring-2 focus:ring-tremor-brand focus:ring-offset-1 transition duration-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "rounded-md w-9 font-tremor-normal text-tremor-xs text-center",
              row: "flex w-full mt-0.5",
              cell: "text-center text-tremor-sm p-0 relative focus-within:relative",
              day: "h-9 w-9 p-0 font-tremor-normal hover:bg-tremor-background-subtle outline-tremor-brand rounded-md", //@achi weird if rounded is changed to tremor rounded, then also the selection roundness is affected
              day_selected: "aria-selected:bg-blue-500 text-tremor-brand-inverted", // @achi everything else to bg-blue-500 does not work
              day_today: "text-tremor-brand",
              day_disabled: "text-tremor-content-subtle hover:bg-transparent",
              day_range_middle:
                "aria-selected:bg-tremor-background-subtle aria-selected:text-tremor-brand rounded-none",
              day_hidden: "invisible",
              day_outside: "text-tremor-content-subtle",
              day_range_start: "rounded-none rounded-l-tremor-sm",
              day_range_end: "rounded-none rounded-r-tremor-sm",
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
        <Listbox as="div" className="w-48" onChange={handleDropdownClick} disabled={disabled}>
          {({ value }) => (
            <>
              <Listbox.Button
                className={tremorTwMerge(
                  "w-full outline-none focus:ring-2 focus:ring-tremor-brand focus:ring-offset-1 cursor-default text-left whitespace-nowrap truncate",
                  "rounded-r-tremor-default -ml-px font-tremor-medium shadow-tremor-sm transition duration-100 text-tremor-content-emphasis",
                  spacing.twoXl.paddingLeft,
                  spacing.twoXl.paddingRight,
                  spacing.sm.paddingY,
                  border.sm.all,
                  getSelectButtonColors(hasValue<string>(value), disabled),
                )}
              >
                {value
                  ? dropdownValues.get(value)?.text ?? dropdownPlaceholder
                  : dropdownPlaceholder}
              </Listbox.Button>
              <Listbox.Options
                className={tremorTwMerge(
                  "absolute z-10 divide-y overflow-y-auto w-full inset-x-0 right-0 outline-none shadow-tremor-md bg-tremor-background border-tremor-border divide-tremor-border rounded-tremor-default",
                  spacing.twoXs.marginTop,
                  spacing.twoXs.marginBottom,
                  border.sm.all,
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
