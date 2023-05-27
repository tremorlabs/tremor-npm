import React, { Dispatch, Ref, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

import { ArrowDownHeadIcon, CalendarIcon, XCircleIcon } from "assets";

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
import { formatSelectedDates, makeDateRangePickerClassName } from "./dateRangePickerUtils";
import { getSelectButtonColors, hasValue } from "../selectUtils";

interface DateRangePickerButtonProps {
  value: DateRangePickerValue;
  options: DateRangePickerOption[];
  placeholder: string;
  disabled: boolean;
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
  enableClear?: boolean;
  onClear: () => void;
}

const DateRangePickerButton = ({
  value,
  options,
  placeholder,
  disabled,
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
  enableClear,
  onClear,
}: DateRangePickerButtonProps) => {
  const [startDate, endDate, dropdownValue] = value;

  const hasDateSelection = (startDate || endDate) !== null && (startDate || endDate) !== undefined;
  const hasDropdownSelection = hasValue(dropdownValue);

  const calendarText = hasDateSelection
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
          getSelectButtonColors(hasDateSelection, disabled),
          enableDropdown ? border.none.right : twMerge(borderRadius.md.right, border.sm.right),
          getColorClassNames(BaseColors.Blue, colorPalette.lightRing).focusRingColor,
          spacing.twoXl.paddingX,
          spacing.sm.paddingY,
          borderRadius.md.left,
          border.sm.all,
        )}
        disabled={disabled}
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
            "whitespace-nowrap truncate w-full text-start",
            fontSize.sm,
            fontWeight.md,
          )}
        >
          {calendarText}
        </p>
        {enableClear && hasDateSelection ? (
          <div
            role="button"
            className={twMerge(makeDateRangePickerClassName("resetButton"), spacing.xs.marginRight)}
            onClick={(e) => {
              e.stopPropagation(); // prevent firing parent button
              onClear();
            }}
          >
            <XCircleIcon
              className={twMerge(
                "flex-none",
                sizing.md.height,
                sizing.md.width,
                getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
              )}
              aria-hidden="true"
            />
          </div>
        ) : null}
      </button>
      {enableDropdown ? (
        <button
          type="button"
          ref={dropdownRef}
          onClick={() => setShowDropdown(!showDropdown)}
          className={twMerge(
            makeDateRangePickerClassName("dropdownButton"),
            "inline-flex justify-between w-48 truncate focus:outline-none focus:ring-2",
            getSelectButtonColors(hasDropdownSelection, disabled),
            getColorClassNames(BaseColors.Blue, colorPalette.lightRing).focusRingColor,
            spacing.twoXl.paddingX,
            spacing.sm.paddingY,
            spacing.px.negativeMarginLeft,
            borderRadius.md.right,
            border.sm.all,
          )}
          onKeyDown={onDropdownKeyDown}
          disabled={disabled}
        >
          <p
            className={twMerge(
              makeDateRangePickerClassName("dropdownButtonText"),
              "whitespace-nowrap truncate",
              fontSize.sm,
              fontWeight.md,
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
