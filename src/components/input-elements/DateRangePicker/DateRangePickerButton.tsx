import React, { Dispatch, Ref, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { isEqual } from "date-fns";

import { ArrowDownHeadIcon, CalendarIcon } from "assets";

import {
  BaseColors,
  border,
  borderRadius,
  boxShadow,
  fontSize,
  fontWeight,
  getColorClassNames,
  sizing,
  spacing,
} from "lib";

import { DateRangePickerOption, DateRangePickerValue } from "./DateRangePicker";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { makeDateRangePickerClassName } from "./dateRangePickerUtils";

const formatSelectedDates = (startDate: Date | null, endDate: Date | null, locale?: Locale) => {
  const localeCode = locale?.code || "en-US";
  if (!startDate && !endDate) {
    return "";
  } else if (startDate && !endDate) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return startDate.toLocaleDateString(localeCode, options);
  } else if (startDate && endDate) {
    if (isEqual(startDate, endDate)) {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return startDate.toLocaleDateString(localeCode, options);
    } else if (
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()
    ) {
      const optionsStartDate: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
      };
      return `${startDate.toLocaleDateString(localeCode, optionsStartDate)} - 
                    ${endDate.getDate()}, ${endDate.getFullYear()}`;
    } else {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return `${startDate.toLocaleDateString(localeCode, options)} - 
                    ${endDate.toLocaleDateString(localeCode, options)}`;
    }
  }
  return "";
};

interface DateRangePickerButtonProps {
  value: DateRangePickerValue;
  options: DateRangePickerOption[];
  placeholder: string;
  calendarRef: Ref<HTMLButtonElement>;
  showCalendar: boolean;
  setShowCalendar: Dispatch<SetStateAction<boolean>>;
  onCalendarKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  enableDropdown: boolean;
  dropdownRef: Ref<HTMLButtonElement>;
  showDropdown: boolean;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
  onDropdownKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  locale?: Locale;
  dropdownPlaceholder?: string;
}

const DateRangePickerButton = ({
  value,
  options,
  placeholder,
  calendarRef,
  showCalendar,
  setShowCalendar,
  onCalendarKeyDown,
  enableDropdown,
  dropdownRef,
  showDropdown,
  setShowDropdown,
  onDropdownKeyDown,
  locale,
  dropdownPlaceholder = "Select",
}: DateRangePickerButtonProps) => {
  const [startDate, endDate, dropdownValue] = value;
  const hasSelection = (startDate || endDate) !== null;
  const calendarText = hasSelection
    ? formatSelectedDates(startDate as Date, endDate as Date, locale)
    : placeholder;
  const dropdownText = dropdownValue
    ? String(options.find((option) => option.value === dropdownValue)?.text)
    : dropdownPlaceholder;

  return (
    <div
      className={twMerge(
        makeDateRangePickerClassName("button"),
        "flex items-center justify-between",
        getColorClassNames("white").bgColor,
        getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
        borderRadius.md.all,
        boxShadow.sm,
      )}
    >
      <button
        type="button"
        ref={calendarRef}
        onClick={() => setShowCalendar(!showCalendar)}
        onKeyDown={onCalendarKeyDown}
        className={twMerge(
          makeDateRangePickerClassName("calendarButton"),
          "flex items-center w-full truncate focus:outline-none focus:ring-2",
          enableDropdown ? border.none.right : twMerge(borderRadius.md.right, border.sm.right),
          getColorClassNames(DEFAULT_COLOR, colorPalette.ring).borderColor,
          getColorClassNames(BaseColors.Blue, colorPalette.lightRing).focusRingColor,
          getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).hoverBgColor,
          spacing.twoXl.paddingX,
          spacing.sm.paddingY,
          borderRadius.md.left,
          border.sm.all,
        )}
      >
        <CalendarIcon
          className={twMerge(
            makeDateRangePickerClassName("calendarButtonIcon"),
            "flex-none",
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
            sizing.lg.height,
            sizing.lg.width,
            spacing.threeXs.negativeMarginLeft,
            spacing.lg.marginRight,
          )}
          aria-hidden="true"
        />
        <p
          className={twMerge(
            makeDateRangePickerClassName("calendarButtonText"),
            "whitespace-nowrap truncate",
            fontSize.sm,
            fontWeight.md,
            hasSelection
              ? getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor
              : getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
          )}
        >
          {calendarText}
        </p>
      </button>
      {enableDropdown ? (
        <button
          type="button"
          ref={dropdownRef}
          onClick={() => setShowDropdown(!showDropdown)}
          className={twMerge(
            makeDateRangePickerClassName("dropdownButton"),
            "inline-flex justify-between w-48 truncate focus:outline-none focus:ring-2",
            getColorClassNames(DEFAULT_COLOR, colorPalette.ring).borderColor,
            getColorClassNames(BaseColors.Blue, colorPalette.lightRing).focusRingColor,
            getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).hoverBgColor,
            spacing.twoXl.paddingX,
            spacing.sm.paddingY,
            spacing.px.negativeMarginLeft,
            borderRadius.md.right,
            border.sm.all,
          )}
          onKeyDown={onDropdownKeyDown}
        >
          <p
            className={twMerge(
              makeDateRangePickerClassName("dropdownButtonText"),
              "whitespace-nowrap truncate",
              fontSize.sm,
              fontWeight.md,
              dropdownValue
                ? getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor
                : getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
            )}
          >
            {dropdownText}
          </p>
          <ArrowDownHeadIcon
            className={twMerge(
              makeDateRangePickerClassName("dropdownButtonIcon"),
              "flex-none",
              sizing.lg.height,
              sizing.lg.width,
              spacing.twoXs.negativeMarginRight,
              getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
            )}
            aria-hidden="true"
          />
        </button>
      ) : null}
    </div>
  );
};

export default DateRangePickerButton;
