import { render } from "@testing-library/react";
import { DatePicker } from "components";
import React from "react";

describe("DatePicker", () => {
  test("renders the DatePicker component with default props", () => {
    render(<DatePicker />);
  });
});
