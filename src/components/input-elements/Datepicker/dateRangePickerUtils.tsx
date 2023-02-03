import {
  getDayBgColorClassName,
  getDayHoverBgColorClassName,
  getDayRoundedClassName,
  getDayTextClassNames,
} from "./datepickerUtils";
import {
  addDays,
  format,
  max,
  min,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  sub,
} from "date-fns";
import { Color } from "../../../lib/inputTypes";
import { DateRangePickerOption } from "./DateRangePicker";
import { classNames } from "lib";

export const getWeekdays = (locale: Locale) => {
  const firstDayOfWeek = startOfWeek(new Date());
  return Array.from(Array(7)).map((e, i) =>
    format(addDays(firstDayOfWeek, i), "EEEEEE", { locale })
  );
};

export const capitalize = (s: string, locale: Locale) => {
  return s.charAt(0).toLocaleUpperCase(locale.code) + s.substring(1);
};

export const getStartDateByDropdownValue = (
  dropdownValue: string | null | undefined,
  dropdownOptions: DateRangePickerOption[]
) => {
  const startDate =
    dropdownOptions.find(
      (option: DateRangePickerOption) => option.value === dropdownValue
    )?.startDate ?? null;
  return startDate ? startOfDay(startDate) : null;
};

export const getEndDateByDropdownValue = (
  dropdownValue: string | null | undefined,
  dropdownOptions: DateRangePickerOption[]
) =>
  startOfDay(
    dropdownOptions.find(
      (option: DateRangePickerOption) => option.value === dropdownValue
    )?.endDate ?? startOfToday()
  );

export const parseStartDate = (
  startDate: Date | null | undefined,
  minDate: Date | null | undefined,
  selectedDropdownValue: string | null | undefined,
  dropdownOptions: DateRangePickerOption[]
) => {
  if (selectedDropdownValue) {
    startDate = getStartDateByDropdownValue(
      selectedDropdownValue,
      dropdownOptions
    );
  }
  if (!startDate) return null;
  if (startDate && !minDate) return startOfDay(startDate);
  return startOfDay(max([startDate as Date, minDate as Date]));
};

export const parseEndDate = (
  endDate: Date | null | undefined,
  maxDate: Date | null | undefined,
  selectedDropdownValue: string | null | undefined,
  dropdownOptions: DateRangePickerOption[]
) => {
  if (selectedDropdownValue) {
    endDate = getEndDateByDropdownValue(selectedDropdownValue, dropdownOptions);
  }
  if (!endDate) return null;
  if (endDate && !maxDate) return startOfDay(endDate);

  return startOfDay(min([endDate as Date, maxDate as Date]));
};

export const defaultOptions: DateRangePickerOption[] = [
  {
    value: "tdy",
    text: "Today",
    startDate: startOfToday(),
  },
  {
    value: "w",
    text: "Last 7 days",
    startDate: sub(startOfToday(), { days: 7 }),
  },
  {
    value: "t",
    text: "Last 30 days",
    startDate: sub(startOfToday(), { days: 30 }),
  },
  {
    value: "m",
    text: "Month to Date",
    startDate: startOfMonth(startOfToday()),
  },
  {
    value: "y",
    text: "Year to Date",
    startDate: startOfYear(startOfToday()),
  },
];

export const getDateStyles = (
  date: Date,
  finalStartDate: Date | null,
  finalEndDate: Date | null,
  hoveredDate: Date | undefined,
  isDateDisabled: boolean,
  color: Color
) =>
  classNames(
    getDayBgColorClassName(
      date,
      finalStartDate,
      finalEndDate,
      hoveredDate as Date | null,
      color,
      isDateDisabled
    ),
    getDayTextClassNames(
      date,
      finalStartDate,
      finalEndDate,
      hoveredDate as Date | null,
      color,
      isDateDisabled
    ),
    getDayHoverBgColorClassName(
      date,
      finalStartDate,
      finalEndDate,
      isDateDisabled
    ),
    getDayRoundedClassName(
      date,
      finalStartDate,
      finalEndDate,
      hoveredDate as Date | null
    )
  );
