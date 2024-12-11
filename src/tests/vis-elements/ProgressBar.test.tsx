/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import { ProgressBar } from "components";
import React from "react";

describe("ProgressBar", () => {
  test("renders the ProgressBar component with default props", () => {
    render(<ProgressBar value={50} />);
  });
});
