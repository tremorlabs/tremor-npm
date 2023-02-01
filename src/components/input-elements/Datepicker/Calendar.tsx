import React, { Dispatch, SetStateAction, useContext, useState } from "react";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSaturday,
  isSunday,
  nextSaturday,
  previousSunday,
  startOfMonth,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { BaseColorContext } from "contexts";

import {
  ArrowLeftHeadIcon,
  ArrowRightHeadIcon,
  DoubleArrowLeftHeadIcon,
  DoubleArrowRightHeadIcon,
} from "assets";

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
  spacing,
} from "lib";
import { getDateStyles } from "./dateRangePickerUtils";

export type CalendarLocale = {
  weekDays?: typeof WEEKDAYS;
  locale?: typeof enUS;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

interface CalendarHeaderProps {
  enableYearPagination: boolean;
  anchorDate: Date;
  setAnchorDate: Dispatch<SetStateAction<Date>>;
  locale?: CalendarLocale["locale"];
}

const CalendarHeader = ({
  enableYearPagination,
  anchorDate,
  setAnchorDate,
  locale,
}: CalendarHeaderProps) => {
  const handlePaginationClick = (
    type: "nextMonth" | "prevMonth" | "nextYear" | "prevYear"
  ) => {
    switch (type) {
      case "nextMonth":
        setAnchorDate(add(anchorDate, { months: 1 }));
        break;
      case "prevMonth":
        setAnchorDate(add(anchorDate, { months: -1 }));
        break;
      case "nextYear":
        setAnchorDate(add(anchorDate, { years: 1 }));
        break;
      case "prevYear":
        setAnchorDate(add(anchorDate, { years: -1 }));
        break;
    }
  };

  const displayedTitle = format(anchorDate, "MMMM yyyy", { locale });

  return (
    <div
      className={classNames(
        "tr-flex tr-justify-between tr-items-center",
        spacing.twoXs.paddingLeft,
        spacing.twoXs.paddingRight,
        spacing.sm.paddingTop,
        spacing.sm.paddingBottom
      )}
    >
      <div className="tr-flex tr-items-center tr-space-x-1">
        <button
          type="button"
          hidden={!enableYearPagination}
          className={classNames(
            "input-elem tr-inline-flex focus:tr-outline-none focus:tr-ring-2",
            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground)
              .hoverBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.border)
              .borderColor,
            getColorVariantsFromColorThemeValue(defaultColors.ring)
              .focusRingColor,
            spacing.twoXs.paddingLeft,
            spacing.twoXs.paddingRight,
            spacing.twoXs.paddingTop,
            spacing.twoXs.paddingBottom,
            fontSize.sm,
            fontWeight.md,
            borderRadius.sm.all,
            border.sm.all,
            boxShadow.sm
          )}
          onClick={() => handlePaginationClick("prevYear")}
        >
          <DoubleArrowLeftHeadIcon
            className={classNames(
              getColorVariantsFromColorThemeValue(defaultColors.darkText)
                .textColor,
              sizing.lg.height,
              sizing.lg.width
            )}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          name="prevMonth"
          className={classNames(
            "input-elem tr-inline-flex focus:tr-outline-none focus:tr-ring-2",
            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground)
              .hoverBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.border)
              .borderColor,
            getColorVariantsFromColorThemeValue(defaultColors.ring)
              .focusRingColor,
            spacing.twoXs.paddingLeft,
            spacing.twoXs.paddingRight,
            spacing.twoXs.paddingTop,
            spacing.twoXs.paddingBottom,
            fontSize.sm,
            fontWeight.md,
            borderRadius.sm.all,
            border.sm.all,
            boxShadow.sm
          )}
          onClick={() => handlePaginationClick("prevMonth")}
        >
          <ArrowLeftHeadIcon
            className={classNames(
              getColorVariantsFromColorThemeValue(defaultColors.darkText)
                .textColor,
              sizing.lg.height,
              sizing.lg.width
            )}
            aria-hidden="true"
          />
        </button>
      </div>
      <h2
        className={classNames(
          "text-elem",
          getColorVariantsFromColorThemeValue(defaultColors.darkestText)
            .textColor,
          fontSize.sm,
          fontWeight.lg
        )}
      >
        {displayedTitle}
      </h2>
      <div className="tr-flex tr-items-center tr-space-x-1">
        <button
          type="button"
          name="nextMonth"
          className={classNames(
            "input-elem tr-inline-flex focus:tr-outline-none focus:tr-ring-2",
            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground)
              .hoverBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.border)
              .borderColor,
            getColorVariantsFromColorThemeValue(defaultColors.ring)
              .focusRingColor,
            spacing.twoXs.paddingLeft,
            spacing.twoXs.paddingRight,
            spacing.twoXs.paddingTop,
            spacing.twoXs.paddingBottom,
            fontSize.sm,
            fontWeight.md,
            borderRadius.sm.all,
            border.sm.all,
            boxShadow.sm
          )}
          onClick={() => handlePaginationClick("nextMonth")}
        >
          <ArrowRightHeadIcon
            className={classNames(
              getColorVariantsFromColorThemeValue(defaultColors.darkText)
                .textColor,
              sizing.lg.height,
              sizing.lg.width
            )}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          hidden={!enableYearPagination}
          className={classNames(
            "input-elem tr-inline-flex focus:tr-outline-none focus:tr-ring-2",
            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground)
              .hoverBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.border)
              .borderColor,
            getColorVariantsFromColorThemeValue(defaultColors.ring)
              .focusRingColor,
            spacing.twoXs.paddingLeft,
            spacing.twoXs.paddingRight,
            spacing.twoXs.paddingTop,
            spacing.twoXs.paddingBottom,
            fontSize.sm,
            fontWeight.md,
            borderRadius.sm.all,
            border.sm.all,
            boxShadow.sm
          )}
          onClick={() => handlePaginationClick("nextYear")}
        >
          <DoubleArrowRightHeadIcon
            className={classNames(
              "tr-shrink-0 tr-flex-0",
              getColorVariantsFromColorThemeValue(defaultColors.darkText)
                .textColor,
              sizing.lg.height,
              sizing.lg.width
            )}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

interface CalendarBodyProps {
  anchorDate: Date;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onDateClick: (date: Date) => void;
  minDate: Date | null;
  maxDate: Date | null;
  weekDays?: CalendarLocale["weekDays"];
  locale?: CalendarLocale["locale"];
}

const CalendarBody = ({
  anchorDate,
  selectedStartDate,
  selectedEndDate,
  onDateClick,
  minDate,
  maxDate,
  weekDays = WEEKDAYS,
  locale,
}: CalendarBodyProps) => {
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();
  const color = useContext(BaseColorContext);

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

  const isDateDisabled = (
    date: Date,
    minDate: Date | null,
    maxDate: Date | null,
    firstDayDisplayedMonth: Date,
    lastDayDisplayedMonth: Date
  ) => {
    const isDateInDisplayedMonth =
      date >= firstDayDisplayedMonth && date <= lastDayDisplayedMonth;
    return (
      (minDate !== null && date < minDate) ||
      (maxDate !== null && date > maxDate) ||
      !isDateInDisplayedMonth
    );
  };

  return (
    <>
      <div
        className={classNames(
          "tr-grid tr-grid-cols-7 tr-text-center",
          getColorVariantsFromColorThemeValue(defaultColors.lightText)
            .textColor,
          fontSize.xs,
          fontWeight.md
        )}
      >
        {weekDays.map((dayName) => (
          <div key={dayName} className="tr-w-full tr-flex tr-justify-center">
            <div
              className={classNames(
                "tr-flex tr-items-center tr-justify-center tr-w-full",
                sizing.threeXl.height
              )}
            >
              {dayName}
            </div>
          </div>
        ))}
      </div>
      <div className="tr-grid tr-grid-cols-7">
        {displayedDates.map((date) => {
          const isCurrentDateDisabled = isDateDisabled(
            date,
            minDate,
            maxDate,
            firstDayOfDisplayedMonth,
            lastDayOfDisplayedMonth
          );

          return (
            <div
              key={date.toString()}
              className={classNames(colStartClasses[getDay(date)], "tr-w-full")}
            >
              <button
                type="button"
                onClick={() => onDateClick(date)}
                onPointerEnter={() => setHoveredDate?.(date)}
                onPointerLeave={() => setHoveredDate?.(undefined)}
                className={classNames(
                  "input-elem tr-w-full tr-flex tr-items-center tr-justify-center",
                  sizing.threeXl.height,
                  fontSize.sm,
                  getDateStyles(
                    date,
                    selectedStartDate,
                    selectedEndDate,
                    hoveredDate,
                    isCurrentDateDisabled,
                    color
                  )
                )}
                disabled={isCurrentDateDisabled}
              >
                <time dateTime={format(date, "yyyy-MM-dd", { locale })}>
                  {format(date, "d", { locale })}
                </time>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export interface CalendarProps {
  enableYearPagination: boolean;
  anchorDate: Date;
  setAnchorDate: Dispatch<SetStateAction<Date>>;
  startDate: Date | null;
  endDate: Date | null;
  minDate: Date | null;
  maxDate: Date | null;
  onDateClick: (date: Date) => void;
  locales?: CalendarLocale;
}

const Calendar = ({
  enableYearPagination,
  anchorDate,
  setAnchorDate,
  startDate,
  endDate,
  minDate,
  maxDate,
  onDateClick,
  locales,
}: CalendarProps) => {
  return (
    <div
      className={classNames(
        spacing.lg.paddingLeft,
        spacing.lg.paddingRight,
        spacing.twoXs.paddingTop,
        spacing.twoXs.paddingBottom
      )}
    >
      <CalendarHeader
        enableYearPagination={enableYearPagination}
        anchorDate={anchorDate}
        setAnchorDate={setAnchorDate}
        locale={locales?.locale}
      />
      <CalendarBody
        anchorDate={anchorDate}
        selectedStartDate={startDate}
        selectedEndDate={endDate}
        onDateClick={onDateClick}
        minDate={minDate}
        maxDate={maxDate}
        locale={locales?.locale}
        weekDays={locales?.weekDays}
      />
    </div>
  );
};

export default Calendar;
