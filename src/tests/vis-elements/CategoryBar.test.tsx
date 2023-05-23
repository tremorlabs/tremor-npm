/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import CategoryBar from "components/vis-elements/CategoryBar/CategoryBar";

describe("CategoryBar", () => {
  test("renders the CategoryBar component with default props", () => {
    render(<CategoryBar categoryPercentageValues={[10, 25, 45, 20]} />);
  });
});
