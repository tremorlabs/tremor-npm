"use client";
import React from "react";
import { DayPicker, useDayPicker, PropsSingle, PropsRange, PropsBase } from "react-day-picker";

import {
  ArrowLeftHeadIcon,
  ArrowRightHeadIcon,
  DoubleArrowLeftHeadIcon,
  DoubleArrowRightHeadIcon,
} from "assets";
import { addYears, format } from "date-fns";
import { Text } from "../../text-elements/Text";
import { NavButton } from "./NavButton";

export type DayPickerSingleProps = PropsBase & PropsSingle;
export type DayPickerRangeProps = PropsBase & PropsRange;

function Calendar<T extends DayPickerSingleProps | DayPickerRangeProps>({
  mode,
  defaultMonth,
  selected,
  onSelect,
  locale,
  disabled,
  enableYearNavigation,
  classNames,
  weekStartsOn = 0,
  ...other
}: T & { enableYearNavigation: boolean }) {
  return (
    <DayPicker
      showOutsideDays={true}
      mode={mode as any}
      defaultMonth={defaultMonth}
      selected={selected as any}
      onSelect={onSelect as any}
      locale={locale}
      disabled={disabled}
      weekStartsOn={weekStartsOn}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-2 relative items-center",
        caption_label:
          "text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium",
        nav: "space-x-1 flex items-center",
        button_previous:
          "flex items-center justify-center p-1 h-7 w-7 outline-none focus:ring-2 transition duration-100 border border-tremor-border dark:border-dark-tremor-border hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted rounded-tremor-small focus:border-tremor-brand-subtle dark:focus:border-dark-tremor-brand-subtle focus:ring-tremor-brand-muted dark:focus:ring-dark-tremor-brand-muted text-tremor-content-subtle dark:text-dark-tremor-content-subtle hover:text-tremor-content dark:hover:text-dark-tremor-content absolute left-1",
        button_next:
          "flex items-center justify-center p-1 h-7 w-7 outline-none focus:ring-2 transition duration-100 border border-tremor-border dark:border-dark-tremor-border hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted rounded-tremor-small focus:border-tremor-brand-subtle dark:focus:border-dark-tremor-brand-subtle focus:ring-tremor-brand-muted dark:focus:ring-dark-tremor-brand-muted text-tremor-content-subtle dark:text-dark-tremor-content-subtle hover:text-tremor-content dark:hover:text-dark-tremor-content absolute right-1",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "w-9 font-normal text-center text-tremor-content-subtle dark:text-dark-tremor-content-subtle",
        week: "flex w-full mt-0.5",
        day: "text-center p-0 relative focus-within:relative text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis hover:bg-tremor-background-subtle dark:hover:bg-dark-tremor-background-subtle rounded-tremor-default",
        day_button:
          "h-9 w-9 p-0 outline-tremor-brand dark:outline-dark-tremor-brand rounded-tremor-default",
        today: "font-bold",
        selected:
          "aria-selected:bg-tremor-background-emphasis aria-selected:text-tremor-content-inverted dark:aria-selected:bg-dark-tremor-background-emphasis dark:aria-selected:text-dark-tremor-content-inverted ",
        disabled:
          "text-tremor-content-subtle dark:text-dark-tremor-content-subtle disabled:hover:bg-transparent",
        outside: "text-tremor-content-subtle dark:text-dark-tremor-content-subtle",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ArrowLeftHeadIcon className="h-4 w-4" {...props} />;
          }

          return <ArrowRightHeadIcon className="h-4 w-4" {...props} />;
        },
        MonthCaption: ({ calendarMonth }) => {
          const { goToMonth, nextMonth, previousMonth } = useDayPicker();

          return (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                {enableYearNavigation && (
                  <NavButton
                    onClick={() =>
                      calendarMonth.date && goToMonth(addYears(calendarMonth.date, -1))
                    }
                    icon={DoubleArrowLeftHeadIcon}
                  />
                )}
                <NavButton
                  onClick={() => previousMonth && goToMonth(previousMonth)}
                  icon={ArrowLeftHeadIcon}
                />
              </div>

              <Text className="text-tremor-default tabular-nums capitalize text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium">
                {format(calendarMonth.date, "LLLL yyy", { locale: locale as any })}
              </Text>

              <div className="flex items-center space-x-1">
                <NavButton
                  onClick={() => nextMonth && goToMonth(nextMonth)}
                  icon={ArrowRightHeadIcon}
                />
                {enableYearNavigation && (
                  <NavButton
                    onClick={() => calendarMonth.date && goToMonth(addYears(calendarMonth.date, 1))}
                    icon={DoubleArrowRightHeadIcon}
                  />
                )}
              </div>
            </div>
          );
        },
      }}
      {...other}
      hideNavigation
    />
  );
}

Calendar.displayName = "DateRangePicker";

export default Calendar;
