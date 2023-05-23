import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
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
  fontSize,
  fontWeight,
  getColorClassNames,
  sizing,
  spacing,
} from "lib";
import { capitalize, getDateStyles, getWeekdays } from "./dateRangePickerUtils";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { makeDateRangePickerClassName } from "./dateRangePickerUtils";

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
  setStartOfCurrMonth: Dispatch<SetStateAction<Date | null>>;
  locale: Locale;
}

const CalendarHeader = ({
  enableYearPagination,
  anchorDate,
  setStartOfCurrMonth,
  locale,
}: CalendarHeaderProps) => {
  const firstDayOfMonth = startOfMonth(anchorDate);
  const handlePaginationClick = (type: "nextMonth" | "prevMonth" | "nextYear" | "prevYear") => {
    switch (type) {
      case "nextMonth":
        setStartOfCurrMonth(add(firstDayOfMonth, { months: 1 }));
        break;
      case "prevMonth":
        setStartOfCurrMonth(add(firstDayOfMonth, { months: -1 }));
        break;
      case "nextYear":
        setStartOfCurrMonth(add(firstDayOfMonth, { years: 1 }));
        break;
      case "prevYear":
        setStartOfCurrMonth(add(firstDayOfMonth, { years: -1 }));
        break;
    }
  };

  const displayedTitle = capitalize(format(firstDayOfMonth, "MMMM yyyy", { locale }), locale);

  return (
    <div
      className={twMerge(
        makeDateRangePickerClassName("calendarHeader"),
        "flex justify-between items-center",
        spacing.twoXs.paddingX,
        spacing.sm.paddingY,
      )}
    >
      <div
        className={twMerge(
          makeDateRangePickerClassName("calendarHeaderPrevSelection"),
          "flex items-center space-x-1",
        )}
      >
        <button
          type="button"
          className={twMerge(
            makeDateRangePickerClassName("calendarHeaderPrevYearButton"),
            "inline-flex focus:outline-none focus:ring-2",
            !enableYearPagination && "hidden",
            getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).hoverBgColor,
            getColorClassNames(DEFAULT_COLOR, colorPalette.ring).borderColor,
            getColorClassNames("blue", colorPalette.lightRing).focusRingColor,
            spacing.twoXs.paddingAll,
            spacing.px.marginRight,
            fontSize.sm,
            fontWeight.md,
            borderRadius.sm.all,
            border.sm.all,
            boxShadow.sm,
          )}
          onClick={() => handlePaginationClick("prevYear")}
        >
          <DoubleArrowLeftHeadIcon
            className={twMerge(
              makeDateRangePickerClassName("calendarHeaderPrevYearIcon"),
              getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
              sizing.lg.height,
              sizing.lg.width,
            )}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          name="prevMonth"
          className={twMerge(
            makeDateRangePickerClassName("calendarHeaderPrevMonthButton"),
            "inline-flex focus:outline-none focus:ring-2",
            getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).hoverBgColor,
            getColorClassNames(DEFAULT_COLOR, colorPalette.ring).borderColor,
            getColorClassNames("blue", colorPalette.lightRing).focusRingColor,
            spacing.twoXs.paddingAll,
            fontSize.sm,
            fontWeight.md,
            borderRadius.sm.all,
            border.sm.all,
            boxShadow.sm,
          )}
          onClick={() => handlePaginationClick("prevMonth")}
        >
          <ArrowLeftHeadIcon
            className={twMerge(
              makeDateRangePickerClassName("calendarHeaderPrevMonthIcon"),
              getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
              sizing.lg.height,
              sizing.lg.width,
            )}
            aria-hidden="true"
          />
        </button>
      </div>
      <h2
        className={twMerge(
          makeDateRangePickerClassName("calendarHeaderText"),
          "text-elem",
          getColorClassNames(DEFAULT_COLOR, colorPalette.darkestText).textColor,
          fontSize.sm,
          fontWeight.lg,
        )}
      >
        {displayedTitle}
      </h2>
      <div
        className={twMerge(
          makeDateRangePickerClassName("calendarHeaderNextSelection"),
          "flex items-center space-x-1",
        )}
      >
        <button
          type="button"
          name="nextMonth"
          className={twMerge(
            makeDateRangePickerClassName("calendarHeaderNextMonthButton"),
            "inline-flex focus:outline-none focus:ring-2",
            getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).hoverBgColor,
            getColorClassNames(DEFAULT_COLOR, colorPalette.ring).borderColor,
            getColorClassNames("blue", colorPalette.lightRing).focusRingColor,
            spacing.twoXs.paddingAll,
            fontSize.sm,
            fontWeight.md,
            borderRadius.sm.all,
            border.sm.all,
            boxShadow.sm,
          )}
          onClick={() => handlePaginationClick("nextMonth")}
        >
          <ArrowRightHeadIcon
            className={twMerge(
              makeDateRangePickerClassName("calendarHeaderNextMonthIcon"),
              getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
              sizing.lg.height,
              sizing.lg.width,
            )}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          className={twMerge(
            makeDateRangePickerClassName("calendarHeaderNextYearButton"),
            "inline-flex focus:outline-none focus:ring-2",
            !enableYearPagination && "hidden",
            getColorClassNames(DEFAULT_COLOR, colorPalette.canvasBackground).hoverBgColor,
            getColorClassNames(DEFAULT_COLOR, colorPalette.ring).borderColor,
            getColorClassNames("blue", colorPalette.lightRing).focusRingColor,
            spacing.twoXs.paddingAll,
            spacing.px.marginLeft,
            fontSize.sm,
            fontWeight.md,
            borderRadius.sm.all,
            border.sm.all,
            boxShadow.sm,
          )}
          onClick={() => handlePaginationClick("nextYear")}
        >
          <DoubleArrowRightHeadIcon
            className={twMerge(
              makeDateRangePickerClassName("calendarHeaderNextYearIcon"),
              "shrink-0 flex-0",
              getColorClassNames(DEFAULT_COLOR, colorPalette.darkText).textColor,
              sizing.lg.height,
              sizing.lg.width,
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
  locale: Locale;
}

const CalendarBody = ({
  anchorDate,
  selectedStartDate,
  selectedEndDate,
  onDateClick,
  minDate,
  maxDate,
  locale,
}: CalendarBodyProps) => {
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();
  const color = useContext(BaseColorContext);

  const firstDayOfDisplayedMonth = startOfMonth(anchorDate);
  const lastDayOfDisplayedMonth = endOfMonth(anchorDate);

  const weekdays = getWeekdays(locale).map((dayName) => capitalize(dayName, locale));

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
    lastDayDisplayedMonth: Date,
  ) => {
    const isDateInDisplayedMonth = date >= firstDayDisplayedMonth && date <= lastDayDisplayedMonth;
    return (
      (minDate !== null && date < minDate) ||
      (maxDate !== null && date > maxDate) ||
      !isDateInDisplayedMonth
    );
  };

  return (
    <>
      <div
        className={twMerge(
          makeDateRangePickerClassName("calendarBodyWeekdays"),
          "grid grid-cols-7 text-center",
          getColorClassNames(DEFAULT_COLOR, colorPalette.ring).textColor,
          fontSize.xs,
          fontWeight.md,
        )}
      >
        {weekdays.map((dayName) => (
          <div key={dayName} className="w-full flex justify-center">
            <div
              className={twMerge("flex items-center justify-center w-full", sizing.threeXl.height)}
            >
              {dayName}
            </div>
          </div>
        ))}
      </div>
      <div
        className={twMerge(
          makeDateRangePickerClassName("calendarBodyDatesGrid"),
          "grid grid-cols-7",
        )}
      >
        {displayedDates.map((date) => {
          const isCurrentDateDisabled = isDateDisabled(
            date,
            minDate,
            maxDate,
            firstDayOfDisplayedMonth,
            lastDayOfDisplayedMonth,
          );

          return (
            <div
              key={date.toString()}
              className={twMerge(
                makeDateRangePickerClassName("calendarBodyDate"),
                colStartClasses[getDay(date)],
                "w-full",
              )}
            >
              <button
                type="button"
                onClick={() => onDateClick(date)}
                onPointerEnter={() => setHoveredDate?.(date)}
                onPointerLeave={() => setHoveredDate?.(undefined)}
                className={twMerge(
                  "w-full flex items-center justify-center",
                  sizing.threeXl.height,
                  fontSize.sm,
                  getDateStyles(
                    date,
                    selectedStartDate,
                    selectedEndDate,
                    hoveredDate,
                    isCurrentDateDisabled,
                    color,
                  ),
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
  setStartOfCurrMonth: Dispatch<SetStateAction<Date | null>>;
  startDate: Date | null;
  endDate: Date | null;
  minDate: Date | null;
  maxDate: Date | null;
  onDateClick: (date: Date) => void;
  locale: Locale;
}

const Calendar = ({
  enableYearPagination,
  anchorDate,
  setStartOfCurrMonth,
  startDate,
  endDate,
  minDate,
  maxDate,
  onDateClick,
  locale,
}: CalendarProps) => {
  return (
    <div className={twMerge(spacing.lg.paddingX, spacing.twoXs.paddingY)}>
      <CalendarHeader
        enableYearPagination={enableYearPagination}
        anchorDate={anchorDate}
        setStartOfCurrMonth={setStartOfCurrMonth}
        locale={locale}
      />
      <CalendarBody
        anchorDate={anchorDate}
        selectedStartDate={startDate}
        selectedEndDate={endDate}
        onDateClick={onDateClick}
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
      />
    </div>
  );
};

export default Calendar;
