import {
    getDayBgColorClassName,
    getDayHoverBgColorClassName,
    getDayRoundedClassName,
    getDayTextClassNames
} from './datepickerUtils';
import { max, min, startOfDay, startOfMonth, startOfToday, startOfYear, sub } from 'date-fns';
import { Color } from '../../../lib/inputTypes';
import { DateRangePickerOption } from './DateRangePicker';
import { classNames } from 'lib';


export const getStartDate = <T, >(
    startDate: Date | null | undefined,
    minDate: Date | null | undefined,
    selectedOptionValue: T,
    dropdownOptions: DateRangePickerOption<T>[],
) => {
    if (selectedOptionValue && startDate === undefined) {
        startDate = dropdownOptions.find(option => option.value === selectedOptionValue)?.startDate;
    }
    if (!startDate) return null;
    if (startDate && !minDate) return startOfDay(startDate);
    return startOfDay(max([startDate as Date, minDate as Date]));
};

export const getEndDate = <T, >(
    endDate: Date | null | undefined,
    maxDate: Date | null | undefined,
    selectedOptionValue: T,
) => {
    if (selectedOptionValue && endDate === undefined) {
        endDate = startOfToday();
    }
    if (!endDate) return null;
    if (endDate && !maxDate) return startOfDay(endDate);

    return startOfDay(min([endDate as Date, maxDate as Date]));
};


export const defaultOptions: DateRangePickerOption<any>[] = [
    {
        value: 'tdy',
        text: 'Today',
        startDate: sub(startOfToday(), { days: 0 }),
    },
    {
        value: 'w',
        text: 'Last 7 days',
        startDate: sub(startOfToday(), { days: 7 }),
    },
    {
        value: 't',
        text: 'Last 30 days',
        startDate: sub(startOfToday(), { days: 30 }),
    },
    {
        value: 'm',
        text: 'Month to Date',
        startDate: startOfMonth(startOfToday()),
    },
    {
        value: 'y',
        text: 'Year to Date',
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
) => (
    classNames(
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
        getDayHoverBgColorClassName(
            date,
            finalStartDate,
            finalEndDate,
            isDateDisabled,
        ),
        getDayRoundedClassName(date, finalStartDate, finalEndDate, hoveredDate as Date | null),
    )
);

