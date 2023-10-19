import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import SelectBox from "components/input-elements/SearchSelect/SearchSelect";
import SelectBoxItem from "components/input-elements/SearchSelect/SearchSelectItem";

describe("SelectBox", () => {
  test("renders the SelectBox component with default props", () => {
    render(
      <SelectBox>
        <SelectBoxItem value="1" />
        <SelectBoxItem value="2">Option Two</SelectBoxItem>
        <SelectBoxItem value="3">Option Three</SelectBoxItem>
      </SelectBox>,
    );
  });

  test("renders with Icon as ElementType", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <SelectBox icon={Icon}>
        <SelectBoxItem value="1" />
        <SelectBoxItem value="2">Option Two</SelectBoxItem>
        <SelectBoxItem value="3">Option Three</SelectBoxItem>
      </SelectBox>,
    );
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders with Icon as ReactElement", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <SelectBox icon={<Icon />}>
        <SelectBoxItem value="1" />
        <SelectBoxItem value="2">Option Two</SelectBoxItem>
        <SelectBoxItem value="3">Option Three</SelectBoxItem>
      </SelectBox>,
    );
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders the SearchSelectItem component with Icon as ElementType", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <SelectBox>
        <SelectBoxItem value="1" icon={Icon} />
        <SelectBoxItem value="2">Option Two</SelectBoxItem>
        <SelectBoxItem value="3">Option Three</SelectBoxItem>
      </SelectBox>,
    );
    expect(screen.queryByTestId("icon")).not.toBeTruthy();
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders the SearchSelectItem component with Icon as ReatElement", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <SelectBox>
        <SelectBoxItem value="1" icon={<Icon />} />
        <SelectBoxItem value="2">Option Two</SelectBoxItem>
        <SelectBoxItem value="3">Option Three</SelectBoxItem>
      </SelectBox>,
    );
    expect(screen.queryByTestId("icon")).not.toBeTruthy();
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });
});
