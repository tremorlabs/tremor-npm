import React from "react";
import { render } from "@testing-library/react";

import Legend from "components/text-elements/Legend";

describe("Legend", () => {
  test("renders the Legend component with default props", () => {
    render(<Legend categories={["Category A", "Category B", "Category C", "Category D"]} />);
  });

  test("renders the Legend component with a click event", () => {
    render(
      <Legend
        categories={["Category A", "Category B", "Category C", "Category D"]}
        itemOnClick={(category) => {
          alert(category);
        }}
      />,
    );
  });
});
