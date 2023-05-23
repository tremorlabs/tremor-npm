/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import DeltaBar from "components/vis-elements/DeltaBar/DeltaBar";

describe("DeltaBar", () => {
  test("renders the DeltaBar component with default props", () => {
    render(<DeltaBar percentageValue={50} />);
  });
});
