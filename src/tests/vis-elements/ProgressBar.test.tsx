/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import ProgressBar from "components/vis-elements/ProgressBar/ProgressBar";

describe("ProgressBar", () => {
  test("renders the ProgressBar component with default props", () => {
    render(<ProgressBar value={50} />);
  });
});
