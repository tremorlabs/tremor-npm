import { fireEvent, render, screen } from "@testing-library/react";
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

  test("renders the SelectItem component with Icon as ElementType", async () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    const placeholder = "Select...";
    render(
      <Select placeholder={placeholder}>
        <SelectItem value={"5"} icon={Icon} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );
    expect(screen.queryByTestId("icon")).not.toBeTruthy();
    // Need to click the interactive component
    fireEvent.click(screen.getAllByText(placeholder)[1]);
    expect(await screen.findByTestId("icon")).toBeTruthy();
  });

  test("renders the SelectItem component with Icon as ReactElement", async () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    const placeholder = "Select...";
    render(
      <Select placeholder={placeholder}>
        <SelectItem value={"5"} icon={<Icon />} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );
    expect(screen.queryByTestId("icon")).not.toBeTruthy();
    // Need to click the interactive component
    fireEvent.click(screen.getAllByText(placeholder)[1]);
    expect(await screen.findByTestId("icon")).toBeTruthy();
  });

  test("renders the Select component with static and dynamic children", () => {
    const placeholder = "Select options...";
    const items = ["item1", "item2"];
    render(
      <Select data-testid="first-select" placeholder={placeholder}>
        <SelectItem value="item0">item0</SelectItem>
        {items.map((item) => {
          return <SelectItem value={item} key={item} />;
        })}
      </Select>,
    );

    fireEvent.click(screen.getByTestId("first-select"));

    expect(screen.queryAllByText("item0")).toBeTruthy();
    expect(screen.queryAllByText("item1")).toBeTruthy();
    expect(screen.queryAllByText("item2")).toBeTruthy();
  });
});
