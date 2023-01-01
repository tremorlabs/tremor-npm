import React, { useEffect, useRef, useState } from 'react';

import {
    max,
    min,
    startOfDay,
    startOfToday
} from 'date-fns';

import { BaseColorContext, HoveredValueContext, SelectedValueContext } from 'contexts';

import { useInternalState, useOnSelectElementKeyDown } from 'hooks';

import {
    BaseColors,
    classNames,
    parseMarginTop,
    parseMaxWidth,
} from 'lib';
import { Color, MarginTop, MaxWidth } from '../../../lib/inputTypes';
import {
    relativeFilterOptions as defaultOptions,
} from 'components/input-elements/Datepicker/utils';

import Calendar from './Calendar';
import DateRangePickerButton from './DateRangePickerButton';
import { DropdownItem } from 'components/input-elements/Dropdown';
import Modal from 'components/layout-elements/Modal';

const getStartDate = <T, >(
    startDate: Date | null | undefined,
    minDate: Date | null | undefined,
    selectedOption: T,
    selectOptions: Option<T>[],
) => {
    if (selectedOption && startDate === undefined) {
        startDate = selectOptions.find(option => option.value === selectedOption)?.startDate;
    }
    if (!startDate) return null;
    if (startDate && !minDate) return startOfDay(startDate);
    return startOfDay(max([startDate as Date, minDate as Date]));
};

const getEndDate = <T, >(
    endDate: Date | null | undefined,
    maxDate: Date | null | undefined,
    selectedOption: T,
) => {
    if (selectedOption && endDate === undefined) {
        endDate = startOfToday();
    }
    if (!endDate) return null;
    if (endDate && !maxDate) return startOfDay(endDate);

    return startOfDay(min([endDate as Date, maxDate as Date]));
};

export type Option<T> = { value: T, text: string, startDate: Date }

export interface DateRangePickerProps<T> {
    value?: (Date | null | T)[],
    defaultValue?: (Date | null | T)[],
    onValueChange?: (value: (Date | null | T)[]) => void,
    enableDropdown?: boolean,
    options: Option<T>[],
    minDate?: Date | null,
    maxDate?: Date | null,
    placeholder?: string,
    enableYearPagination?: boolean,
    color?: Color,
    marginTop?: MarginTop,
    maxWidth?: MaxWidth,
}

const DateRangePicker = <T, >({
    value,
    defaultValue,
    onValueChange,
    enableDropdown = true,
    options,
    minDate = null,
    maxDate = null,
    placeholder = 'Select...',
    color = BaseColors.Blue,
    marginTop = 'mt-0',
    maxWidth = 'max-w-none',
    enableYearPagination = false,
}: DateRangePickerProps<T>) => {
    const TODAY = startOfToday();
    const calendarRef = useRef(null);
    const dropdownRef = useRef(null);

    const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
    const [anchorDate, setAnchorDate] = useState(TODAY);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const selectOptions = options ?? defaultOptions;
    const selectedOptionValue = (selectedValue ? (selectedValue[2] ?? null) : null) as T;
    const selectedStartDate = selectedValue ? getStartDate(
        selectedValue[0] as Date | null,
        minDate,
        selectedOptionValue,
        selectOptions,
    ) : null;
    const selectedEndDate = selectedValue ? getEndDate(
        selectedValue[1] as Date | null,
        maxDate,
        selectedOptionValue
    ) : null;

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
        if (e.key === 'Escape') {
            e.preventDefault();
            setShowCalendar(false);
        }
    };

    const handleSelectOptionClick = (optionValue: T) => {
        let selectedStartDate = selectOptions.find((
            option: Option<T>) => option.value === optionValue)?.startDate ?? null;
        selectedStartDate = selectedStartDate ? startOfDay(selectedStartDate) : null;

        setSelectedValue([selectedStartDate, TODAY, optionValue]);
        onValueChange?.([selectedStartDate, TODAY, optionValue]);
        setAnchorDate(TODAY);
        setShowDropdown(false);
    };

    const [hoveredOptionValue, handleDropdownKeyDown] = useOnSelectElementKeyDown(
        selectOptions.map((option: Option<T>) => option.value),
        handleSelectOptionClick,
        showDropdown,
        setShowDropdown,
    );

    useEffect(() => {
        setAnchorDate(selectedEndDate ?? selectedStartDate ?? TODAY);
    }, [value]);

    return (
        <BaseColorContext.Provider value={ color }>
            <div className={ classNames(
                'tremor-base tr-relative tr-w-full',
                parseMarginTop(marginTop),
                parseMaxWidth(maxWidth),
            ) }>
                <DateRangePickerButton
                    value={ [selectedStartDate, selectedEndDate, selectedOptionValue] }
                    options={ selectOptions }
                    placeholder={ placeholder }
                    calendarRef={ calendarRef }
                    showCalendar={ showCalendar }
                    setShowCalendar={ setShowCalendar }
                    onCalendarKeyDown={ handleCalendarKeyDown }
                    enableDropdown={ enableDropdown }
                    dropdownRef={ dropdownRef }
                    showDropdown={ showDropdown }
                    setShowDropdown={ setShowDropdown }
                    onDropdownKeyDown={ handleDropdownKeyDown }
                />
                {/* Calendar Modal */}
                <Modal
                    showModal={ showCalendar }
                    setShowModal={ setShowCalendar }
                    triggerRef={ calendarRef }
                    width="w-72"
                    maxHeight="tr-max-h-fit"
                >
                    <Calendar
                        enableYearPagination={ enableYearPagination }
                        anchorDate={ anchorDate }
                        setAnchorDate={ setAnchorDate }
                        startDate={ selectedStartDate }
                        endDate={ selectedEndDate }
                        minDate={ minDate }
                        maxDate={ maxDate }
                        onDateClick={ handleDateClick }
                    />
                </Modal>
                {/* Dropdpown Modal */}
                <Modal
                    showModal={ showDropdown }
                    setShowModal={ setShowDropdown }
                    triggerRef={ dropdownRef }
                >
                    <SelectedValueContext.Provider value={ {
                        selectedValue: selectedOptionValue,
                        handleValueChange: handleSelectOptionClick
                    } }
                    >
                        <HoveredValueContext.Provider value={ { hoveredValue: hoveredOptionValue } }>
                            { selectOptions.map(({ value, text }: Option<T>) => (
                                <DropdownItem value={ value } text={ text } />
                            ))}
                        </HoveredValueContext.Provider>
                    </SelectedValueContext.Provider>
                </Modal>

            </div>
        </BaseColorContext.Provider>
    );
};

export default DateRangePicker;
