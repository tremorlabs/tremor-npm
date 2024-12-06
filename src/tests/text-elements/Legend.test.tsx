import { fireEvent, render } from "@testing-library/react";
import React from "react";

import Legend from "components/text-elements/Legend/Legend";

describe("Legend", () => {
  test("renders the Legend component with default props", () => {
    render(<Legend categories={["Category A", "Category B", "Category C", "Category D"]} />);
  });
  it("renders the correct legend items", () => {
    const { getByText } = render(
      <Legend categories={["Category A", "Category B", "Category C", "Category D"]} />,
    );
    expect(getByText("Category A")).toBeDefined();
    expect(getByText("Category B")).toBeDefined();
    expect(getByText("Category C")).toBeDefined();
    expect(getByText("Category D")).toBeDefined();
  });
  it("clicks a category item", () => {
    const { getByText } = render(<Legend categories={["Category A"]} />);
    fireEvent.click(getByText("Category A"));
  });
  it("tests the keydown handler", () => {
    render(<Legend categories={["Category A"]} enableLegendSlider={true} />);
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    document.dispatchEvent(event);
  });
});
