/**
 * NOTE: The Datepicker component is deprecated and will be removed in the next major release.
 * Please refer to the DateRangePicker component instead.
 */

import React, { Dispatch, Ref, SetStateAction, useRef, useState } from "react";
import clsx from "clsx";

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
  startOfToday,
} from "date-fns";

import {
  ArrowDownHeadIcon,
  ArrowLeftHeadIcon,
  ArrowRightHeadIcon,
  CalendarIcon,
  DoubleArrowLeftHeadIcon,
  DoubleArrowRightHeadIcon,
} from "assets";
import {
  BaseColors,
  border,
  boxShadow,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
  parseMaxWidth,
} from "lib";
import { Color, MarginTop, MaxWidth, RelativeFilterOption } from "../../../lib/inputTypes";
import { borderRadius, defaultColors, fontSize, fontWeight, sizing, spacing } from "lib";
import {
  colStartClasses,
  displaySelected,
  getDayBgColorClassName,
  getDayHoverBgColorClassName,
  getDayRoundedClassName,
  getDayTextClassNames,
  getInitialCurrentMonth,
  getInitialDateRange,
  getStartDateFromRelativeFilterOption,
  isDayDisabled,
  nextMonth,
  nextYear,
  previousMonth,
  previousYear,
  relativeFilterOptions,
} from "./datepickerUtils";
import Modal from "components/layout-elements/Modal";

export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface DatepickerButtonProps {
  datePickerRef: Ref<HTMLButtonElement>;
  dropdownRef: Ref<HTMLButtonElement>;
  showDatePickerModal: boolean;
  setShowDatePickerModal: Dispatch<SetStateAction<boolean>>;
  showDropdownModal: boolean;
  setShowDropdownModal: Dispatch<SetStateAction<boolean>>;
  enableRelativeDates: boolean;
  selectedRelativeFilterOption: RelativeFilterOption;
  showSelectionText: boolean;
  selectionText: string;
}

const DatepickerButton = ({
  datePickerRef,
  dropdownRef,
  showDatePickerModal,
  setShowDatePickerModal,
  showDropdownModal,
  setShowDropdownModal,
  enableRelativeDates,
  selectedRelativeFilterOption,
  showSelectionText,
  selectionText,
}: DatepickerButtonProps) => (
  <div
    className={clsx(
      "flex items-center justify-between",
      getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
      getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
      borderRadius.md.all,
      boxShadow.sm,
    )}
  >
    <button
      type="button"
      ref={datePickerRef}
      onClick={() => setShowDatePickerModal(!showDatePickerModal)}
      className={clsx(
        "input-elem flex items-center w-full truncate focus:ring-0 focus:outline-0",
        enableRelativeDates ? border.none.right : clsx(borderRadius.md.right, border.sm.right),
        getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
        getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
        spacing.twoXl.paddingLeft,
        spacing.twoXl.paddingRight,
        spacing.sm.paddingTop,
        spacing.sm.paddingBottom,
        borderRadius.md.left,
        border.sm.all,
      )}
    >
      <CalendarIcon
        className={clsx(
          "flex-none",
          getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
          sizing.lg.height,
          sizing.lg.width,
          spacing.threeXs.negativeMarginLeft,
          spacing.lg.marginRight,
        )}
        aria-hidden="true"
      />
      <p
        className={clsx(
          "text-elem whitespace-nowrap truncate",
          fontSize.sm,
          fontWeight.md,
          showSelectionText
            ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
            : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        )}
      >
        {selectionText}
      </p>
    </button>
    {enableRelativeDates ? (
      <button
        type="button"
        ref={dropdownRef}
        onClick={() => setShowDropdownModal(!showDropdownModal)}
        className={clsx(
          "input-elem inline-flex justify-between w-48 truncate",
          "focus:ring-0 focus:outline-0",
          getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
          getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
          spacing.twoXl.paddingLeft,
          spacing.twoXl.paddingRight,
          spacing.px.negativeMarginLeft,
          spacing.sm.paddingTop,
          spacing.sm.paddingBottom,
          borderRadius.md.right,
          border.sm.all,
        )}
      >
        <p
          className={clsx(
            "text-elem whitespace-nowrap truncate",
            fontSize.sm,
            fontWeight.md,
            selectedRelativeFilterOption
              ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
              : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
          )}
        >
          {selectedRelativeFilterOption
            ? String(
                relativeFilterOptions.find(
                  (filterOption) => filterOption.value === selectedRelativeFilterOption,
                )?.name,
              )
            : "Select"}
        </p>
        <ArrowDownHeadIcon
          className={clsx(
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.twoXs.negativeMarginRight,
            getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
          )}
          aria-hidden="true"
        />
      </button>
    ) : null}
  </div>
);

interface DatepickerHeaderProps {
  enableYearPagination: boolean;
  firstDayCurrentMonth: Date;
  setCurrentMonth: Dispatch<SetStateAction<string>>;
}

const DatepickerHeader = ({
  enableYearPagination,
  firstDayCurrentMonth,
  setCurrentMonth,
}: DatepickerHeaderProps) => (
  <div
    className={clsx(
      "flex justify-between items-center",
      spacing.twoXs.paddingLeft,
      spacing.twoXs.paddingRight,
      spacing.sm.paddingTop,
      spacing.sm.paddingBottom,
    )}
  >
    <div className="flex items-center space-x-1">
      <button
        type="button"
        hidden={!enableYearPagination}
        onClick={() => previousYear(firstDayCurrentMonth, setCurrentMonth)}
        className={clsx(
          "input-elem inline-flex focus:outline-none focus:ring-2",
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
        )}
      >
        <DoubleArrowLeftHeadIcon
          className={clsx(
            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
            sizing.lg.height,
            sizing.lg.width,
          )}
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        onClick={() => previousMonth(firstDayCurrentMonth, setCurrentMonth)}
        className={clsx(
          "input-elem inline-flex focus:outline-none focus:ring-2",
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
        )}
      >
        <ArrowLeftHeadIcon
          className={clsx(
            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
            sizing.lg.height,
            sizing.lg.width,
          )}
          aria-hidden="true"
        />
      </button>
    </div>
    <h2
      className={clsx(
        "text-elem",
        getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor,
        fontSize.sm,
        fontWeight.lg,
      )}
    >
      {format(firstDayCurrentMonth, "MMMM yyyy")}
    </h2>
    <div className="flex items-center space-x-1">
      <button
        onClick={() => nextMonth(firstDayCurrentMonth, setCurrentMonth)}
        type="button"
        className={clsx(
          "input-elem inline-flex focus:outline-none focus:ring-2",
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
        )}
      >
        <ArrowRightHeadIcon
          className={clsx(
            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
            sizing.lg.height,
            sizing.lg.width,
          )}
          aria-hidden="true"
        />
      </button>
      <button
        onClick={() => nextYear(firstDayCurrentMonth, setCurrentMonth)}
        type="button"
        hidden={!enableYearPagination}
        className={clsx(
          "input-elem inline-flex focus:outline-none focus:ring-2",
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
        )}
      >
        <DoubleArrowRightHeadIcon
          className={clsx(
            "shrink-0 flex-0",
            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
            sizing.lg.height,
            sizing.lg.width,
          )}
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
);

interface DatepickerBodyProps {
  daysInCurrentMonth: Date[];
  minDate: Date | null;
  maxDate: Date | null;
  firstDayCurrentMonth: Date;
  lastDayCurrentMonth: Date;
  handleDayClick: (day: Date) => void;
  setHoveredDay: Dispatch<SetStateAction<Date | null>>;
  selectedStartDay: Date | null;
  selectedEndDay: Date | null;
  hoveredDay: Date | null;
  color: Color;
}

const DatepickerBody = ({
  daysInCurrentMonth,
  minDate,
  maxDate,
  firstDayCurrentMonth,
  lastDayCurrentMonth,
  handleDayClick,
  selectedStartDay,
  selectedEndDay,
  hoveredDay,
  setHoveredDay,
  color,
}: DatepickerBodyProps) => (
  <>
    <div
      className={clsx(
        "grid grid-cols-7 text-center",
        getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
        fontSize.xs,
        fontWeight.md,
      )}
    >
      {WEEKDAYS.map((dayName) => (
        <div key={dayName} className="w-full flex justify-center">
          <div className={clsx("flex items-center justify-center w-full", sizing.threeXl.height)}>
            {dayName}
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-7">
      {daysInCurrentMonth.map((day) => {
        const isCurrentDayDisabled = isDayDisabled(
          day,
          minDate,
          maxDate,
          firstDayCurrentMonth,
          lastDayCurrentMonth,
        );

        return (
          <div key={day.toString()} className={clsx(colStartClasses[getDay(day)], "w-full")}>
            <button
              type="button"
              onClick={() => handleDayClick(day)}
              onPointerEnter={() => setHoveredDay(day)}
              onPointerLeave={() => setHoveredDay(null)}
              className={clsx(
                "input-elem w-full flex items-center justify-center",
                getDayBgColorClassName(
                  day,
                  selectedStartDay,
                  selectedEndDay,
                  hoveredDay,
                  color,
                  isCurrentDayDisabled,
                ),
                getDayTextClassNames(
                  day,
                  selectedStartDay,
                  selectedEndDay,
                  hoveredDay,
                  color,
                  isCurrentDayDisabled,
                ),
                getDayHoverBgColorClassName(
                  day,
                  selectedStartDay,
                  selectedEndDay,
                  isCurrentDayDisabled,
                ),
                getDayRoundedClassName(day, selectedStartDay, selectedEndDay, hoveredDay),
                sizing.threeXl.height,
                fontSize.sm,
              )}
              disabled={isCurrentDayDisabled}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
            </button>
          </div>
        );
      })}
    </div>
  </>
);

export interface DatepickerProps {
  handleSelect?: (selectedStartDay: Date, selectedEndDay: Date) => void;
  enableRelativeDates?: boolean;
  defaultRelativeFilterOption?: RelativeFilterOption;
  defaultStartDate?: Date | null;
  defaultEndDate?: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  placeholder?: string;
  color?: Color;
  marginTop?: MarginTop;
  maxWidth?: MaxWidth;
  enableYearPagination?: boolean;
}

const Datepicker = ({
  handleSelect,
  enableRelativeDates = true,
  defaultRelativeFilterOption = null,
  defaultStartDate = null,
  defaultEndDate = null,
  minDate = null,
  maxDate = null,
  placeholder = "Select...",
  color = BaseColors.Blue,
  marginTop = "mt-0",
  maxWidth = "max-w-none",
  enableYearPagination = false,
}: DatepickerProps) => {
  console.warn(
    "DeprecationWarning: The `Datepicker` component is deprecated and will be removed in the next major release. Please the `DateRangePicker` component instead.",
  );

  const today = startOfToday();

  const datePickerRef = useRef(null);
  const dropdownRef = useRef(null);

  defaultStartDate = defaultRelativeFilterOption
    ? getStartDateFromRelativeFilterOption(defaultRelativeFilterOption)
    : defaultStartDate;

  defaultEndDate = defaultRelativeFilterOption ? today : defaultEndDate;

  const hasDefaultDateRange = defaultStartDate !== null && defaultEndDate !== null;

  const [initialStartDate, initialEndDate] = getInitialDateRange(
    defaultStartDate,
    defaultEndDate,
    minDate,
    maxDate,
    hasDefaultDateRange,
  );

  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showDropdownModal, setShowDropdownModal] = useState(false);

  const [selectedRelativeFilterOption, setSelectedRelativeFilterOption] =
    useState<RelativeFilterOption>(
      enableRelativeDates && defaultRelativeFilterOption ? defaultRelativeFilterOption : null,
    );

  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

  const [selectedStartDay, setSelectedStartDay] = useState<Date | null>(initialStartDate);
  const [selectedEndDay, setSelectedEndDay] = useState<Date | null>(initialEndDate);

  // determines which month is shown when Datepicker modal is opened
  const [currentMonth, setCurrentMonth] = useState(getInitialCurrentMonth(initialEndDate, maxDate));

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const lastDayCurrentMonth = endOfMonth(firstDayCurrentMonth);

  const daysInCurrentMonth = eachDayOfInterval({
    start: isSunday(firstDayCurrentMonth)
      ? firstDayCurrentMonth
      : previousSunday(firstDayCurrentMonth),
    end: isSaturday(lastDayCurrentMonth) ? lastDayCurrentMonth : nextSaturday(lastDayCurrentMonth),
  });

  const handleDayClick = (day: Date) => {
    if (!selectedStartDay) {
      setSelectedStartDay(day);
    } else if (selectedStartDay && !selectedEndDay) {
      if (day < selectedStartDay) {
        setSelectedStartDay(day);
        // Selection complete
      } else {
        handleSelect?.(selectedStartDay, day);
        setSelectedEndDay(day);
        setShowDatePickerModal(false);
        setSelectedRelativeFilterOption(null); // Clear relative filter
      }
    } else if (selectedStartDay && selectedEndDay) {
      setSelectedStartDay(day);
      setSelectedEndDay(null);
    }
  };

  const handleRelativeFilterOptionClick = (selectedRelativeFilterOption: RelativeFilterOption) => {
    const startDate = getStartDateFromRelativeFilterOption(selectedRelativeFilterOption);
    const endDate = today;

    handleSelect?.(startDate, endDate);

    setSelectedStartDay(startDate);
    setSelectedEndDay(endDate);
    setCurrentMonth(format(endDate, "MMM-yyyy"));
  };

  const showSelectionText = selectedStartDay !== null;
  const selectionText = showSelectionText
    ? String(displaySelected(selectedStartDay, selectedEndDay))
    : placeholder;

  return (
    <div
      className={clsx(
        "tremor-base relative w-full",
        parseMarginTop(marginTop),
        parseMaxWidth(maxWidth),
      )}
    >
      <DatepickerButton
        datePickerRef={datePickerRef}
        dropdownRef={dropdownRef}
        showDatePickerModal={showDatePickerModal}
        setShowDatePickerModal={setShowDatePickerModal}
        showDropdownModal={showDropdownModal}
        setShowDropdownModal={setShowDropdownModal}
        enableRelativeDates={enableRelativeDates}
        selectedRelativeFilterOption={selectedRelativeFilterOption}
        showSelectionText={showSelectionText}
        selectionText={selectionText}
      />
      <Modal
        showModal={showDatePickerModal}
        setShowModal={setShowDatePickerModal}
        triggerRef={datePickerRef}
        width="w-72"
        maxHeight="max-h-fit"
      >
        <div
          className={clsx(
            spacing.lg.paddingLeft,
            spacing.lg.paddingRight,
            spacing.twoXs.paddingTop,
            spacing.twoXs.paddingBottom,
          )}
        >
          <DatepickerHeader
            enableYearPagination={enableYearPagination}
            firstDayCurrentMonth={firstDayCurrentMonth}
            setCurrentMonth={setCurrentMonth}
          />
          <DatepickerBody
            daysInCurrentMonth={daysInCurrentMonth}
            minDate={minDate}
            maxDate={maxDate}
            firstDayCurrentMonth={firstDayCurrentMonth}
            lastDayCurrentMonth={lastDayCurrentMonth}
            handleDayClick={handleDayClick}
            selectedStartDay={selectedStartDay}
            selectedEndDay={selectedEndDay}
            hoveredDay={hoveredDay}
            setHoveredDay={setHoveredDay}
            color={color}
          />
        </div>
      </Modal>
      <Modal
        showModal={showDropdownModal}
        setShowModal={setShowDropdownModal}
        triggerRef={dropdownRef}
      >
        {relativeFilterOptions.map(
          ({ value, name }: { value: RelativeFilterOption; name: string }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setSelectedRelativeFilterOption(value);
                handleRelativeFilterOptionClick(value);
                setShowDropdownModal(false);
              }}
              className={clsx(
                "input-elem flex items-center justify-between w-full truncate",
                spacing.twoXl.paddingLeft,
                spacing.twoXl.paddingRight,
                spacing.md.paddingTop,
                spacing.md.paddingBottom,
                fontSize.sm,
                selectedRelativeFilterOption === value
                  ? clsx(
                      getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
                      getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor,
                    )
                  : clsx(
                      getColorVariantsFromColorThemeValue(defaultColors.lightBackground)
                        .hoverBgColor,
                      getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                    ),
              )}
            >
              <p className="text-elem whitespace-nowrap truncate">{name}</p>
            </button>
          ),
        )}
      </Modal>
    </div>
  );
};

export default Datepicker;
