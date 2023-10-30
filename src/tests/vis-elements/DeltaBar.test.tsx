/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";

import DeltaBar from "components/vis-elements/DeltaBar/DeltaBar";

describe("DeltaBar", () => {
  test("renders the DeltaBar component with default props", () => {
    render(<DeltaBar value={50} />);
  });
});
