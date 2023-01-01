import React, { Dispatch, Ref, SetStateAction } from 'react';

import { isEqual } from 'date-fns';

import { ArrowDownHeadIcon, CalendarIcon } from 'assets';

import {
    border,
    borderRadius,
    boxShadow,
    classNames,
    defaultColors,
    fontSize,
    fontWeight,
    getColorVariantsFromColorThemeValue,
    sizing,
    spacing
} from 'lib';

import { Option } from './DateRangePicker';

const formatSelectedDates = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate && !endDate) {
        return '';
    } else if (startDate && !endDate) {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return startDate.toLocaleDateString('en-US', options);
    } else if (startDate && endDate) {
        if (isEqual(startDate, endDate)) {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
            return startDate.toLocaleDateString('en-US', options);
        } else if ((startDate.getMonth() === endDate.getMonth())
            && (startDate.getFullYear() === endDate.getFullYear())) {
            const optionsStartDate: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
            return `${startDate.toLocaleDateString('en-US', optionsStartDate)} - 
                    ${endDate.getDate()}, ${endDate.getFullYear()}`;
        } else {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
            return `${startDate.toLocaleDateString('en-US', options)} - 
                    ${endDate.toLocaleDateString('en-US', options)}`;
        }
    }
    return '';
};

interface DateRangePickerButtonProps<T> {
    value: (Date | null | undefined | T)[],
    options: Option<T>[],
    placeholder: string,
    calendarRef: Ref<HTMLButtonElement>,
    showCalendar: boolean,
    setShowCalendar: Dispatch<SetStateAction<boolean>>,
    onCalendarKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void,
    enableDropdown: boolean,
    dropdownRef: Ref<HTMLButtonElement>,
    showDropdown: boolean,
    setShowDropdown: Dispatch<SetStateAction<boolean>>,
    onDropdownKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void,
}

const DateRangePickerButton = <T, >({
    value,
    options,
    placeholder,
    calendarRef,
    showCalendar,
    setShowCalendar,
    onCalendarKeyDown,
    enableDropdown,
    dropdownRef,
    showDropdown,
    setShowDropdown,
    onDropdownKeyDown
}: DateRangePickerButtonProps<T>) => {
    const [startDate, endDate, optionValue] = value;
    const hasSelection = (startDate || endDate) !== null;
    const calendarText = hasSelection ? formatSelectedDates(startDate as Date, endDate as Date) : placeholder;
    const dropdownText = optionValue
        ? String(options.find((option) => (
            option.value === optionValue
        ))?.text )
        : 'Select';


    return (
        <div className={ classNames(
            'tr-flex tr-items-center tr-justify-between',
            getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
            borderRadius.md.all,
            boxShadow.sm,
        ) }
        >
            <button
                type="button"
                ref={ calendarRef }
                onClick={ () => setShowCalendar(!showCalendar) }
                onKeyDown={ onCalendarKeyDown }
                className={ classNames(
                    `input-elem tr-flex tr-items-center tr-w-full tr-truncate focus:tr-ring-0
                     focus:tr-outline-0`,
                    enableDropdown
                        ? border.none.right
                        : classNames(borderRadius.md.right, border.sm.right),
                    getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                    getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                    spacing.twoXl.paddingLeft,
                    spacing.twoXl.paddingRight,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                    borderRadius.md.left,
                    border.sm.all,
                ) }
            >
                <CalendarIcon
                    className={ classNames(
                        'tr-flex-none',
                        getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                        sizing.lg.height,
                        sizing.lg.width,
                        spacing.threeXs.negativeMarginLeft,
                        spacing.lg.marginRight,
                    ) }
                    aria-hidden="true"
                />
                <p className={ classNames(
                    'text-elem tr-whitespace-nowrap tr-truncate',
                    fontSize.sm,
                    fontWeight.md,
                    hasSelection
                        ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                        : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
                ) }>
                    { calendarText }
                </p>
            </button>
            { enableDropdown ? (
                <button
                    type="button"
                    ref={ dropdownRef }
                    onClick={ () => setShowDropdown(!showDropdown) }
                    className={ classNames(
                        'input-elem tr-inline-flex tr-justify-between tr-w-48 tr-truncate',
                        'focus:tr-ring-0 focus:tr-outline-0',
                        getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                        getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                        spacing.twoXl.paddingLeft,
                        spacing.twoXl.paddingRight,
                        spacing.px.negativeMarginLeft,
                        spacing.sm.paddingTop,
                        spacing.sm.paddingBottom,
                        borderRadius.md.right,
                        border.sm.all,
                    ) }
                    onKeyDown={ onDropdownKeyDown }
                >
                    <p className={ classNames(
                        'text-elem tr-whitespace-nowrap tr-truncate',
                        fontSize.sm,
                        fontWeight.md,
                        optionValue
                            ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                            : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
                    ) }>
                        { dropdownText }
                    </p>
                    <ArrowDownHeadIcon
                        className={ classNames(
                            'tr-flex-none',
                            sizing.lg.height,
                            sizing.lg.width,
                            spacing.twoXs.negativeMarginRight,
                            getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                        ) }
                        aria-hidden="true"
                    />
                </button>
            ) : null }
        </div>
    );
};

export default DateRangePickerButton;
