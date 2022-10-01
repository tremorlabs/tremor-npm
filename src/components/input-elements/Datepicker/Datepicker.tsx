import React, { useEffect, useRef, useState } from 'react';

import {
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSaturday,
    isSunday,
    nextSaturday,
    parse,
    previousSunday,
    startOfDay,
    startOfMonth,
    startOfToday,
    startOfYear,
    sub,
} from 'date-fns';

import { ArrowDownHeadIcon, ArrowLeftHeadIcon, ArrowRightHeadIcon, CalendarIcon } from 'assets';
import {
    BaseColors,
    border,
    boxShadow,
    classNames,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    parseMaxWidth
} from 'lib';
import { Color, MarginTop, MaxWidth } from '../../../lib/inputTypes';
import { borderRadius, defaultColors, fontSize, fontWeight, sizing, spacing } from 'lib';
import {
    colStartClasses,
    displaySelected,
    getDayBgColorClassName,
    getDayHoverBgColorClassName,
    getDayRoundedClassName,
    getDayTextClassNames,
    nextMonth,
    previousMonth,
    relativeFilterOptions
} from './utils';
import Modal from 'components/layout-elements/Modal';

export interface DatepickerProps {
    handleSelect?: { (selectedStartDay: Date, selectedEndDay: Date): void },
    enableRelativeDates?: boolean,
    defaultStartDate?: Date | null,
    defaultEndDate?: Date | null,
    minDate?: Date | null,
    maxDate?: Date | null,
    placeholder?: string,
    color?: Color,
    marginTop?: MarginTop,
    maxWidth?: MaxWidth
}

const Datepicker = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSelect = (selectedStartDay: Date, selectedEndDay: Date) => null,
    enableRelativeDates = true,
    defaultStartDate = null,
    defaultEndDate = null,
    minDate = null,
    maxDate = null,
    placeholder = 'Select...',
    color = BaseColors.Blue,
    marginTop = 'mt-0',
    maxWidth = 'max-w-none',
}: DatepickerProps) => {
    const today = startOfToday();

    const hasDefaultDateRange = (defaultStartDate !== null) && (defaultEndDate !== null);

    const datePickerRef = useRef(null);
    const dropdownRef = useRef(null);

    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const [showDropdownModal, setShowDropdownModal] = useState(false);

    const [selectedRelativeFilterOption, setSelectedRelativeFilterOption] = useState<string | null>(null);

    const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
    const [selectedStartDay, setSelectedStartDay] = useState<Date | null>(
        hasDefaultDateRange ? startOfDay(defaultStartDate) : null);
    const [selectedEndDay, setSelectedEndDay] = useState<Date | null>(
        hasDefaultDateRange ? startOfDay(defaultEndDate) : null);
    const [currentMonth, setCurrentMonth] = useState(
        hasDefaultDateRange ? format(startOfDay(defaultEndDate)!, 'MMM-yyyy') : format(today, 'MMM-yyyy'));
    
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
    const lastDayCurrentMonth = endOfMonth(firstDayCurrentMonth);

    const days = eachDayOfInterval({
        start: isSunday(firstDayCurrentMonth)
            ? firstDayCurrentMonth
            : previousSunday(firstDayCurrentMonth),
        end: isSaturday(lastDayCurrentMonth)
            ? lastDayCurrentMonth
            : nextSaturday(lastDayCurrentMonth),
    });

    const isDayInCurrentMonth = (day: Date) => day >= firstDayCurrentMonth
        && day <= lastDayCurrentMonth;
    
    const isDayDisabled = (day: Date): boolean => {
        return (minDate !== null && day < minDate)
            || (maxDate !== null && day > maxDate)
            || !isDayInCurrentMonth(day);
    };

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
        if (selectedStartDay && selectedEndDay) handleSelect(selectedStartDay, selectedEndDay);
    }, [selectedEndDay]);

    return (
        <div className={ classNames(
            'tr-relative tr-w-full',
            parseMarginTop(marginTop),
            parseMaxWidth(maxWidth),
        ) }>
            <div className={ classNames(
                'tr-flex tr-items-center tr-justify-between',
                getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
                getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                borderRadius.md.all,
                boxShadow.sm,
            ) }
            >
                <button
                    ref={ datePickerRef }
                    onClick={ () => setShowDatePickerModal(!showDatePickerModal) }
                    className={ classNames(
                        'tr-flex tr-items-center tr-w-full tr-truncate',
                        'focus:tr-ring-2 focus:tr-outline-none focus:tr-z-10',
                        enableRelativeDates ? border.none.right : classNames(borderRadius.md.right, border.sm.right),
                        getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                        getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                        getColorVariantsFromColorThemeValue(defaultColors.ring).focusRingColor,
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
                            'flex-none',
                            getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                            sizing.lg.height,
                            sizing.lg.width,
                            spacing.threeXs.negativeMarginLeft,
                            spacing.lg.marginRight,
                        ) }
                        aria-hidden="true"
                    />
                    <p className={ classNames(
                        'tr-whitespace-nowrap tr-truncate',
                        fontSize.sm,
                        fontWeight.md,
                        selectedStartDay
                            ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                            : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
                    ) }>
                        { selectedStartDay ? String(displaySelected(selectedStartDay, selectedEndDay)) : placeholder }
                    </p>
                </button>
                { enableRelativeDates ? (
                    <button
                        ref={ dropdownRef }
                        onClick={ () => setShowDropdownModal(!showDropdownModal) }
                        className={ classNames(
                            'tr-inline-flex tr-justify-between tr-w-48 tr-truncate',
                            'focus:tr-ring-2 focus:tr-outline-none',
                            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                            getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                            getColorVariantsFromColorThemeValue(defaultColors.ring).focusRingColor,
                            spacing.twoXl.paddingLeft,
                            spacing.twoXl.paddingRight,
                            spacing.px.negativeMarginLeft,
                            spacing.sm.paddingTop,
                            spacing.sm.paddingBottom,
                            borderRadius.md.right,
                            border.sm.all,
                        ) }
                    >
                        <p className={ classNames(
                            'tr-whitespace-nowrap tr-truncate',
                            fontSize.sm,
                            fontWeight.md,
                            selectedRelativeFilterOption
                                ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                                : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
                        ) }>
                            { selectedRelativeFilterOption
                                ? String(relativeFilterOptions.find((filterOption) => (
                                    filterOption.value === selectedRelativeFilterOption
                                ))?.name)
                                : 'Select' }
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
            <Modal
                showModal={ showDatePickerModal }
                setShowModal={ setShowDatePickerModal }
                triggerRef={ datePickerRef }
                width="tr-w-72"
                maxHeight="tr-max-h-fit"
            >
                <div
                    className={ classNames(
                        spacing.lg.paddingLeft,
                        spacing.lg.paddingRight,
                        spacing.twoXs.paddingTop,
                        spacing.twoXs.paddingBottom,
                    ) }
                >
                    <div className={ classNames(
                        'tr-flex tr-justify-between tr-items-center',
                        spacing.twoXs.paddingLeft,
                        spacing.twoXs.paddingRight,
                        spacing.sm.paddingTop,
                        spacing.sm.paddingBottom,
                    )}
                    >
                        <button
                            type="button"
                            onClick={() => previousMonth(firstDayCurrentMonth, setCurrentMonth)}
                            className={ classNames(
                                'tr-inline-flex focus:tr-outline-none focus:tr-ring-2',
                                getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                                getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                                getColorVariantsFromColorThemeValue(defaultColors.ring).focusRingColor,
                                spacing.twoXs.paddingLeft,
                                spacing.twoXs.paddingRight,
                                spacing.twoXs.paddingTop,
                                spacing.twoXs.paddingBottom,
                                fontSize.sm,
                                fontWeight.md,
                                borderRadius.sm.all,
                                border.sm.all,
                                boxShadow.sm,
                            ) }
                        >
                            <ArrowLeftHeadIcon
                                className={ classNames(
                                    getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                                    sizing.lg.height,
                                    sizing.lg.width,
                                ) }
                                aria-hidden="true"
                            />
                        </button>
                        <h2 className={ classNames(
                            getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor,
                            fontSize.sm,
                            fontWeight.lg,
                        ) }
                        >
                            {format(firstDayCurrentMonth, 'MMMM yyyy')}
                        </h2>
                        <button
                            onClick={() => nextMonth(firstDayCurrentMonth, setCurrentMonth)}
                            type="button"
                            className={ classNames(
                                'tr-inline-flex focus:tr-outline-none focus:tr-ring-2',
                                getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                                getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                                getColorVariantsFromColorThemeValue(defaultColors.ring).focusRingColor,
                                spacing.twoXs.paddingLeft,
                                spacing.twoXs.paddingRight,
                                spacing.twoXs.paddingTop,
                                spacing.twoXs.paddingBottom,
                                fontSize.sm,
                                fontWeight.md,
                                borderRadius.sm.all,
                                border.sm.all,
                                boxShadow.sm,
                            ) }
                        >
                            <ArrowRightHeadIcon
                                className={ classNames(
                                    getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                                    sizing.lg.height,
                                    sizing.lg.width,
                                ) }
                                aria-hidden="true"
                            />
                        </button>

                    </div>
                    <div className={ classNames(
                        'tr-grid tr-grid-cols-7 tr-text-center',
                        getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                        fontSize.xs,
                        fontWeight.md,
                    ) }
                    >
                        { ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((dayName) => (
                            <div
                                key={ dayName }
                                className="tr-w-full tr-flex tr-justify-center"
                            >
                                <div
                                    className={ classNames(
                                        'tr-flex tr-items-center tr-justify-center tr-w-full',
                                        sizing.threeXl.height
                                    ) }
                                >
                                    { dayName }
                                </div>
                            </div>
                        )) }
                    </div>
                    <div className="tr-grid tr-grid-cols-7">
                        {days.map((day) => (
                            <div
                                key={day.toString()}
                                className={classNames(
                                    colStartClasses[getDay(day)],
                                    'tr-w-full'
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDayClick(day)}
                                    onPointerEnter={ () => setHoveredDay(day) }
                                    onPointerLeave={ () => setHoveredDay(null) }
                                    className={classNames(
                                        'tr-w-full tr-flex tr-items-center tr-justify-center',
                                        getDayBgColorClassName(
                                            day,
                                            selectedStartDay,
                                            selectedEndDay,
                                            hoveredDay,
                                            color,
                                            isDayDisabled(day),
                                        ),
                                        getDayTextClassNames(
                                            day,
                                            selectedStartDay,
                                            selectedEndDay,
                                            hoveredDay,
                                            color,
                                            isDayDisabled(day),
                                        ),
                                        getDayHoverBgColorClassName(
                                            day,
                                            selectedStartDay,
                                            selectedEndDay,
                                            isDayDisabled(day),
                                        ),
                                        getDayRoundedClassName(day, selectedStartDay, selectedEndDay, hoveredDay),
                                        sizing.threeXl.height,
                                        fontSize.sm,
                                    )}
                                    disabled={ isDayDisabled(day) }
                                >
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                        {format(day, 'd')}
                                    </time>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
            <Modal
                showModal={ showDropdownModal }
                setShowModal={ setShowDropdownModal }
                triggerRef={ dropdownRef }
            >
                { relativeFilterOptions.map((filterOption) => (
                    <button
                        key={ filterOption.value }
                        onClick={ () => {
                            setSelectedRelativeFilterOption(filterOption.value);
                            handleRelativeFilterOptionClick(filterOption.value);
                            setShowDropdownModal(false);
                        } }
                        className={ classNames(
                            'tr-flex tr-items-center tr-justify-between tr-w-full tr-truncate',
                            spacing.twoXl.paddingLeft,
                            spacing.twoXl.paddingRight,
                            spacing.md.paddingTop,
                            spacing.md.paddingBottom,
                            fontSize.sm,
                            selectedRelativeFilterOption === filterOption.value
                                ? classNames(
                                    getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
                                    getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor,
                                )
                                : classNames(
                                    getColorVariantsFromColorThemeValue(defaultColors.lightBackground).hoverBgColor,
                                    getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                                )
                        ) }
                    >
                        <p className="tr-whitespace-nowrap tr-truncate">
                            { filterOption.name }
                        </p>
                    </button>
                ))}      
            </Modal>
        </div>
    );
};

export default Datepicker;
