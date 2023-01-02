import React, { useEffect, useRef, useState } from 'react';

import { startOfDay, startOfToday } from 'date-fns';

import { BaseColorContext, HoveredValueContext, SelectedValueContext } from 'contexts';

import { useInternalState, useSelectOnKeyDown } from 'hooks';

import {
    BaseColors,
    classNames,
    parseMarginTop,
    parseMaxWidth,
} from 'lib';
import { Color, MarginTop, MaxWidth } from '../../../lib/inputTypes';
import { defaultOptions, getEndDate, getStartDate } from './dateRangePickerUtils';

import Calendar from './Calendar';
import DateRangePickerButton from './DateRangePickerButton';
import { DropdownItem } from 'components/input-elements/Dropdown';
import Modal from 'components/layout-elements/Modal';

export type DateRangePickerOption<T> = { value: T, text: string, startDate: Date }

export interface DateRangePickerProps<T> {
    value?: (Date | null | T)[],
    defaultValue?: (Date | null | T)[],
    onValueChange?: (value: (Date | null | T)[]) => void,
    enableDropdown?: boolean,
    options: DateRangePickerOption<T>[],
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

    const dropdownOptions = options ?? defaultOptions;
    const selectedOptionValue = (selectedValue ? (selectedValue[2] ?? null) : null) as T;
    const selectedStartDate = selectedValue ? getStartDate(
        selectedValue[0] as Date | null,
        minDate,
        selectedOptionValue,
        dropdownOptions,
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
        let selectedStartDate = dropdownOptions.find((
            option: DateRangePickerOption<T>) => option.value === optionValue)?.startDate ?? null;
        selectedStartDate = selectedStartDate ? startOfDay(selectedStartDate) : null;

        setSelectedValue([selectedStartDate, TODAY, optionValue]);
        onValueChange?.([selectedStartDate, TODAY, optionValue]);
        setAnchorDate(TODAY);
        setShowDropdown(false);
    };

    const [hoveredOptionValue, handleDropdownKeyDown] = useSelectOnKeyDown(
        dropdownOptions.map((option: DateRangePickerOption<T>) => option.value),
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
                    options={ dropdownOptions }
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
                            { dropdownOptions.map(({ value, text }: DateRangePickerOption<T>) => (
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
