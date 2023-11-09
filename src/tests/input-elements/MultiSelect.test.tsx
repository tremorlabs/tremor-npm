import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import MultiSelect from "components/input-elements/MultiSelect/MultiSelect";
import MultiSelectItem from "components/input-elements/MultiSelect/MultiSelectItem";

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
      <MultiSelect placeholder={placeholder}>
        <MultiSelectItem value="item0">item0</MultiSelectItem>
        {items.map((item) => {
          return <MultiSelectItem value={item} key={item} />;
        })}
      </MultiSelect>,
    );

    fireEvent.click(screen.getByText(placeholder));

    expect(screen.queryByText("item0")).toBeTruthy();
    expect(screen.queryByText("item1")).toBeTruthy();
    expect(screen.queryByText("item2")).toBeTruthy();
  });
});
