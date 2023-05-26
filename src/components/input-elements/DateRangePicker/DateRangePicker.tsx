"use client";
import React, { ReactElement, useMemo } from "react";
import { sizing, tremorTwMerge } from "lib";
import { DateRange, DayPicker } from "react-day-picker";

import { startOfMonth, startOfToday } from "date-fns";
import { enUS } from "date-fns/locale";

import { useInternalState } from "hooks";

import { border, boxShadow, spacing } from "lib";
import { Color } from "../../../lib/inputTypes";
import {
  defaultOptions,
  formatSelectedDates,
  makeDateRangePickerClassName,
  parseEndDate,
  parseStartDate,
} from "./dateRangePickerUtils";

import { SelectItem } from "components/input-elements/Select";
import { ArrowLeftHeadIcon, ArrowRightHeadIcon, XCircleIcon } from "assets";
import { Listbox, Popover } from "@headlessui/react";
import {
  constructValueToNameMapping,
  getNodeText,
  getSelectButtonColors,
  hasValue,
} from "../selectUtils";
import { DateRangePickerItemProps } from "components/input-elements/DateRangePicker/DateRangePickerItem";

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
  enableYearPagination?: boolean;
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
    enableYearPagination = false, // @achi
    locale = enUS,
    enableClear = true,
    children,
    className,
    ...other
  } = props;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

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
  const defaultMonth = startOfMonth(selectedEndDate ?? selectedStartDate ?? TODAY);

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
        "w-full min-w-[10rem] relative flex justify-between text-tremor-sm",
        className,
      )}
      {...other}
    >
      <Popover as="div" className="w-full">
        <div className="relative w-full">
          <Popover.Button
            disabled={disabled}
            className={tremorTwMerge(
              "w-full outline-none border-tremor-border cursor-default text-left whitespace-nowrap truncate",
              "rounded-l-tremor-default shadow-tremor-sm text-tremor-content-emphasis",
              "focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted transition duration-100",
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
          {isClearEnabled && (
            <button
              className={tremorTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                "outline-none focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted transition duration-100",
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
                  "flex-none text-tremor-content-subtle",
                  sizing.md.height,
                  sizing.md.width,
                )}
              />
            </button>
          )}
        </div>
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
                onValueChange?.({ from: v?.from, to: v?.to });
                setSelectedValue({ from: v?.from, to: v?.to });
              }) as any
            }
            locale={locale}
            disabled={disabledDays}
            className={tremorTwMerge("p-3 text-tremor-content-emphasis", className)}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-tremor-sm font-tremor-medium",
              nav: "space-x-1 flex items-center",
              nav_button:
                "flex items-center justify-center border border-tremor-border hover:bg-tremor-background-muted h-7 w-7 rounded-tremor-sm outline-none focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted transition duration-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "rounded-md w-9 font-tremor-normal text-tremor-xs text-center",
              row: "flex w-full mt-0.5",
              cell: "text-center text-tremor-sm p-0 relative focus-within:relative",
              day: "h-9 w-9 p-0 font-tremor-normal hover:bg-tremor-background-subtle outline-tremor-brand rounded-tremor-default",
              day_selected: "aria-selected:bg-tremor-brand aria-selected:text-tremor-brand",
              day_disabled: "text-tremor-content-subtle disabled:hover:bg-transparent",
              day_range_middle:
                "aria-selected:!bg-tremor-background-subtle aria-selected:text-tremor-brand !rounded-none",
              day_outside: "text-tremor-content-subtle",
              day_range_start:
                "rounded-r-none rounded-l-tremor-sm aria-selected:text-tremor-brand-inverted",
              day_range_end:
                "rounded-l-none rounded-r-tremor-sm aria-selected:text-tremor-brand-inverted",
            }}
            components={{
              IconLeft: ({ ...props }) => <ArrowLeftHeadIcon className="h-4 w-4" {...props} />,
              IconRight: ({ ...props }) => <ArrowRightHeadIcon className="h-4 w-4" {...props} />,
            }}
            {...props}
          />
        </Popover.Panel>
      </Popover>
      {enableSelect && (
        <Listbox
          as="div"
          className="w-48"
          value={selectedSelectValue}
          onChange={handleSelectClick}
          disabled={disabled}
        >
          {({ value }) => (
            <>
              <Listbox.Button
                className={tremorTwMerge(
                  "w-full outline-none border-tremor-border cursor-default text-left whitespace-nowrap truncate",
                  "rounded-r-tremor-default -ml-px shadow-tremor-sm text-tremor-content-emphasis",
                  "focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted transition duration-100",
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
                  "absolute z-10 divide-y overflow-y-auto w-full inset-x-0 right-0 outline-none shadow-tremor-md bg-tremor-background border-tremor-border divide-tremor-border rounded-tremor-default",
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
