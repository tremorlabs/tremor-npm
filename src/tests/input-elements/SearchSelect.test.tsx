import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import SearchSelect from "components/input-elements/SearchSelect/SearchSelect";
import SearchSelectItem from "components/input-elements/SearchSelect/SearchSelectItem";

describe("SearchSelect", () => {
  test("renders the SearchSelect component with default props", () => {
    render(
      <SearchSelect>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );
  });

  test("renders the SelectBox component with static and dynamic children", () => {
    const placeholder = "Select options...";
    const items = ["item1", "item2"];
    render(
      <SearchSelect data-testid="first-select" placeholder={placeholder}>
        <SearchSelectItem value="item0">item0</SearchSelectItem>
        {items.map((item) => {
          return <SearchSelectItem value={item} key={item} />;
        })}
      </SearchSelect>,
    );

    fireEvent.click(screen.getByTestId("first-select"));

    expect(screen.queryAllByText("item0")).toBeTruthy();
    expect(screen.queryAllByText("item1")).toBeTruthy();
    expect(screen.queryAllByText("item2")).toBeTruthy();
  });
});
