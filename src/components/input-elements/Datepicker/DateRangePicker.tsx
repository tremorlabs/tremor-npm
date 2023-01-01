import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';

import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSaturday,
    isSunday,
    max,
    min,
    nextSaturday,
    previousSunday,
    startOfDay,
    startOfMonth,
    startOfToday
} from 'date-fns';

import { useInternalState, useOnSelectElementKeyDown } from 'hooks';

import {
    ArrowDownHeadIcon,
    ArrowLeftHeadIcon,
    ArrowRightHeadIcon,
    CalendarIcon,
    DoubleArrowLeftHeadIcon,
    DoubleArrowRightHeadIcon
} from 'assets';

import { BaseColorContext, HoveredValueContext } from 'contexts';
import {
    BaseColors,
    border,
    borderRadius,
    boxShadow,
    classNames,
    defaultColors,
    fontSize,
    fontWeight,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    parseMaxWidth,
    sizing,
    spacing
} from 'lib';
import { Color, MarginTop, MaxWidth } from '../../../lib/inputTypes';
import {
    relativeFilterOptions as defaultFilterOptions,
    getDateStyles,
} from 'components/input-elements/Datepicker/utils';
import Modal from 'components/layout-elements/Modal';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
];

const getStartDate = <T, >(
    startDate: Date | null | undefined,
    minDate: Date | null | undefined,
    selectedFilterOption: T,
    filterOptions: Option<T>[],
) => {
    if (selectedFilterOption && startDate === undefined) {
        startDate = filterOptions.filter(option => option.value === selectedFilterOption)[0].startDate;
    }
    if (!startDate) return null;
    if (startDate && !minDate) return startOfDay(startDate);
    return startOfDay(max([startDate as Date, minDate as Date]));
};

const getEndDate = (
    endDate: Date | null | undefined,
    maxDate: Date | null | undefined,
    selectedFilterOption: any,
) => {
    if (selectedFilterOption && endDate === undefined) {
        endDate = startOfToday();
    }
    if (!endDate) return null;
    if (endDate && !maxDate) return startOfDay(endDate);

    return startOfDay(min([endDate as Date, maxDate as Date]));
};

export const formatSelectedDates = (startDate: Date | null, endDate: Date | null) => {
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

interface DatepickerHeaderProps {
    enableYearPagination: boolean,
    anchorDate: Date,
    setAnchorDate: Dispatch<SetStateAction<Date>>,
}

const DatepickerHeader = ({
    enableYearPagination,
    anchorDate,
    setAnchorDate,
}: DatepickerHeaderProps) => {
    const handlePaginationClick = (type: 'nextMonth' | 'prevMonth' | 'nextYear' | 'prevYear') => {
        switch (type) {
        case 'nextMonth':
            setAnchorDate(add(anchorDate, { months: 1 }));
            break;
        case 'prevMonth':
            setAnchorDate(add(anchorDate, { months: -1 }));
            break;
        case 'nextYear':
            setAnchorDate(add(anchorDate, { years: 1 }));
            break;
        case 'prevYear':
            setAnchorDate(add(anchorDate, { years: -1 }));
            break;
        }
    };

    const displayedTitle = format(anchorDate, 'MMMM yyyy');

    return (
        <div className={ classNames(
            'tr-flex tr-justify-between tr-items-center',
            spacing.twoXs.paddingLeft,
            spacing.twoXs.paddingRight,
            spacing.sm.paddingTop,
            spacing.sm.paddingBottom,
        )}
        >
            <div className="tr-flex tr-items-center tr-space-x-1">
                <button
                    type="button"
                    hidden={!enableYearPagination}
                    className={ classNames(
                        'input-elem tr-inline-flex focus:tr-outline-none focus:tr-ring-2',
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
                    onClick={ () => handlePaginationClick('prevYear') }
                >
                    <DoubleArrowLeftHeadIcon
                        className={ classNames(
                            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                            sizing.lg.height,
                            sizing.lg.width,
                        ) }
                        aria-hidden="true"
                    />
                </button>
                <button
                    type="button"
                    name="prevMonth"
                    className={ classNames(
                        'input-elem tr-inline-flex focus:tr-outline-none focus:tr-ring-2',
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
                    onClick={ () => handlePaginationClick('prevMonth') }
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
            </div>
            <h2 className={ classNames(
                'text-elem',
                getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor,
                fontSize.sm,
                fontWeight.lg,
            ) }
            >
                { displayedTitle }
            </h2>
            <div className="tr-flex tr-items-center tr-space-x-1">
                <button
                    type="button"
                    name="nextMonth"
                    className={ classNames(
                        'input-elem tr-inline-flex focus:tr-outline-none focus:tr-ring-2',
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
                    onClick={ () => handlePaginationClick('nextMonth') }
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
                <button
                    type="button"
                    hidden={!enableYearPagination}
                    className={ classNames(
                        'input-elem tr-inline-flex focus:tr-outline-none focus:tr-ring-2',
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
                    onClick={ () => handlePaginationClick('nextYear') }
                >
                    <DoubleArrowRightHeadIcon
                        className={ classNames(
                            'tr-shrink-0 tr-flex-0',
                            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                            sizing.lg.height,
                            sizing.lg.width,
                        ) }
                        aria-hidden="true"
                    />
                </button>
            </div>
        </div>
    );
};

interface DatepickerBodyProps {
    finalStartDate: Date | null,
    finalEndDate: Date | null,
    handleDateClick: (date: Date) => void,
    displayedDates: Date[],
    minDate: Date | null,
    maxDate: Date | null,
    firstDayDisplayedMonth: Date,
    lastDayDisplayedMonth: Date,
}

const DatepickerBody = ({
    finalStartDate,
    finalEndDate,
    handleDateClick,
    displayedDates,
    minDate,
    maxDate,
    firstDayDisplayedMonth,
    lastDayDisplayedMonth,
}: DatepickerBodyProps) => {
    const { hoveredValue: hoveredDate, setHoveredValue: setHoveredDate } = useContext(HoveredValueContext);
    const color = useContext(BaseColorContext);

    const isDateDisabled = (
        date: Date,
        minDate: Date | null,
        maxDate: Date | null,
        firstDayDisplayedMonth: Date,
        lastDayDisplayedMonth: Date,
    ) => {
        const isDateInDisplayedMonth = date >= firstDayDisplayedMonth && date <= lastDayDisplayedMonth;
        return (minDate !== null && date < minDate)
            || (maxDate !== null && date > maxDate)
            || !isDateInDisplayedMonth;
    };

    return (
        <>
            <div className={ classNames(
                'tr-grid tr-grid-cols-7 tr-text-center',
                getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                fontSize.xs,
                fontWeight.md,
            ) }
            >
                { WEEKDAYS.map((dayName) => (
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
                { displayedDates.map((date) => {

                    const isCurrentDateDisabled = isDateDisabled(
                        date,
                        minDate,
                        maxDate,
                        firstDayDisplayedMonth,
                        lastDayDisplayedMonth,
                    );

                    return (
                        <div
                            key={date.toString()}
                            className={classNames(
                                colStartClasses[getDay(date)],
                                'tr-w-full'
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => handleDateClick(date)}
                                onPointerEnter={ () => setHoveredDate?.(date) }
                                onPointerLeave={ () => setHoveredDate?.(undefined) }
                                className={classNames(
                                    'input-elem tr-w-full tr-flex tr-items-center tr-justify-center',
                                    sizing.threeXl.height,
                                    fontSize.sm,
                                    getDateStyles(
                                        date,
                                        finalStartDate,
                                        finalEndDate,
                                        hoveredDate,
                                        isCurrentDateDisabled,
                                        color,
                                    ),
                                )}
                                disabled={ isCurrentDateDisabled }
                            >
                                <time dateTime={format(date, 'yyyy-MM-dd')}>
                                    {format(date, 'd')}
                                </time>
                            </button>
                        </div>
                    ); }) }
            </div>
        </>
    );
};

export type Option<T> = { value: T, text: string, startDate: Date }

export interface DateRangePickerProps<T> {
    value?: (Date | null | T)[],
    defaultValue?: (Date | null | T)[],
    onValueChange?: (value: (Date | null | T)[]) => void,
    enableFilterOptions?: boolean,
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
    enableFilterOptions = true,
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
    const datepickerRef = useRef(null);
    const dropdownRef = useRef(null);

    const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
    const [hoveredDate, setHoveredDate] = useState<Date | undefined>();
    const [anchorDate, setAnchorDate] = useState(TODAY);
    const [showDatepickerModal, setShowDatepickerModal] = useState(false);
    const [showRelativeFilterModal, setShowRelativeFilterModal] = useState(false);

    const filterOptions = options ?? defaultFilterOptions;

    const selectedFilterOptionValue = (selectedValue ? (selectedValue[2] ?? null) : null) as T;
    const selectedStartDate = selectedValue ? getStartDate(
        selectedValue[0] as Date | null,
        minDate,
        selectedFilterOptionValue,
        filterOptions,
    ) : null;
    const selectedEndDate = selectedValue ? getEndDate(
        selectedValue[1] as Date | null,
        maxDate,
        selectedFilterOptionValue
    ) : null;

    const hasSelection = (selectedStartDate || selectedEndDate) !== null;
    const displayedText = hasSelection ? formatSelectedDates(selectedStartDate, selectedEndDate) : placeholder;

    const firstDayOfDisplayedMonth = startOfMonth(anchorDate);
    const lastDayOfDisplayedMonth = endOfMonth(anchorDate);

    const displayedDates = eachDayOfInterval({
        start: isSunday(firstDayOfDisplayedMonth)
            ? firstDayOfDisplayedMonth
            : previousSunday(firstDayOfDisplayedMonth),
        end: isSaturday(lastDayOfDisplayedMonth)
            ? lastDayOfDisplayedMonth
            : nextSaturday(lastDayOfDisplayedMonth),
    });

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
                setShowDatepickerModal(false);
            }
        } else if (selectedStartDate && selectedEndDate) {
            onValueChange?.([date, null, null]);
            setSelectedValue([date, null, null]);
        }
    };

    const handleDatepickerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            setShowDatepickerModal(false);
        }
    };

    const handleRelativeFilterClick = (optionValue: T, startDate?: Date) => {
        const selectedStartDate = startDate
            ?? filterOptions.filter((option: Option<T>) => option.value === optionValue)[0].startDate;
        setSelectedValue([selectedStartDate, TODAY, optionValue]);
        onValueChange?.([selectedStartDate, TODAY, optionValue]);
        setAnchorDate(TODAY);
        setShowRelativeFilterModal(false);
    };

    const [hoveredFilterOptionValue, handleFilterKeyDown] = useOnSelectElementKeyDown(
        filterOptions.map((option: Option<T>) => option.value),
        handleRelativeFilterClick,
        showRelativeFilterModal,
        setShowRelativeFilterModal,
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
                        ref={ datepickerRef }
                        onClick={ () => setShowDatepickerModal(!showDatepickerModal) }
                        onKeyDown={ handleDatepickerKeyDown }
                        className={ classNames(
                            `input-elem tr-flex tr-items-center tr-w-full tr-truncate focus:tr-ring-0
                             focus:tr-outline-0`,
                            enableFilterOptions
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
                            { displayedText }
                        </p>
                    </button>
                    { enableFilterOptions ? (
                        <button
                            type="button"
                            ref={ dropdownRef }
                            onClick={ () => setShowRelativeFilterModal(!showRelativeFilterModal) }
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
                            onKeyDown={ handleFilterKeyDown }
                        >
                            <p className={ classNames(
                                'text-elem tr-whitespace-nowrap tr-truncate',
                                fontSize.sm,
                                fontWeight.md,
                                selectedFilterOptionValue
                                    ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                                    : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
                            ) }>
                                { selectedFilterOptionValue
                                    ? String(defaultFilterOptions.find((filterOption) => (
                                        filterOption.value === selectedFilterOptionValue
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
                <HoveredValueContext.Provider value={
                    { hoveredValue: hoveredDate, setHoveredValue: setHoveredDate }
                }>
                    <Modal
                        showModal={ showDatepickerModal }
                        setShowModal={ setShowDatepickerModal }
                        triggerRef={ datepickerRef }
                        width="w-72"
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
                            <DatepickerHeader
                                enableYearPagination={ enableYearPagination }
                                anchorDate={ anchorDate }
                                setAnchorDate={ setAnchorDate }
                            />
                            <DatepickerBody
                                displayedDates={ displayedDates }
                                finalStartDate={ selectedStartDate }
                                finalEndDate={ selectedEndDate }
                                handleDateClick={ handleDateClick }
                                minDate={ minDate }
                                maxDate={ maxDate }
                                firstDayDisplayedMonth={ firstDayOfDisplayedMonth }
                                lastDayDisplayedMonth={ lastDayOfDisplayedMonth }
                            />
                        </div>
                    </Modal>
                </HoveredValueContext.Provider>
                <Modal
                    showModal={ showRelativeFilterModal }
                    setShowModal={ setShowRelativeFilterModal }
                    triggerRef={ dropdownRef }
                >
                    { filterOptions.map(({value, text, startDate}: Option<T>) => (
                        <button
                            key={ String(value) }
                            type="button"
                            onClick={ () => handleRelativeFilterClick(value, startDate) }
                            className={ classNames(
                                'input-elem tr-flex tr-items-center tr-justify-between tr-w-full tr-truncate',
                                spacing.twoXl.paddingLeft,
                                spacing.twoXl.paddingRight,
                                spacing.md.paddingTop,
                                spacing.md.paddingBottom,
                                fontSize.sm,
                                selectedFilterOptionValue === value || hoveredFilterOptionValue === value
                                    ? classNames(
                                        getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
                                        getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor,
                                    )
                                    : classNames(
                                        getColorVariantsFromColorThemeValue(
                                            defaultColors.lightBackground).hoverBgColor,
                                        getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                                    )
                            ) }
                        >
                            <p className="text-elem tr-whitespace-nowrap tr-truncate">
                                { text }
                            </p>
                        </button>
                    ))}      
                </Modal>

            </div>
        </BaseColorContext.Provider>
    );
};

export default DateRangePicker;
