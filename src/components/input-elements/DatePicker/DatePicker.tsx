"use client";
import React, { useMemo } from "react";
import { sizing, tremorTwMerge, border, spacing } from "lib";
import { DayPickerSingleProps } from "react-day-picker";

import { startOfMonth, startOfToday } from "date-fns";
import { enUS } from "date-fns/locale";

import { useInternalState } from "hooks";
import { Color } from "../../../lib/inputTypes";
import { formatSelectedDates } from "../DateRangePicker/dateRangePickerUtils";
import { CalendarIcon, XCircleIcon } from "assets";
import { Popover } from "@headlessui/react";
import { getSelectButtonColors, hasValue } from "../selectUtils";
import { Calendar } from "components/input-elements/Calendar";
import { makeDatePickerClassName } from "components/input-elements/DatePicker/datePickerUtils";

const TODAY = startOfToday();

export type Locale = typeof enUS;

export type DatePickerValue = Date | undefined;

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue"> {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (value: DatePickerValue) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  color?: Color;
  locale?: Locale;
  enableClear?: boolean;
  displayFormat?: string;
  enableYearNavigation?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactElement[] | React.ReactElement;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onValueChange,
    minDate,
    maxDate,
    placeholder = "Select date",
    disabled = false,
    locale = enUS,
    enableClear = true,
    displayFormat,
    className,
    enableYearNavigation = false,
    weekStartsOn = 0,
    ...other
  } = props;

  const [selectedValue, setSelectedValue] = useInternalState<Date | undefined>(defaultValue, value);

  const disabledDays = useMemo(() => {
    const disabledDays = [];
    if (minDate) disabledDays.push({ before: minDate });
    if (maxDate) disabledDays.push({ after: maxDate });
    return disabledDays;
  }, [minDate, maxDate]);

  const formattedSelection = !selectedValue
    ? placeholder
    : formatSelectedDates(selectedValue, undefined, locale, displayFormat);
  const defaultMonth = startOfMonth(selectedValue ?? maxDate ?? TODAY);

  const isClearEnabled = enableClear && !disabled;

  const handleReset = () => {
    onValueChange?.(undefined);
    setSelectedValue(undefined);
  };

  return (
    <Popover
      ref={ref}
      as="div"
      className={tremorTwMerge(
        "relative w-full min-w-[10rem] text-tremor-default",
        "focus:ring-2 focus:ring-tremor-brand-muted focus:dark:focus:ring-dark-tremor-brand-muted",
        className,
      )}
      {...other}
    >
      <Popover.Button
        disabled={disabled}
        className={tremorTwMerge(
          // common
          "w-full outline-none text-left whitespace-nowrap truncate focus:ring-2 transition duration-100 rounded-tremor-default flex flex-nowrap",
          // light
          "border-tremor-border shadow-tremor-input text-tremor-content-emphasis focus:border-tremor-brand-subtle",
          // dark
          "dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:text-dark-tremor-content-emphasis dark:focus:border-dark-tremor-brand-subtle",
          spacing.lg.paddingLeft,
          isClearEnabled ? spacing.fourXl.paddingRight : spacing.twoXl.paddingRight,
          spacing.sm.paddingY,
          border.sm.all,
          getSelectButtonColors(hasValue<Date>(selectedValue), disabled),
        )}
      >
        <CalendarIcon
          className={tremorTwMerge(
            makeDatePickerClassName("calendarIcon"),
            "flex-none shrink-0",
            // light
            "text-tremor-content-subtle",
            // light
            "dark:text-dark-tremor-content-subtle",
            sizing.lg.height,
            sizing.lg.width,
            spacing.threeXs.negativeMarginLeft,
            spacing.sm.marginRight,
          )}
          aria-hidden="true"
        />
        <p className="truncate">{formattedSelection}</p>
      </Popover.Button>
      {isClearEnabled && selectedValue ? (
        <button
          type="button"
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
        {({ close }) => (
          <Calendar<DayPickerSingleProps>
            showOutsideDays={true}
            mode="single"
            defaultMonth={defaultMonth}
            selected={selectedValue}
            weekStartsOn={weekStartsOn}
            onSelect={
              ((v: Date) => {
                onValueChange?.(v);
                setSelectedValue(v);
                close();
              }) as any
            }
            locale={locale}
            disabled={disabledDays}
            enableYearNavigation={enableYearNavigation}
          />
        )}
      </Popover.Panel>
    </Popover>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;
