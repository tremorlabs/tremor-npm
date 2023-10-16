import { render, screen } from "@testing-library/react";
import React from "react";

import MultiSelect from "components/input-elements/MultiSelect/MultiSelect";
import MultiSelectItem from "components/input-elements/MultiSelect/MultiSelectItem";

describe("SelectBox", () => {
  test("renders the SelectBox component with default props", () => {
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
});
