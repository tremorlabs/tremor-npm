import { render } from "@testing-library/react";
import { DateRangePicker, DateRangePickerItem } from "components";
import React from "react";

describe("DateRangePicker", () => {
  test("renders the DateRangePicker component with default props", () => {
    render(
      <DateRangePicker>
        <DateRangePickerItem key="one" value="one" from={new Date(2023, 0, 1)}>
          2023/1/1 - Today
        </DateRangePickerItem>
        <DateRangePickerItem
          key="two"
          value="two"
          from={new Date(2023, 0, 1)}
          to={new Date(2023, 4, 1)}
        >
          2023/1/1 - 2023/5/1
        </DateRangePickerItem>
      </DateRangePicker>,
    );
  });
});
