"use client";
import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { startOfMonth, startOfToday } from "date-fns";
import { enUS } from "date-fns/locale";

import { BaseColorContext, HoveredValueContext, SelectedValueContext } from "contexts";

import { useInternalState, useSelectOnKeyDown } from "hooks";

import { BaseColors } from "lib";
import { Color } from "../../../lib/inputTypes";
import {
  defaultOptions,
  getEndDateByDropdownValue,
  getStartDateByDropdownValue,
  makeDateRangePickerClassName,
  parseEndDate,
  parseStartDate,
} from "./dateRangePickerUtils";

import Calendar from "./Calendar";
import DateRangePickerButton from "./DateRangePickerButton";
import { DropdownItem } from "components/input-elements/Dropdown";
import { Modal } from "components/util-elements/Modal";

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
  enableClear?: boolean;
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
    enableClear = true,
    className,
    ...other
  } = props;

  const TODAY = startOfToday();
  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

  const [startOfCurrMonth, setStartOfCurrMonth] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownOptions = options ?? defaultOptions;
  const selectedDropdownValue = selectedValue ? selectedValue[2] ?? null : null;
  const selectedStartDate = selectedValue
    ? parseStartDate(selectedValue[0], minDate, selectedDropdownValue, dropdownOptions)
    : null;
  const selectedEndDate = selectedValue
    ? parseEndDate(selectedValue[1], maxDate, selectedDropdownValue, dropdownOptions)
    : null;

  const anchorDate = startOfCurrMonth ?? selectedEndDate ?? selectedStartDate ?? TODAY;

  const handleDateClick = (date: Date) => {
    if (!selectedStartDate) {
      onValueChange?.([date, selectedEndDate, null]);
      setSelectedValue([date, selectedEndDate, null]);
    } else if (selectedStartDate && !selectedEndDate) {
      if (date < selectedStartDate) {
        onValueChange?.([date, selectedEndDate, null]);
        setSelectedValue([date, selectedEndDate, null]);
        // Selection complete
      } else {
        onValueChange?.([selectedStartDate, date, null]);
        setSelectedValue([selectedStartDate, date, null]);
        setShowCalendar(false);
      }
    } else if (selectedStartDate && selectedEndDate) {
      onValueChange?.([date, null, null]);
      setSelectedValue([date, null, null]);
    }
  };

  const handleCalendarKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setShowCalendar(false);
    }
  };

  const handleDropdownOptionClick = (dropdownValue: string) => {
    const selectedStartDate = getStartDateByDropdownValue(dropdownValue, dropdownOptions);
    const selectedEndDate = getEndDateByDropdownValue(dropdownValue, dropdownOptions);

    setSelectedValue([selectedStartDate, selectedEndDate, dropdownValue]);
    onValueChange?.([selectedStartDate, selectedEndDate, dropdownValue]);
    setStartOfCurrMonth(startOfMonth(selectedEndDate));
    setShowDropdown(false);
  };

  const handleClear = () => {
    setSelectedValue([null, null, null]);
    onValueChange?.([null, null, null]);
  };
  const [hoveredDropdownValue, handleDropdownKeyDown] = useSelectOnKeyDown(
    handleDropdownOptionClick,
    dropdownOptions.map((option: DateRangePickerOption) => option.value),
    showDropdown,
    setShowDropdown,
    selectedDropdownValue as string,
  );

  return (
    <BaseColorContext.Provider value={color}>
      <div
        ref={ref}
        className={twMerge(makeDateRangePickerClassName("root"), "relative w-full", className)}
        {...other}
      >
        <DateRangePickerButton
          value={[selectedStartDate, selectedEndDate, selectedDropdownValue]}
          options={dropdownOptions}
          placeholder={placeholder}
          disabled={disabled}
          calendarRef={calendarRef}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          onCalendarKeyDown={handleCalendarKeyDown}
          enableDropdown={enableDropdown}
          dropdownRef={dropdownRef}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          onDropdownKeyDown={handleDropdownKeyDown}
          locale={locale}
          dropdownPlaceholder={dropdownPlaceholder}
          enableClear={enableClear}
          onClear={handleClear}
        />
        {/* Calendar Modal */}
        <Modal
          className={makeDateRangePickerClassName("calendarModal")}
          showModal={showCalendar}
          setShowModal={setShowCalendar}
          parentRef={calendarRef}
          width={288}
          maxHeight="max-h-fit"
        >
          <Calendar
            enableYearPagination={enableYearPagination}
            anchorDate={anchorDate}
            // setAnchorDate={setAnchorDate}
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            minDate={minDate}
            maxDate={maxDate}
            onDateClick={handleDateClick}
            locale={locale}
            setStartOfCurrMonth={setStartOfCurrMonth}
          />
        </Modal>
        {/* Dropdpown Modal */}
        <Modal
          className={makeDateRangePickerClassName("dropdownModal")}
          showModal={showDropdown}
          setShowModal={setShowDropdown}
          parentRef={dropdownRef}
        >
          <SelectedValueContext.Provider
            value={{
              selectedValue: selectedDropdownValue,
              handleValueChange: handleDropdownOptionClick,
            }}
          >
            <HoveredValueContext.Provider value={{ hoveredValue: hoveredDropdownValue }}>
              {dropdownOptions.map(({ value, text }: DateRangePickerOption) => (
                <DropdownItem key={value} value={value} text={text} />
              ))}
            </HoveredValueContext.Provider>
          </SelectedValueContext.Provider>
        </Modal>
      </div>
    </BaseColorContext.Provider>
  );
});

DateRangePicker.displayName = "DateRangePicker";

export default DateRangePicker;
