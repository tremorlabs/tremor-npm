import React from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";

import Select from "components/input-elements/Select/Select";
import SelectItem from "components/input-elements/Select/SelectItem";

describe("Select", () => {
  afterEach(cleanup);
  test("renders the Select component with default props", () => {
    render(
      <Select>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );
  });

  test("renders the Select component with customized placeholder", () => {
    const placeholder = "Select a number";
    const { getByText } = render(
      <Select placeholder={placeholder}>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );

    expect(getByText(placeholder)).toBeTruthy();
  });

  test("renders the Select component with customized icon", () => {
    const IconText = "Icon";
    const { getByText } = render(
      <Select icon={() => <div>{IconText}</div>}>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );

    expect(getByText(IconText)).toBeTruthy();
  });

  test("renders the Select component with default value", () => {
    const { getByText, queryByText } = render(
      <Select defaultValue={"3"}>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );

    expect(getByText("Three")).toBeTruthy();
    expect(queryByText("Four")).toBeNull();
  });

  test("renders the Select component with customized value", () => {
    const { getByText, queryByText } = render(
      <Select value={"1"}>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );

    expect(getByText("One")).toBeTruthy();
    expect(queryByText("Four")).toBeNull();
  });

  test("renders the Select component and selects an item", () => {
    const placeholder = "Select...";
    const { getByText } = render(
      <Select placeholder={placeholder}>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );

    fireEvent.click(screen.getByText(placeholder));
    fireEvent.click(screen.getByText("Three"));

    expect(getByText("Three")).toBeTruthy();
  });

  test("renders the Select component and selects an item with onValueChange", () => {
    const placeholder = "Select...";

    const onValueChange = jest.fn();
    const { getByText } = render(
      <Select onValueChange={onValueChange} placeholder={placeholder}>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );

    fireEvent.click(screen.getByText(placeholder));
    fireEvent.click(screen.getByText("Three"));

    expect(getByText("Three")).toBeTruthy();
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  test("renders the Select component and selects an item and enableClear", () => {
    const placeholder = "Select...";
    const enableClear = true;
    const onValueChange = jest.fn();
    const { getByText, queryByText } = render(
      <Select onValueChange={onValueChange} placeholder={placeholder} enableClear={enableClear}>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );

    fireEvent.click(screen.getByText(placeholder));
    fireEvent.click(screen.getByText("Three"));

    expect(getByText("Three")).toBeTruthy();

    fireEvent.click(screen.getByRole("clear-selection"));

    expect(queryByText("Three")).toBeNull();
    expect(queryByText(placeholder)).toBeTruthy();
  });

  test("renders the disabled Select component", () => {
    const placeholder = "Select...";
    const disabled = true;
    const onValueChange = jest.fn();
    render(
      <Select onValueChange={onValueChange} placeholder={placeholder} disabled={disabled}>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );

    fireEvent.click(screen.getByText(placeholder));

    expect(screen.queryByText(placeholder)).toBeTruthy();
  });
});
