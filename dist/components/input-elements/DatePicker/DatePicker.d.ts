import React from "react";
import { enUS } from "date-fns/locale";
import { Color } from "../../../lib/inputTypes";
export type Locale = typeof enUS;
export type DatePickerValue = Date | undefined;
export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue"> {
    value?: Date;
    defaultValue?: Date;
    onValueChange?: (value: DatePickerValue) => void;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    disabled?: boolean;
    color?: Color;
    locale?: Locale;
    enableClear?: boolean;
    displayFormat?: string;
    enableYearNavigation?: boolean;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    disabledDates?: Date[];
    children?: React.ReactElement[] | React.ReactElement;
}
declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLDivElement>>;
export default DatePicker;
