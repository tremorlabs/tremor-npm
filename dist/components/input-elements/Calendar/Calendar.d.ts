import React from "react";
import { DayPickerRangeProps, DayPickerSingleProps } from "react-day-picker";
declare function Calendar<T extends DayPickerSingleProps | DayPickerRangeProps>({ mode, defaultMonth, selected, onSelect, locale, disabled, enableYearNavigation, classNames, weekStartsOn, ...other }: T & {
    enableYearNavigation: boolean;
}): React.JSX.Element;
declare namespace Calendar {
    var displayName: string;
}
export default Calendar;
