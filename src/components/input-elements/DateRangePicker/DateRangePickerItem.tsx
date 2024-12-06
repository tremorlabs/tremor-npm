"use client";
import React from "react";

import { SelectItem } from "../Select";

export interface DateRangePickerItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  from: Date;
  to?: Date;
}

const DateRangePickerItem = React.forwardRef<HTMLDivElement, DateRangePickerItemProps>(
  (props, ref) => {
    const { value, className, children, ...other } = props;

    return (
      <SelectItem ref={ref} className={className} value={value} {...other}>
        {children ?? value}
      </SelectItem>
    );
  },
);

DateRangePickerItem.displayName = "DateRangePickerItem";

export default DateRangePickerItem;
