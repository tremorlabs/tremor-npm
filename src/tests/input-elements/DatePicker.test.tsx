import { render } from "@testing-library/react";
import React from "react";

import DatePicker from "components/input-elements/DatePicker/DatePicker";

describe("DatePicker", () => {
  test("renders the DatePicker component with default props", () => {
    render(<DatePicker />);
  });
});
