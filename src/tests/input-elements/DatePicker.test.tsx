import { render, screen, cleanup } from "@testing-library/react";
import DatePicker from "components/input-elements/DatePicker/DatePicker";
import React from "react";

describe("DatePicker", () => {
  afterEach(cleanup);
  test("renders the DatePicker component with default props", () => {
    render(<DatePicker />);
  });

  test("renders the DatePicker component with customized placeholder", () => {
    const placeholder = "Select date...";
    render(<DatePicker placeholder={placeholder} />);
    expect(screen.queryByText(placeholder)).toBeTruthy();
  });

  test("renders the DatePicker component with custom default value", () => {
    const defaultValue = new Date("2021-01-01");
    render(<DatePicker defaultValue={defaultValue} />);
    expect(screen.queryByText("2021", { exact: false })).toBeTruthy();
  });
});
