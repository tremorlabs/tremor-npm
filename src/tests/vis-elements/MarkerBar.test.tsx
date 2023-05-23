/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import MarkerBar from "components/vis-elements/MarkerBar/MarkerBar";

describe("MarkerBar", () => {
  test("renders the MarkerBar component with default props", () => {
    render(<MarkerBar percentageValue={50} />);
  });
});
