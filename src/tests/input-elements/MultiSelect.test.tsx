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

  test("renders with the Icon as ElementType", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <MultiSelect icon={Icon}>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders with the Icon as ReactElement", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <MultiSelect icon={<Icon />}>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );
    expect(screen.queryByTestId("icon")).toBeTruthy();
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
