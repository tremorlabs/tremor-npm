import { render, screen, cleanup } from "@testing-library/react";
import DateRangePicker from "components/input-elements/DateRangePicker/DateRangePicker";
import React from "react";

describe("DateRangePicker", () => {
  afterEach(cleanup);
  test("renders the DateRangePicker component with default props", () => {
    render(<DateRangePicker />);
  });

  test("renders the DateRangePicker component with customized placeholder", () => {
    const placeholder = "Select date...";
    render(<DateRangePicker placeholder={placeholder} />);
    expect(screen.queryByText(placeholder)).toBeTruthy();
  });

  test("renders the DateRangePicker component with custom default value", () => {
    const defaultValue = { from: new Date("2021-01-01"), to: new Date("2021-01-02") };
    render(<DateRangePicker defaultValue={defaultValue} />);
    expect(screen.queryByText("2021", { exact: false })).toBeTruthy();
  });
});
