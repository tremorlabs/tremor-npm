import { render } from "@testing-library/react";
import React from "react";

import { Tracker } from "components";

describe("Tracker", () => {
  test("renders the Tracker component with default props", () => {
    render(<Tracker data={[{ color: "green" }, { color: "green" }]} />);
  });
});
