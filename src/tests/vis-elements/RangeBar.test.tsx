/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import RangeBar from "components/vis-elements/RangeBar/RangeBar";

describe("RangeBar", () => {
  test("renders the RangeBar component with default props", () => {
    render(<RangeBar percentageValue={50} minPercentageValue={25} maxPercentageValue={75} />);
  });
});
