import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { MultiSelect, MultiSelectItem } from "components";

describe("MultiSelect", () => {
  test("renders the MultiSelect component with default props", () => {
    render(
      <MultiSelect>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );
  });

  test("renders the MultiSelect component with static and dynamic children", () => {
    const placeholder = "Select options...";
    const items = ["item1", "item2"];
    render(
      <MultiSelect data-testid="first-select" placeholder={placeholder}>
        <MultiSelectItem value="item0">item0</MultiSelectItem>
        {items.map((item) => {
          return <MultiSelectItem value={item} key={item} />;
        })}
      </MultiSelect>,
    );

    fireEvent.click(screen.getByTestId("first-select"));

    expect(screen.queryAllByText("item0")).toBeTruthy();
    expect(screen.queryAllByText("item1")).toBeTruthy();
    expect(screen.queryAllByText("item2")).toBeTruthy();
  });
});
