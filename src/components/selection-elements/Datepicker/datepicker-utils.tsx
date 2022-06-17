import { add, format, isEqual, isToday, } from 'date-fns';
import React from 'react';

export const relativeFilterOptions = [
    {
        value: 'w',
        name: 'Last 7 days',
        shortcut: 'W',
    },
    {
        value: 't',
        name: 'Last 30 days',
        shortcut: 'T',
    },
    {
        value: 'm',
        name: 'Month to Date',
        shortcut: 'M',
    },
    {
        value: 'y',
        name: 'Year to Date',
        shortcut: 'Y',
    },
];

export const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
];

export const previousMonth = (
    firstDayCurrentMonth: Date,
    setCurrentMonth: React.Dispatch<React.SetStateAction<string>>) => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
};

export const nextMonth = (
    firstDayCurrentMonth: Date,
    setCurrentMonth: React.Dispatch<React.SetStateAction<string>>
) => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
};

export const displaySelected = (selectedStartDay: Date|null, selectedEndDay: Date|null) => {
    if (!selectedStartDay && !selectedEndDay) {
        return '';
    } else if (selectedStartDay && !selectedEndDay) {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return selectedStartDay.toLocaleDateString('en-US', options);
    } else if (selectedStartDay && selectedEndDay) {
        if ((selectedStartDay.getMonth() === selectedEndDay.getMonth())
            && (selectedStartDay.getFullYear() === selectedEndDay.getFullYear())) {
            const optionsStartDate: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
            return `${selectedStartDay.toLocaleDateString('en-US', optionsStartDate)} - 
                    ${selectedEndDay.getDate()}, ${selectedEndDay.getFullYear()}`;
        } else {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            return `${selectedStartDay.toLocaleDateString('en-US', options)} - 
                    ${selectedEndDay.toLocaleDateString('en-US', options)}`;
        }
    }
};

export const getDayBgColorClassName = (
    day: Date,
    selectedStartDay: Date|null,
    selectedEndDay: Date|null,
    hoveredDay: Date|null
): string => {
    if (selectedStartDay && isEqual(day, selectedStartDay)) {
        return 'bg-blue-500';
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && (day > selectedStartDay && day < hoveredDay)) {
        return 'bg-gray-100';
    }
    if (selectedEndDay && isEqual(day, selectedEndDay)) {
        return 'bg-blue-500';
    }
    if (selectedStartDay && selectedEndDay && (day > selectedStartDay && day < selectedEndDay)) {
        return 'bg-gray-100';
    }
    return 'bg-transparent';
    
};

export const getDayTextColorClassName = (
    day: Date,
    selectedStartDay: Date|null,
    selectedEndDay: Date|null,
    hoveredDay: Date|null,
): string => {
    if (isToday(day)) {
        if ((selectedStartDay && isEqual(day, selectedStartDay))
            || (selectedEndDay && isEqual(day, selectedEndDay))) {
            return 'text-white';
        }
        return 'text-blue-500 font-semibold';
    }
    if (selectedStartDay && isEqual(day, selectedStartDay)) {
        return 'text-white';
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && (day > selectedStartDay && day < hoveredDay)) {
        return 'text-gray-900';
    }
    if (selectedEndDay && isEqual(day, selectedEndDay)) {
        return 'text-white';
    }
    if (selectedStartDay && selectedEndDay && (day > selectedStartDay && day < selectedEndDay)) {
        return 'text-blue-500';
    }
    return 'text-gray-900';
};

export const getDayHoverBgColorClassName = (
    day: Date,
    selectedStartDay: Date|null,
    selectedEndDay: Date|null,
): string => {
    if (selectedStartDay && isEqual(day, selectedStartDay)) {
        return '';
    }
    if (selectedEndDay && isEqual(day, selectedEndDay)) {
        return '';
    }
    return 'hover:bg-gray-200';
};

export const getDayRoundedClassName = (
    day: Date,
    selectedStartDay: Date|null,
    selectedEndDay: Date|null,
    hoveredDay: Date|null
): string => {
    if (!selectedStartDay && !selectedEndDay) {
        return 'rounded-md';
    }
    if (selectedStartDay && selectedEndDay && isEqual(day, selectedStartDay)) {
        return 'rounded-l-md';
    }
    if (selectedStartDay && !selectedEndDay && !hoveredDay && isEqual(day, selectedStartDay)) {
        return 'rounded-md';
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && (day < selectedStartDay)) {
        return 'rounded-md';
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && (isEqual(day, selectedStartDay))
        && (hoveredDay > selectedStartDay)) {
        return 'rounded-l-md';
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && (day > selectedStartDay && day < hoveredDay)) {
        return 'rounded-none';
    }
    if (selectedStartDay && selectedEndDay && (day > selectedStartDay && day < selectedEndDay)) {
        return 'rounded-none';
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && isEqual(day, hoveredDay)
        && !isEqual(day, selectedStartDay)) {
        return 'rounded-r-md';
    }
    if (selectedStartDay && selectedEndDay && isEqual(day, selectedEndDay)) {
        return 'rounded-r-md';
    }
    if (selectedStartDay && selectedEndDay && (day < selectedStartDay || day > selectedEndDay)) {
        return 'rounded-md';
    }
    return 'rounded-md';
};
