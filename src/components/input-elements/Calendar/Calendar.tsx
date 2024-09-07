"use client";
import React from "react";
import {
  DayPicker,
  DayPickerRangeProps,
  DayPickerSingleProps,
  useNavigation,
} from "react-day-picker";

import {
  ArrowLeftHeadIcon,
  ArrowRightHeadIcon,
  DoubleArrowLeftHeadIcon,
  DoubleArrowRightHeadIcon,
} from "assets";
import { addYears, format } from "date-fns";
import { Text } from "../../text-elements/Text";
import { NavButton } from "./NavButton";

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
      selected={selected}
      onSelect={onSelect as any}
      locale={locale}
      disabled={disabled}
      weekStartsOn={weekStartsOn}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-2 relative items-center",
        caption_label:
          "text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium",
        nav: "space-x-1 flex items-center",
        nav_button:
          "flex items-center justify-center p-1 h-7 w-7 outline-none focus:ring-2 transition duration-100 border border-tremor-border dark:border-dark-tremor-border hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted rounded-tremor-small focus:border-tremor-brand-subtle dark:focus:border-dark-tremor-brand-subtle focus:ring-tremor-brand-muted dark:focus:ring-dark-tremor-brand-muted text-tremor-content-subtle dark:text-dark-tremor-content-subtle hover:text-tremor-content dark:hover:text-dark-tremor-content",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "w-9 font-normal text-center text-tremor-content-subtle dark:text-dark-tremor-content-subtle",
        row: "flex w-full mt-0.5",
        cell: "text-center p-0 relative focus-within:relative text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis",
        day: "h-9 w-9 p-0 hover:bg-tremor-background-subtle dark:hover:bg-dark-tremor-background-subtle outline-tremor-brand dark:outline-dark-tremor-brand rounded-tremor-default",
        day_today: "font-bold",
        day_selected:
          "aria-selected:bg-tremor-background-emphasis aria-selected:text-tremor-content-inverted dark:aria-selected:bg-dark-tremor-background-emphasis dark:aria-selected:text-dark-tremor-content-inverted ",
        day_disabled:
          "text-tremor-content-subtle dark:text-dark-tremor-content-subtle disabled:hover:bg-transparent",
        day_outside: "text-tremor-content-subtle dark:text-dark-tremor-content-subtle",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ArrowLeftHeadIcon className="h-4 w-4" {...props} />,
        IconRight: ({ ...props }) => <ArrowRightHeadIcon className="h-4 w-4" {...props} />,
        Caption: ({ ...props }) => {
          const { goToMonth, nextMonth, previousMonth, currentMonth } = useNavigation();

          return (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                {enableYearNavigation && (
                  <NavButton
                    onClick={() => currentMonth && goToMonth(addYears(currentMonth, -1))}
                    icon={DoubleArrowLeftHeadIcon}
                  />
                )}
                <NavButton
                  onClick={() => previousMonth && goToMonth(previousMonth)}
                  icon={ArrowLeftHeadIcon}
                />
              </div>

              <Text className="text-tremor-default tabular-nums capitalize text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis font-medium">
                {format(props.displayMonth, "LLLL yyy", { locale })}
              </Text>

              <div className="flex items-center space-x-1">
                <NavButton
                  onClick={() => nextMonth && goToMonth(nextMonth)}
                  icon={ArrowRightHeadIcon}
                />
                {enableYearNavigation && (
                  <NavButton
                    onClick={() => currentMonth && goToMonth(addYears(currentMonth, 1))}
                    icon={DoubleArrowRightHeadIcon}
                  />
                )}
              </div>
            </div>
          );
        },
      }}
      {...other}
    />
  );
}

Calendar.displayName = "DateRangePicker";

export default Calendar;
