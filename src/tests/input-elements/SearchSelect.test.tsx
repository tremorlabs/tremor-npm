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

  test("renders with Icon as ElementType", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <SearchSelect icon={Icon}>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders with Icon as ReactElement", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <SearchSelect icon={<Icon />}>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders the SearchSelectItem component with Icon as ElementType", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <SearchSelect>
        <SearchSelectItem value="1" icon={Icon} />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );
    expect(screen.queryByTestId("icon")).not.toBeTruthy();
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders the SearchSelectItem component with Icon as ReatElement", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <SearchSelect>
        <SearchSelectItem value="1" icon={<Icon />} />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );
    expect(screen.queryByTestId("icon")).not.toBeTruthy();
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders the SearchSelect component with static and dynamic children", () => {
    const placeholder = "Select options...";
    const items = ["item1", "item2"];
    render(
      <SearchSelect placeholder={placeholder}>
        <SearchSelectItem value="item0">item0</SearchSelectItem>
        {items.map((item) => {
          return <SearchSelectItem value={item} key={item} />;
        })}
      </SearchSelect>,
    );

    fireEvent.click(screen.getByPlaceholderText(placeholder));

    expect(screen.queryByText("item0")).toBeTruthy();
    expect(screen.queryByText("item1")).toBeTruthy();
    expect(screen.queryByText("item2")).toBeTruthy();
  });
});
