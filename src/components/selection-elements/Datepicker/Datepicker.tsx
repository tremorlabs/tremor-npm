import React, { useEffect, useRef, useState } from 'react';

import { CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import {
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    parse,
    startOfMonth,
    startOfToday,
    startOfYear,
    sub,
} from 'date-fns';

import {
    colStartClasses,
    displaySelected,
    getDayBgColorClassName,
    getDayHoverBgColorClassName,
    getDayRoundedClassName,
    getDayTextColorClassName,
    nextMonth,
    previousMonth,
    relativeFilterOptions
} from 'components/selection-elements/Datepicker/datepicker-utils';
import { classNames } from '@utils/classname-utils';
import { useOnClickOutside } from '@utils/utils';

export interface DatepickerProps {
    handleSelect?: { (selectedStartDay: Date|null, selectedEndDay: Date|null): void },
}

const Datepicker = ({
    handleSelect = (selectedStartDay: Date|null, selectedEndDay: Date|null) => null,
}: DatepickerProps) => {
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(datePickerRef, () => setShowDatePickerModal(false));

    const [showDropdownModal, setShowDropdownModal] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(dropDownRef, () => setShowDropdownModal(false));

    const [selectedRelativeFilterOption, setSelectedRelativeFilterOption] = useState<string|null>(null);

    const today = startOfToday();
    const [hoveredDay, setHoveredDay] = useState<Date|null>(null);
    const [selectedStartDay, setSelectedStartDay] = useState<Date|null>(null);
    const [selectedEndDay, setSelectedEndDay] = useState<Date|null>(null);
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

    const days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    const handleDayClick = (day: Date) => {
        if (!selectedStartDay) {
            setSelectedStartDay(day);
        } else if (selectedStartDay && !selectedEndDay) {
            if (day < selectedStartDay) {
                setSelectedStartDay(day);
            } else if (day > selectedStartDay) {
                setSelectedEndDay(day);
                setShowDatePickerModal(false);
            }
        } else if (selectedStartDay && selectedEndDay) {
            setSelectedStartDay(day);
            setSelectedEndDay(null);
        }
    };

    const handleRelativeFilterOptionClick = (selectedRelativeFilterOption: string) => {
        switch(selectedRelativeFilterOption) {
        case 'w':
            setSelectedStartDay(sub(today, { days: 7 }));
            setSelectedEndDay(today);
            break;
        case 't':
            setSelectedStartDay(sub(today, { days: 30 }));
            setSelectedEndDay(today);
            break;
        case 'm':
            setSelectedStartDay(startOfMonth(today));
            setSelectedEndDay(today);
            break;
        case 'y':
            setSelectedStartDay(startOfYear(today));
            setSelectedEndDay(today);
            break;
        }
    };

    useEffect(() => {
        if (selectedEndDay) handleSelect(selectedStartDay, selectedEndDay);
    }, [selectedEndDay]);

    return (
        <>
            <div className="relative inline-flex">
                <div className="flex items-center justify-between rounded-md shadow-sm text-sm font-medium text-gray-700
                    bg-white">
                    <button
                        onClick={ () => setShowDatePickerModal(true) }
                        className="flex whitespace-nowrap items-center pl-2 pr-2 py-2 rounded-l-md border
                          border-gray-300 border-r-0 hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-opacity-100
                            focus:outline-none focus:ring-blue-300"
                    >
                        <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        { selectedStartDay ? ( 
                            <span className="ml-2 mr-0.5">{ displaySelected(selectedStartDay, selectedEndDay) }</span>
                            ) : null
                        }
                    </button>
                    <button
                        onClick={ () => setShowDropdownModal(true) }
                        className="inline-flex justify-center w-full rounded-r-md border border-gray-300 px-4 py-2
                          hover:bg-gray-50 focus:ring-2 focus:ring-opacity-100 focus:outline-none focus:ring-blue-300"
                    >
                        { selectedRelativeFilterOption
                            ? relativeFilterOptions.find((filterOption) => (
                                filterOption.value === selectedRelativeFilterOption
                            ))?.name : 'Select' }
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                </div>
                { showDatePickerModal ? (
                    <div
                        ref={ datePickerRef }
                        className="absolute w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-3
                            px-3 -bottom-2 left-0 translate-y-full mx-auto"
                    >
                        {/* Bug border here */}
                        <div className="flex justify-between items-center py-2 px-1">
                            <button
                                type="button"
                                onClick={() => previousMonth(firstDayCurrentMonth, setCurrentMonth)}
                                className="inline-flex p-1 text-sm font-medium text-gray-700 bg-white border
                                    border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                                    focus:ring-offset-0 focus:ring-blue-500"
                            >
                                <span className="sr-only">Previous month</span>
                                <ChevronLeftIcon className="w-5 h-5 text-gray-600" aria-hidden="true" />
                            </button>

                            <h2 className="font-semibold text-sm text-gray-900">
                                {format(firstDayCurrentMonth, 'MMMM yyyy')}
                            </h2>

                            <button
                                onClick={() => nextMonth(firstDayCurrentMonth, setCurrentMonth)}
                                type="button"
                                className="inline-flex p-1 text-sm font-medium text-gray-700 bg-white border
                                    border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                                    focus:ring-offset-0 focus:ring-blue-500"
                            >
                                <span className="sr-only">Next month</span>
                                <ChevronRightIcon className="w-5 h-5 text-gray-600" aria-hidden="true" />
                            </button>

                        </div>
                        <div className="grid grid-cols-7 text-xs leading-6 text-center justify-end font-medium text-gray-400">
                            <div className="w-full flex justify-center">
                                <div className="flex items-center justify-center w-full h-10">Su</div>
                            </div>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center justify-center w-full h-10">Mo</div>
                            </div>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center justify-center w-full h-10">Tu</div>
                            </div>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center justify-center w-full h-10">We</div>
                            </div>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center justify-center w-full h-10">Th</div>
                            </div>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center justify-center w-full h-10">Fr</div>
                            </div>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center justify-center w-full h-10">Sa</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 text-sm">
                            {days.map((day) => (
                                <div
                                    key={day.toString()}
                                    className={classNames(
                                        colStartClasses[getDay(day)],
                                        'w-full'
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleDayClick(day)}
                                        onMouseEnter={ () => setHoveredDay(day) }
                                        onMouseLeave={ () => setHoveredDay(null) }
                                        className={classNames(
                                            getDayBgColorClassName(day, selectedStartDay, selectedEndDay, hoveredDay),
                                            getDayTextColorClassName(day, selectedStartDay, selectedEndDay, hoveredDay),
                                            getDayHoverBgColorClassName(day, selectedStartDay, selectedEndDay),
                                            getDayRoundedClassName(day, selectedStartDay, selectedEndDay, hoveredDay),
                                            'h-10 w-full flex items-center justify-center'
                                        )}
                                    >
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                            {format(day, 'd')}
                                        </time>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null }
                { showDropdownModal ? (
                    <div
                        ref={ dropDownRef }
                        className="absolute min-w-full text-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                            divide-y divide-gray-100 py-1 focus:outline-none right-0 -bottom-2 translate-y-full"
                    >
                        { relativeFilterOptions.map((filterOption) => (
                            <button
                                className={ classNames(
                                    selectedRelativeFilterOption === filterOption.value
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                    `group flex items-center justify-between space-x-10 px-4 py-2.5 text-sm w-full
                                    group-hover:text-gray-500 hover:bg-gray-50`
                                ) }
                                value={ filterOption.value }
                                onClick={ () => {
                                    setSelectedRelativeFilterOption(filterOption.value);
                                    handleRelativeFilterOptionClick(filterOption.value);
                                    setShowDropdownModal(false);
                                } }
                            >
                                <div className="flex font-medium whitespace-nowrap">
                                    { filterOption.name }
                                </div>
                                <span className="font-normal text-gray-400 whitespace-nowrap">{ filterOption.shortcut }</span>
                            </button>
                        ))}                    
                    </div>
                ) : null }
            </div>
        </>
    );
};

export default Datepicker;
