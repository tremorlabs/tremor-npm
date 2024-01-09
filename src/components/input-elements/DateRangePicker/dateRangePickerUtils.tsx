import {
  format,
  isEqual,
  max,
  min,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfYear,
  sub,
} from "date-fns";

import { makeClassName } from "lib";

export type DateRangePickerOption = {
  value: string;
  text: string;
  from: Date;
  to?: Date;
};
export type DropdownValues = Map<string, Omit<DateRangePickerOption, "value">>;

export const makeDateRangePickerClassName = makeClassName("DateRangePicker");

export const parseStartDate = (
  startDate: Date | undefined,
  minDate: Date | undefined,
  selectedDropdownValue: string | undefined,
  selectValues: DropdownValues,
) => {
  if (selectedDropdownValue) {
    startDate = selectValues.get(selectedDropdownValue)?.from;
  }
  if (!startDate) return undefined;
  if (startDate && !minDate) return startOfDay(startDate);
  return startOfDay(max([startDate as Date, minDate as Date]));
};

export const parseEndDate = (
  endDate: Date | undefined,
  maxDate: Date | undefined,
  selectedDropdownValue: string | undefined,
  selectValues: DropdownValues,
) => {
  if (selectedDropdownValue) {
    endDate = startOfDay(selectValues.get(selectedDropdownValue)?.to ?? startOfToday());
  }
  if (!endDate) return undefined;
  if (endDate && !maxDate) return startOfDay(endDate);

  return startOfDay(min([endDate as Date, maxDate as Date]));
};

export const defaultOptions: DateRangePickerOption[] = [
  {
    value: "tdy",
    text: "Today",
    from: startOfToday(),
  },
  {
    value: "w",
    text: "Last 7 days",
    from: sub(startOfToday(), { days: 7 }),
  },
  {
    value: "t",
    text: "Last 30 days",
    from: sub(startOfToday(), { days: 30 }),
  },
  {
    value: "m",
    text: "Month to Date",
    from: startOfMonth(startOfToday()),
  },
  {
    value: "y",
    text: "Year to Date",
    from: startOfYear(startOfToday()),
  },
];

export const formatSelectedDates = (
  startDate: Date | undefined,
  endDate: Date | undefined,
  locale?: Locale,
  displayFormat?: string,
) => {
  const localeCode = locale?.code || "en-US";
  if (!startDate && !endDate) {
    return "";
  } else if (startDate && !endDate) {
    if (displayFormat) return format(startDate, displayFormat);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return startDate.toLocaleDateString(localeCode, options);
  } else if (startDate && endDate) {
    if (isEqual(startDate, endDate)) {
      if (displayFormat) return format(startDate, displayFormat);
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
      if (displayFormat)
        return `${format(startDate, displayFormat)} - ${format(endDate, displayFormat)}`;

      const optionsStartDate: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
      };
      return `${startDate.toLocaleDateString(localeCode, optionsStartDate)} - 
                    ${endDate.getDate()}, ${endDate.getFullYear()}`;
    } else {
      if (displayFormat)
        return `${format(startDate, displayFormat)} - ${format(endDate, displayFormat)}`;
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
