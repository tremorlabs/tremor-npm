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
  defaultColors,
  fontSize,
  fontWeight,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";
import { capitalize, getDateStyles, getWeekdays } from "./dateRangePickerUtils";

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
  locale: Locale;
}

const CalendarHeader = ({
  enableYearPagination,
  anchorDate,
  setAnchorDate,
  locale,
}: CalendarHeaderProps) => {
  const handlePaginationClick = (type: "nextMonth" | "prevMonth" | "nextYear" | "prevYear") => {
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

  const displayedTitle = capitalize(format(anchorDate, "MMMM yyyy", { locale }), locale);

  return (
    <div
      className={twMerge(
        "flex justify-between items-center",
        spacing.twoXs.paddingX,
        spacing.sm.paddingY,
      )}
    >
      <div className="flex items-center space-x-1">
        <button
          type="button"
          hidden={!enableYearPagination}
          className={twMerge(
            "inline-flex focus:outline-none focus:ring-2",
            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
            getColorVariantsFromColorThemeValue(defaultColors.ring).focusRingColor,
            spacing.twoXs.paddingAll,
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
              getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
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
            "inline-flex focus:outline-none focus:ring-2",
            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
            getColorVariantsFromColorThemeValue(defaultColors.ring).focusRingColor,
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
              getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
              sizing.lg.height,
              sizing.lg.width,
            )}
            aria-hidden="true"
          />
        </button>
      </div>
      <h2
        className={twMerge(
          "text-elem",
          getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor,
          fontSize.sm,
          fontWeight.lg,
        )}
      >
        {displayedTitle}
      </h2>
      <div className="flex items-center space-x-1">
        <button
          type="button"
          name="nextMonth"
          className={twMerge(
            "inline-flex focus:outline-none focus:ring-2",
            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
            getColorVariantsFromColorThemeValue(defaultColors.ring).focusRingColor,
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
              getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
              sizing.lg.height,
              sizing.lg.width,
            )}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          hidden={!enableYearPagination}
          className={twMerge(
            "inline-flex focus:outline-none focus:ring-2",
            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
            getColorVariantsFromColorThemeValue(defaultColors.ring).focusRingColor,
            spacing.twoXs.paddingAll,
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
          "grid grid-cols-7 text-center",
          getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
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
      <div className="grid grid-cols-7">
        {displayedDates.map((date) => {
          const isCurrentDateDisabled = isDateDisabled(
            date,
            minDate,
            maxDate,
            firstDayOfDisplayedMonth,
            lastDayOfDisplayedMonth,
          );

          return (
            <div key={date.toString()} className={twMerge(colStartClasses[getDay(date)], "w-full")}>
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
  setAnchorDate: Dispatch<SetStateAction<Date>>;
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
  setAnchorDate,
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
        setAnchorDate={setAnchorDate}
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
