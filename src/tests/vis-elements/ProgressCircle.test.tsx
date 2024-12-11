import { render } from "@testing-library/react";
import React from "react";

import { ProgressCircle } from "components";

describe("ProgressCircle", () => {
  test("renders the ProgressCircle component with default props", () => {
    render(<ProgressCircle value={50} />);
  });
});
