import { render, screen } from "@testing-library/react";
import React from "react";

import Select from "components/input-elements/Select/Select";
import SelectItem from "components/input-elements/Select/SelectItem";

describe("Select", () => {
  test("renders the Select component with default props", () => {
    render(
      <Select>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );
  });

  test("renders the Select component with Icon as JSXElementConstructor", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <Select icon={Icon}>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders the Select component with Icon as ReactElement", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <Select icon={<Icon />}>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });
});
