"use client";
import { tremorTwMerge } from "lib";
import React, { useMemo } from "react";
import { DayPickerSingleProps } from "react-day-picker";

import { startOfMonth, startOfToday } from "date-fns";
import { enUS } from "date-fns/locale";

import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { CalendarIcon, XCircleIcon } from "assets";
import { Calendar } from "components/input-elements/Calendar";
import { useInternalState } from "hooks";
import { Color } from "../../../lib/inputTypes";
import { formatSelectedDates } from "../DateRangePicker/dateRangePickerUtils";
import { getSelectButtonColors, hasValue } from "../selectUtils";

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
  disabledDates?: Date[];
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
    disabledDates,
    ...other
  } = props;

  const [selectedValue, setSelectedValue] = useInternalState<Date | undefined>(defaultValue, value);

  const disabledDays = useMemo(() => {
    const disabledDays = [];
    if (minDate) disabledDays.push({ before: minDate });
    if (maxDate) disabledDays.push({ after: maxDate });
    return [...disabledDays, ...(disabledDates ?? [])];
  }, [minDate, maxDate, disabledDates]);

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
        "text-tremor-default relative w-full min-w-[10rem]",
        "focus:ring-tremor-brand-muted focus:ring-2",
        className,
      )}
      {...other}
    >
      <PopoverButton
        disabled={disabled}
        className={tremorTwMerge(
          "rounded-tremor-default shadow-tremor-input text-tremor-content-emphasis focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted flex w-full flex-nowrap truncate border border-red-500 py-2 pl-3 text-left whitespace-nowrap transition duration-100 outline-none focus:ring-2",

          isClearEnabled ? "pr-8" : "pr-4",
          getSelectButtonColors(hasValue<Date>(selectedValue), disabled),
        )}
      >
        <CalendarIcon
          className={tremorTwMerge("mr-2 -ml-0.5 h-5 w-5 shrink-0", "text-tremor-content-subtle")}
          aria-hidden="true"
        />
        <p className="truncate">{formattedSelection}</p>
      </PopoverButton>
      {isClearEnabled && selectedValue ? (
        <button
          type="button"
          className={tremorTwMerge(
            "absolute inset-y-0 right-0 mr-4 flex items-center transition duration-100 outline-none",
          )}
          onClick={(e) => {
            e.preventDefault();
            handleReset();
          }}
        >
          <XCircleIcon
            className={tremorTwMerge(
              // common
              "h-4 w-4 shrink-0",
              "text-tremor-content-subtle",
            )}
          />
        </button>
      ) : null}
      <Transition
        enter="transition ease duration-100 transform"
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease duration-100 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4"
      >
        <PopoverPanel
          anchor="bottom start"
          className={tremorTwMerge(
            "rounded-tremor-default bg-tremor-background-default border-tremor-border-default divide-tremor-border-default shadow-tremor-dropdown z-10 min-w-min divide-y overflow-y-auto border p-3 [--anchor-gap:4px] outline-none",
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
        </PopoverPanel>
      </Transition>
    </Popover>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;
