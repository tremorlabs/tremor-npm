import {
    getDayBgColorClassName,
    getDayHoverBgColorClassName,
    getDayRoundedClassName,
    getDayTextClassNames
} from './datepickerUtils';
import { startOfMonth, startOfToday, startOfYear, sub } from 'date-fns';
import { Color } from '../../../lib/inputTypes';
import { Option } from './DateRangePicker';
import { classNames } from 'lib';

export const defaultOptions: Option<any>[] = [
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

