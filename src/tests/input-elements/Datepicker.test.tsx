import React from "react";
import { render } from "@testing-library/react";

import { Datepicker } from "components/input-elements/Datepicker";

describe("Datepicker", () => {
  test("renders the Datepicker component with default props", () => {
    render(<Datepicker />);
  });
});
