/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";

import MarkerBar from "components/vis-elements/MarkerBar/MarkerBar";

describe("MarkerBar", () => {
  test("renders the MarkerBar component with default props", () => {
    render(<MarkerBar value={50} />);
  });
});
