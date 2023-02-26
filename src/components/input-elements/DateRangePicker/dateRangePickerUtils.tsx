import { twMerge } from "tailwind-merge";
import {
  addDays,
  format,
  isEqual,
  isToday,
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
import { borderRadius, fontWeight, getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

export const makeDateRangePickerClassName = makeClassName("DateRangePicker");

export const getWeekdays = (locale: Locale) => {
  const firstDayOfWeek = startOfWeek(new Date());
  return Array.from(Array(7)).map((e, i) =>
    format(addDays(firstDayOfWeek, i), "EEEEEE", { locale }),
  );
};

export const capitalize = (s: string, locale: Locale) => {
  return s.charAt(0).toLocaleUpperCase(locale.code) + s.substring(1);
};

export const getStartDateByDropdownValue = (
  dropdownValue: string | null | undefined,
  dropdownOptions: DateRangePickerOption[],
) => {
  const startDate =
    dropdownOptions.find((option: DateRangePickerOption) => option.value === dropdownValue)
      ?.startDate ?? null;
  return startDate ? startOfDay(startDate) : null;
};

export const getEndDateByDropdownValue = (
  dropdownValue: string | null | undefined,
  dropdownOptions: DateRangePickerOption[],
) =>
  startOfDay(
    dropdownOptions.find((option: DateRangePickerOption) => option.value === dropdownValue)
      ?.endDate ?? startOfToday(),
  );

export const parseStartDate = (
  startDate: Date | null | undefined,
  minDate: Date | null | undefined,
  selectedDropdownValue: string | null | undefined,
  dropdownOptions: DateRangePickerOption[],
) => {
  if (selectedDropdownValue) {
    startDate = getStartDateByDropdownValue(selectedDropdownValue, dropdownOptions);
  }
  if (!startDate) return null;
  if (startDate && !minDate) return startOfDay(startDate);
  return startOfDay(max([startDate as Date, minDate as Date]));
};

export const parseEndDate = (
  endDate: Date | null | undefined,
  maxDate: Date | null | undefined,
  selectedDropdownValue: string | null | undefined,
  dropdownOptions: DateRangePickerOption[],
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
  color: Color,
) =>
  twMerge(
    getDayBgColorClassName(
      date,
      finalStartDate,
      finalEndDate,
      hoveredDate as Date | null,
      color,
      isDateDisabled,
    ),
    getDayTextClassNames(
      date,
      finalStartDate,
      finalEndDate,
      hoveredDate as Date | null,
      color,
      isDateDisabled,
    ),
    getDayHoverBgColorClassName(date, finalStartDate, finalEndDate, isDateDisabled),
    getDayRoundedClassName(date, finalStartDate, finalEndDate, hoveredDate as Date | null),
  );

const getDayRoundedClassName = (
  day: Date,
  selectedStartDay: Date | null,
  selectedEndDay: Date | null,
  hoveredDay: Date | null,
): string => {
  if (!selectedStartDay && !selectedEndDay) {
    return borderRadius.md.all;
  }
  if (
    selectedStartDay &&
    selectedEndDay &&
    isEqual(day, selectedStartDay) &&
    isEqual(day, selectedEndDay)
  ) {
    return borderRadius.md.all;
  }
  if (selectedStartDay && selectedEndDay && isEqual(day, selectedStartDay)) {
    return borderRadius.md.left;
  }
  if (selectedStartDay && !selectedEndDay && !hoveredDay && isEqual(day, selectedStartDay)) {
    return borderRadius.md.all;
  }
  if (selectedStartDay && !selectedEndDay && hoveredDay && day < selectedStartDay) {
    return borderRadius.md.all;
  }
  if (
    selectedStartDay &&
    !selectedEndDay &&
    hoveredDay &&
    isEqual(day, selectedStartDay) &&
    hoveredDay > selectedStartDay
  ) {
    return borderRadius.md.left;
  }
  if (
    selectedStartDay &&
    !selectedEndDay &&
    hoveredDay &&
    day > selectedStartDay &&
    day < hoveredDay
  ) {
    return borderRadius.none.all;
  }
  if (selectedStartDay && selectedEndDay && day > selectedStartDay && day < selectedEndDay) {
    return borderRadius.none.all;
  }
  if (
    selectedStartDay &&
    !selectedEndDay &&
    hoveredDay &&
    isEqual(day, hoveredDay) &&
    !isEqual(day, selectedStartDay)
  ) {
    return borderRadius.md.right;
  }
  if (selectedStartDay && selectedEndDay && isEqual(day, selectedEndDay)) {
    return borderRadius.md.right;
  }
  if (selectedStartDay && selectedEndDay && (day < selectedStartDay || day > selectedEndDay)) {
    return borderRadius.md.all;
  }
  return borderRadius.md.all;
};

export const displaySelected = (selectedStartDay: Date | null, selectedEndDay: Date | null) => {
  if (!selectedStartDay && !selectedEndDay) {
    return "";
  } else if (selectedStartDay && !selectedEndDay) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return selectedStartDay.toLocaleDateString("en-US", options);
  } else if (selectedStartDay && selectedEndDay) {
    if (isEqual(selectedStartDay, selectedEndDay)) {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return selectedStartDay.toLocaleDateString("en-US", options);
    } else if (
      selectedStartDay.getMonth() === selectedEndDay.getMonth() &&
      selectedStartDay.getFullYear() === selectedEndDay.getFullYear()
    ) {
      const optionsStartDate: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
      };
      return `${selectedStartDay.toLocaleDateString("en-US", optionsStartDate)} - 
                    ${selectedEndDay.getDate()}, ${selectedEndDay.getFullYear()}`;
    } else {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return `${selectedStartDay.toLocaleDateString("en-US", options)} - 
                    ${selectedEndDay.toLocaleDateString("en-US", options)}`;
    }
  }
};

const getDayBgColorClassName = (
  day: Date,
  selectedStartDay: Date | null,
  selectedEndDay: Date | null,
  hoveredDay: Date | null,
  color: Color,
  isDayDisabled = false,
): string => {
  if (isDayDisabled) return getColorClassNames("transparent").bgColor;
  if (selectedStartDay && isEqual(day, selectedStartDay)) {
    return getColorClassNames(color, colorPalette.background).bgColor;
  }
  if (
    selectedStartDay &&
    !selectedEndDay &&
    hoveredDay &&
    day > selectedStartDay &&
    day < hoveredDay
  ) {
    return getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).bgColor;
  }
  if (selectedEndDay && isEqual(day, selectedEndDay)) {
    return getColorClassNames(color, colorPalette.background).bgColor;
  }
  if (selectedStartDay && selectedEndDay && day > selectedStartDay && day < selectedEndDay) {
    return getColorClassNames(DEFAULT_COLOR, colorPalette.lightBackground).bgColor;
  }
  return getColorClassNames("transparent").bgColor;
};

const getDayTextClassNames = (
  day: Date,
  selectedStartDay: Date | null,
  selectedEndDay: Date | null,
  hoveredDay: Date | null,
  color: Color,
  isDayDisabled = false,
): string => {
  if (isDayDisabled) return getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor;
  if (isToday(day)) {
    if (
      (selectedStartDay && isEqual(day, selectedStartDay)) ||
      (selectedEndDay && isEqual(day, selectedEndDay))
    ) {
      return getColorClassNames("white").textColor;
    }
    return twMerge(getColorClassNames(color, colorPalette.text).textColor, fontWeight.lg);
  }
  if (selectedStartDay && isEqual(day, selectedStartDay)) {
    return getColorClassNames("white").textColor;
  }
  if (
    selectedStartDay &&
    !selectedEndDay &&
    hoveredDay &&
    day > selectedStartDay &&
    day < hoveredDay
  ) {
    return getColorClassNames(DEFAULT_COLOR, colorPalette.darkestText).textColor;
  }
  if (selectedEndDay && isEqual(day, selectedEndDay)) {
    return getColorClassNames("white").textColor;
  }
  if (selectedStartDay && selectedEndDay && day > selectedStartDay && day < selectedEndDay) {
    return getColorClassNames(color, colorPalette.text).textColor;
  }
  return getColorClassNames(DEFAULT_COLOR, colorPalette.darkestText).textColor;
};

const getDayHoverBgColorClassName = (
  day: Date,
  selectedStartDay: Date | null,
  selectedEndDay: Date | null,
  isDayDisabled = false,
): string => {
  if (isDayDisabled) return "";
  if (selectedStartDay && isEqual(day, selectedStartDay)) {
    return "";
  }
  if (selectedEndDay && isEqual(day, selectedEndDay)) {
    return "";
  }
  return "hover:bg-gray-200";
};
