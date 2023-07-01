"use client";
import React, { ReactElement, useMemo, useState } from "react";
import { sizing, tremorTwMerge, border, spacing } from "lib";
import { DateRange, DayPickerRangeProps } from "react-day-picker";

import { startOfMonth, startOfToday } from "date-fns";
import { enUS } from "date-fns/locale";

import { useInternalState } from "hooks";
import { Color } from "../../../lib/inputTypes";
import {
  defaultOptions,
  formatSelectedDates,
  makeDateRangePickerClassName,
  parseEndDate,
  parseStartDate,
} from "./dateRangePickerUtils";

import { SelectItem } from "components/input-elements/Select";
import { XCircleIcon } from "assets";
import { Listbox, Popover } from "@headlessui/react";
import {
  constructValueToNameMapping,
  getNodeText,
  getSelectButtonColors,
  hasValue,
} from "../selectUtils";
import { DateRangePickerItemProps } from "components/input-elements/DateRangePicker/DateRangePickerItem";
import { Calendar } from "components/input-elements/Calendar";

const TODAY = startOfToday();

export type Locale = typeof enUS;

export type DateRangePickerValue = { from?: Date; to?: Date; selectValue?: string };

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue"> {
  value?: DateRangePickerValue;
  defaultValue?: DateRangePickerValue;
  onValueChange?: (value: DateRangePickerValue) => void;
  enableSelect?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  selectPlaceholder?: string;
  disabled?: boolean;
  color?: Color;
  locale?: Locale;
  enableClear?: boolean;
  children?: React.ReactElement[] | React.ReactElement;
}

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onValueChange,
    enableSelect = true,
    minDate,
    maxDate,
    placeholder = "Select",
    selectPlaceholder = "Select",
    disabled = false,
    locale = enUS,
    enableClear = true,
    children,
    className,
    ...other
  } = props;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const [isCalendarButtonFocused, setIsCalendarButtonFocused] = useState(false);
  const [isSelectButtonFocused, setIsSelectButtonFocused] = useState(false);

  const disabledDays = useMemo(() => {
    const disabledDays = [];
    if (minDate) disabledDays.push({ before: minDate });
    if (maxDate) disabledDays.push({ after: maxDate });
    return disabledDays;
  }, [minDate, maxDate]);

  const selectValues = useMemo(() => {
    const selectValues = new Map<
      string,
      Omit<DateRangePickerItemProps, "value"> & { text: string }
    >();

    if (children) {
      React.Children.forEach(
        children as ReactElement[],
        (child: React.ReactElement<DateRangePickerItemProps>) => {
          selectValues.set(child.props.value, {
            text: (getNodeText(child) ?? child.props.value) as string,
            from: child.props.from,
            to: child.props.to,
          });
        },
      );
    } else {
      defaultOptions.forEach((option) => {
        selectValues.set(option.value, {
          text: option.text,
          from: option.from,
          to: TODAY,
        });
      });
    }
    return selectValues;
  }, [children]);

  const valueToNameMapping = useMemo(() => {
    if (children) {
      return constructValueToNameMapping(children);
    }
    const valueToNameMapping = new Map<string, string>();
    defaultOptions.forEach((option) => valueToNameMapping.set(option.value, option.text));
    return valueToNameMapping;
  }, [children]);

  const selectedSelectValue = selectedValue?.selectValue;
  const selectedStartDate = parseStartDate(
    selectedValue?.from,
    minDate,
    selectedSelectValue,
    selectValues,
  );
  const selectedEndDate = parseEndDate(
    selectedValue?.to,
    maxDate,
    selectedSelectValue,
    selectValues,
  );
  const formattedSelection =
    !selectedStartDate && !selectedEndDate
      ? placeholder
      : formatSelectedDates(selectedStartDate, selectedEndDate, locale);
  const defaultMonth = startOfMonth(selectedEndDate ?? selectedStartDate ?? maxDate ?? TODAY);

  const isClearEnabled = enableClear && !disabled;

  const handleSelectClick = (value: string) => {
    const { from, to } = selectValues.get(value)!;
    const toDate = to ?? TODAY;
    onValueChange?.({ from, to: toDate, selectValue: value });
    setSelectedValue({ from, to: toDate, selectValue: value });
  };

  const handleReset = () => {
    onValueChange?.({});
    setSelectedValue({});
  };

  return (
    <div
      ref={ref}
      className={tremorTwMerge(
        // common
        "w-full min-w-[10rem] relative flex justify-between text-tremor-default",
        "max-w-sm",
        className,
      )}
      {...other}
    >
      <Popover
        as="div"
        className={tremorTwMerge(
          "w-full overflow-hidden",
          enableSelect ? "rounded-l-tremor-default" : "rounded-tremor-default",
          isCalendarButtonFocused &&
            "ring-2 ring-tremor-brand-muted dark:focus:ring-dark-tremor-brand-muted",
        )}
      >
        <div className="relative w-full overflow-hidden">
          <Popover.Button
            onFocus={() => setIsCalendarButtonFocused(true)}
            onBlur={() => setIsCalendarButtonFocused(false)}
            disabled={disabled}
            className={tremorTwMerge(
              // common
              "w-full outline-none text-left whitespace-nowrap truncate focus:ring-2 transition duration-100 rounded-l-tremor-default",
              // light
              "rounded-l-tremor-default border-tremor-border shadow-tremor-input text-tremor-content-emphasis focus:border-tremor-brand-subtle",
              // dark
              "dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:text-dark-tremor-content-emphasis dark:focus:border-dark-tremor-brand-subtle",
              enableSelect ? "rounded-l-tremor-default" : "rounded-tremor-default",
              spacing.twoXl.paddingLeft,
              isClearEnabled ? spacing.fourXl.paddingRight : spacing.twoXl.paddingRight,
              spacing.sm.paddingY,
              border.sm.all,
              getSelectButtonColors(hasValue<Date>(selectedStartDate || selectedEndDate), disabled),
            )}
          >
            {formattedSelection}
          </Popover.Button>
          {isClearEnabled && selectedStartDate ? (
            <button
              className={tremorTwMerge(
                "absolute outline-none inset-y-0 right-0 flex items-center transition duration-100",
                spacing.twoXl.marginRight,
              )}
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
              <XCircleIcon
                className={tremorTwMerge(
                  makeDateRangePickerClassName("clearIcon"),
                  // common
                  "flex-none",
                  // light
                  "text-tremor-content-subtle",
                  // dark
                  "dark:text-dark-tremor-content-subtle",
                  sizing.md.height,
                  sizing.md.width,
                )}
              />
            </button>
          ) : null}
        </div>
        <Popover.Panel
          className={tremorTwMerge(
            // common
            "absolute z-10 divide-y overflow-y-auto min-w-min left-0 outline-none rounded-tremor-default p-3",
            // light
            "bg-tremor-background border-tremor-border divide-tremor-border shadow-tremor-dropdown",
            // dark
            "dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border dark:shadow-dark-tremor-dropdown",
            spacing.twoXs.marginTop,
            spacing.twoXs.marginBottom,
            border.sm.all,
          )}
        >
          <Calendar<DayPickerRangeProps>
            mode="range"
            showOutsideDays={true}
            defaultMonth={defaultMonth}
            selected={{
              from: selectedStartDate,
              to: selectedEndDate,
            }}
            onSelect={
              ((v: DateRange) => {
                onValueChange?.({ from: v?.from, to: v?.to });
                setSelectedValue({ from: v?.from, to: v?.to });
              }) as any
            }
            locale={locale}
            disabled={disabledDays}
            classNames={{
              day_range_middle: tremorTwMerge(
                "!rounded-none aria-selected:!bg-tremor-background-subtle aria-selected:dark:!bg-dark-tremor-background-subtle aria-selected:!text-tremor-content aria-selected:dark:!bg-dark-tremor-background-subtle",
              ),
              day_range_start:
                "rounded-r-none rounded-l-tremor-small aria-selected:text-tremor-brand-inverted dark:aria-selected:text-dark-tremor-brand-inverted",
              day_range_end:
                "rounded-l-none rounded-r-tremor-small aria-selected:text-tremor-brand-inverted dark:aria-selected:text-dark-tremor-brand-inverted",
            }}
          />
        </Popover.Panel>
      </Popover>
      {enableSelect && (
        <Listbox
          as="div"
          className={tremorTwMerge(
            "w-48 overflow-hidden -ml-px rounded-r-tremor-default",
            isSelectButtonFocused &&
              "ring-2 ring-tremor-brand-muted dark:focus:ring-dark-tremor-brand-muted",
          )}
          value={selectedSelectValue}
          onChange={handleSelectClick}
          disabled={disabled}
        >
          {({ value }) => (
            <>
              <Listbox.Button
                onFocus={() => setIsSelectButtonFocused(true)}
                onBlur={() => setIsSelectButtonFocused(false)}
                className={tremorTwMerge(
                  // common
                  "w-full outline-none text-left whitespace-nowrap truncate rounded-r-tremor-default transition duration-100",
                  // light
                  "border-tremor-border shadow-tremor-input text-tremor-content-emphasis focus:border-tremor-brand-subtle",
                  // dark
                  "dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:text-dark-tremor-content-emphasis dark:focus:border-dark-tremor-brand-subtle",
                  spacing.twoXl.paddingLeft,
                  spacing.twoXl.paddingRight,
                  spacing.sm.paddingY,
                  border.sm.all,
                  getSelectButtonColors(hasValue<string>(value), disabled),
                )}
              >
                {value ? valueToNameMapping.get(value) ?? selectPlaceholder : selectPlaceholder}
              </Listbox.Button>
              <Listbox.Options
                className={tremorTwMerge(
                  // common
                  "absolute z-10 divide-y overflow-y-auto w-full inset-x-0 right-0 outline-none",
                  // light
                  "shadow-tremor-dropdown bg-tremor-background border-tremor-border divide-tremor-border rounded-tremor-default",
                  // dark
                  "dark:shadow-dark-tremor-dropdown dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border",
                  spacing.twoXs.marginTop,
                  spacing.twoXs.marginBottom,
                  border.sm.all,
                )}
              >
                {children ??
                  defaultOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.text}
                    </SelectItem>
                  ))}
              </Listbox.Options>
            </>
          )}
        </Listbox>
      )}
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";

export default DateRangePicker;
