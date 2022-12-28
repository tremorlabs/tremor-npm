import React, { Dispatch, Ref, SetStateAction, useEffect, useRef, useState } from 'react';

import { add, endOfMonth, format, getMonth, isEqual, max, min, startOfMonth } from 'date-fns';

import {
    ArrowLeftHeadIcon,
    ArrowRightHeadIcon,
    CalendarIcon,
    DoubleArrowLeftHeadIcon,
    DoubleArrowRightHeadIcon
} from 'assets';
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
import { Color, MarginTop, MaxWidth, RelativeFilterOption } from '../../../lib/inputTypes';
import Modal from 'components/layout-elements/Modal';
import { useInternalState } from 'hooks';

export interface DateRangePickerProps {
    handleSelect?: (selectedStartDay: Date, selectedEndDay: Date) => void,
    onValueChange?: (selectedStartDay: Date, selectedEndDay: Date) => void,
    enableRelativeDates?: boolean,
    defaultRelativeFilterOption?: RelativeFilterOption,
    defaultStartDate?: Date | null,
    defaultEndDate?: Date | null,
    startDate?: Date | null,
    endDate?: Date | null,
    minDate?: Date | null,
    maxDate?: Date | null,
    placeholder?: string,
    color?: Color,
    marginTop?: MarginTop,
    maxWidth?: MaxWidth,
    enableYearPagination?: boolean
}

const getFinalStartDate = (
    startDate: Date | null | undefined,
    minDate: Date | null | undefined,
) => {
    if (!startDate && !minDate) return null;
    if (startDate && !minDate) return startDate;
    if (!startDate && minDate) return minDate;

    return max([startDate as Date, minDate as Date]);
};

const getFinalEndDate = (
    endDate: Date | null | undefined,
    maxDate: Date | null | undefined,
) => {
    if (!endDate && !maxDate) return null;
    if (endDate && !maxDate) return endDate;
    if (!endDate && maxDate) return maxDate;

    return min([endDate as Date, maxDate as Date]);
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

interface DatepickerButtonProps {
    datepickerRef: Ref<HTMLButtonElement>,
    hasSelection: boolean,
    displayedText: string,
    showDatepickerModal: boolean,
    setShowDatepickerModal: Dispatch<SetStateAction<boolean>>,
}

const DatepickerButton = ({
    datepickerRef,
    hasSelection,
    displayedText,
    showDatepickerModal,
    setShowDatepickerModal,
}: DatepickerButtonProps) => {
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
                ref={ datepickerRef }
                onClick={ () => setShowDatepickerModal(!showDatepickerModal) }
                className={ classNames(
                    'input-elem tr-flex tr-items-center tr-w-full tr-truncate focus:tr-ring-0 focus:tr-outline-0',
                    classNames(borderRadius.md.right, border.sm.right),
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
        </div>
    );
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

const DateRangePicker = ({
    handleSelect,
    onValueChange,
    enableRelativeDates = true,
    defaultRelativeFilterOption = null,
    defaultStartDate,
    defaultEndDate,
    startDate,
    endDate,
    minDate = null,
    maxDate = null,
    placeholder = 'Select...',
    color = BaseColors.Blue,
    marginTop = 'mt-0',
    maxWidth = 'max-w-none',
    enableYearPagination = false,
}: DateRangePickerProps) => {
    const TODAY = new Date();

    const datepickerRef = useRef(null);

    const [selectedStartDate, setSelectedStartDate] = useInternalState(defaultStartDate, startDate);
    const [selectedEndDate, setSelectedEndDate] = useInternalState(defaultEndDate, endDate);
    const [selectedRelativeFilterOption, setSelectedRelativeFilterOption] = useState(defaultRelativeFilterOption);
    const [anchorDate, setAnchorDate] = useState(TODAY);
    const [showDatepickerModal, setShowDatepickerModal] = useState(false);

    const displayedMonth = getMonth(anchorDate);
    const firstDayOfDisplayedMonth = startOfMonth(anchorDate);
    const lastDayOfDisplayedMonth = endOfMonth(anchorDate);

    const finalStartDate = getFinalStartDate(selectedStartDate, minDate);
    const finalEndDate = getFinalEndDate(selectedEndDate, maxDate);
    
    const hasSelection = (finalStartDate || finalEndDate) !== null;
    const displayedText = hasSelection ? formatSelectedDates(finalStartDate, finalEndDate) : placeholder;

    useEffect(() => {
        setAnchorDate(finalEndDate ?? TODAY);
    }, [selectedEndDate]);

    console.log(finalStartDate);
    console.log(finalEndDate);
    console.log(displayedMonth);

    return (
        <div className={ classNames(
            'tremor-base tr-relative tr-w-full',
            parseMarginTop(marginTop),
            parseMaxWidth(maxWidth),
        ) }>
            <DatepickerButton
                datepickerRef={ datepickerRef }
                hasSelection={ hasSelection }
                displayedText={ displayedText }
                showDatepickerModal={ showDatepickerModal }
                setShowDatepickerModal={ setShowDatepickerModal }
            />
            <Modal
                showModal={ showDatepickerModal }
                setShowModal={ setShowDatepickerModal }
                triggerRef={ datepickerRef }
                width="w-72"
                maxHeight="tr-max-h-fit"
            >
                <DatepickerHeader
                    enableYearPagination={ enableYearPagination }
                    anchorDate={ anchorDate }
                    setAnchorDate={ setAnchorDate }
                />
            </Modal>
        </div>
    );
};

export default DateRangePicker;
