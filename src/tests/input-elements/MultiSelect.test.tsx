import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

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

  test("renders the MultiSelect component with customized placeholder", () => {
    const placeholder = "Select options...";
    const { getByText } = render(
      <MultiSelect placeholder={placeholder}>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );

    expect(getByText(placeholder)).toBeTruthy();
  });

  test("renders the MultiSelect component with customized icon", () => {
    const IconText = "Icon";
    const { getByText } = render(
      <MultiSelect icon={() => <div>{IconText}</div>}>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );

    expect(getByText(IconText)).toBeTruthy();
  });

  test("renders the MultiSelect component with default value", () => {
    const placeholder = "Select options...";

    const { getByText, queryByText } = render(
      <MultiSelect defaultValue={["2"]} placeholder={placeholder}>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );

    expect(queryByText(placeholder)).toBeNull();
    fireEvent.click(screen.getByRole("select-input"));
    expect(getByText("1").previousElementSibling).toHaveProperty("checked", false);
    expect(getByText("Option Two").previousElementSibling).toHaveProperty("checked", true);
    expect(getByText("Option Three").previousElementSibling).toHaveProperty("checked", false);
  });

  test("renders the MultiSelect component with customized values", () => {
    const { getByText } = render(
      <MultiSelect value={["2", "3"]}>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );

    fireEvent.click(screen.getByRole("select-input"));
    expect(getByText("1").previousElementSibling).toHaveProperty("checked", false);
    expect(getByText("Option Two").previousElementSibling).toHaveProperty("checked", true);
    expect(getByText("Option Three").previousElementSibling).toHaveProperty("checked", true);
  });

  test("renders the MultiSelect component and selects an item", () => {
    const placeholder = "Select options...";
    const { getByText } = render(
      <MultiSelect placeholder={placeholder}>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );

    fireEvent.click(screen.getByRole("select-input"));
    expect(getByText("1").previousElementSibling).toHaveProperty("checked", false);
    expect(getByText("Option Two").previousElementSibling).toHaveProperty("checked", false);
    expect(getByText("Option Three").previousElementSibling).toHaveProperty("checked", false);

    fireEvent.click(getByText("1"));
    expect(getByText("1").previousElementSibling).toHaveProperty("checked", true);
    expect(getByText("Option Two").previousElementSibling).toHaveProperty("checked", false);
    expect(getByText("Option Three").previousElementSibling).toHaveProperty("checked", false);
  });

  test("renders the MultiSelect component and selects multiple items", () => {
    const placeholder = "Select options...";
    const { getByText } = render(
      <MultiSelect placeholder={placeholder}>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );

    fireEvent.click(screen.getByRole("select-input"));
    expect(getByText("1").previousElementSibling).toHaveProperty("checked", false);
    expect(getByText("Option Two").previousElementSibling).toHaveProperty("checked", false);
    expect(getByText("Option Three").previousElementSibling).toHaveProperty("checked", false);

    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("Option Two"));
    expect(getByText("1").previousElementSibling).toHaveProperty("checked", true);
    expect(getByText("Option Two").previousElementSibling).toHaveProperty("checked", true);
    expect(getByText("Option Three").previousElementSibling).toHaveProperty("checked", false);
  });

  test("renders the MultiSelect component and selects multiple items with onValueChange", () => {
    const placeholder = "Select options...";

    const onValueChange = jest.fn();
    const { getByText } = render(
      <MultiSelect onValueChange={onValueChange} placeholder={placeholder}>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );

    fireEvent.click(screen.getByRole("select-input"));
    expect(getByText("1").previousElementSibling).toHaveProperty("checked", false);
    expect(getByText("Option Two").previousElementSibling).toHaveProperty("checked", false);
    expect(getByText("Option Three").previousElementSibling).toHaveProperty("checked", false);

    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("Option Two"));
    expect(getByText("1").previousElementSibling).toHaveProperty("checked", true);
    expect(getByText("Option Two").previousElementSibling).toHaveProperty("checked", true);
    expect(getByText("Option Three").previousElementSibling).toHaveProperty("checked", false);

    expect(onValueChange).toHaveBeenCalledTimes(2);
  });

  test("renders the disabled MultiSelect component", () => {
    const placeholder = "Select options...";
    const disabled = true;
    const { getByText, queryByText } = render(
      <MultiSelect disabled={disabled} placeholder={placeholder}>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );

    expect(getByText(placeholder)).toBeTruthy();
    fireEvent.click(screen.getByRole("select-input"));

    expect(queryByText("1")).toBeNull();
    expect(queryByText("Option Two")).toBeNull();
    expect(queryByText("Option Three")).toBeNull();
    expect(queryByText(placeholder)).toBeTruthy();
  });
});
