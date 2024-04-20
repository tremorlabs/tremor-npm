import React from "react";
export interface DateRangePickerItemProps extends React.HTMLAttributes<HTMLLIElement> {
    value: string;
    from: Date;
    to?: Date;
}
declare const DateRangePickerItem: React.ForwardRefExoticComponent<DateRangePickerItemProps & React.RefAttributes<HTMLLIElement>>;
export default DateRangePickerItem;
