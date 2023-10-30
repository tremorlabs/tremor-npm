import { render } from "@testing-library/react";
import React from "react";

import Metric from "components/text-elements/Metric/Metric";

describe("Metric", () => {
  test("renders the Metric component with default props", () => {
    render(<Metric>USD 70,000.00</Metric>);
  });
});
