import { render } from "@testing-library/react";
import React from "react";

import Legend from "components/text-elements/Legend/Legend";

describe("Legend", () => {
  test("renders the Legend component with default props", () => {
    render(<Legend categories={["Category A", "Category B", "Category C", "Category D"]} />);
  });
});
