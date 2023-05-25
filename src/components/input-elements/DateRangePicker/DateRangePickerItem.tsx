import React from "react";

import { DropdownItem } from "../Dropdown";

export interface DateRangePickerItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  from: Date;
  to?: Date;
}

const DateRangePickerItem = React.forwardRef<HTMLLIElement, DateRangePickerItemProps>(
  (props, ref) => {
    const { value, className, children, ...other } = props;

    return (
      <DropdownItem ref={ref} className={className} value={value} {...other}>
        {value ?? children}
      </DropdownItem>
    );
  },
);

DateRangePickerItem.displayName = "DateRangePickerItem";

export default DateRangePickerItem;
