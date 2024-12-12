/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import { MarkerBar } from "components";
import React from "react";

describe("MarkerBar", () => {
  test("renders the MarkerBar component with default props", () => {
    render(<MarkerBar value={50} />);
  });
});
