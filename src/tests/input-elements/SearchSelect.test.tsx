import React from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";

import SearchSelect from "components/input-elements/SearchSelect/SearchSelect";
import SearchSelectItem from "components/input-elements/SearchSelect/SearchSelectItem";

describe("SearchSelect", () => {
  afterEach(cleanup);
  test("renders the SearchSelect component with default props", () => {
    render(
      <SearchSelect>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );
  });

  test("renders the SearchSelect component with customized placeholder", () => {
    const placeholder = "Select options...";
    render(
      <SearchSelect placeholder={placeholder}>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );

    expect(screen.queryByPlaceholderText(placeholder)).toBeTruthy();
  });

  test("renders the SearchSelect component with customized icon", () => {
    const IconText = "Icon";
    render(
      <SearchSelect icon={() => <div>{IconText}</div>}>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );

    expect(screen.getByText(IconText)).toBeTruthy();
  });

  test("renders the SearchSelect component with default value", () => {
    const placeholder = "Select options...";
    const defaultValue = "2";
    render(
      <SearchSelect defaultValue={defaultValue} placeholder={placeholder}>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );

    fireEvent.click(screen.getByPlaceholderText(placeholder));
    expect(screen.getByText("Option Two")).toBeTruthy();
  });

  test("renders the SearchSelect component with customized value", () => {
    const placeholder = "Select options...";
    const value = "3";
    render(
      <SearchSelect value={value} placeholder={placeholder}>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );

    fireEvent.click(screen.getByPlaceholderText(placeholder));
    expect(screen.getByText("Option Three")).toBeTruthy();
  });

  test("renders the SearchSelect component with customized onChange", () => {
    const placeholder = "Select options...";
    const onChange = jest.fn();
    render(
      <SearchSelect onChange={onChange} placeholder={placeholder}>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );

    fireEvent.click(screen.getByPlaceholderText(placeholder));
    fireEvent.click(screen.getByText("Option Two"));
    expect(onChange).toHaveBeenCalled();
  });

  test("renders the SearchSelect component with typing in the input", () => {
    const placeholder = "Select options...";
    const onChange = jest.fn();
    render(
      <SearchSelect onChange={onChange} placeholder={placeholder}>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );

    fireEvent.click(screen.getByPlaceholderText(placeholder));
    fireEvent.change(screen.getByPlaceholderText(placeholder), {
      target: { value: "whatever" },
    });
    expect(screen.queryByText("Option Two")).toBeNull();
    fireEvent.change(screen.getByPlaceholderText(placeholder), {
      target: { value: "Option" },
    });
    expect(screen.queryByText("Option Two")).toBeTruthy();
    expect(screen.queryByText("Option Three")).toBeTruthy();
  });

  test("renders the disabled SearchSelect component", () => {
    const placeholder = "Select options...";
    const disabled = true;
    render(
      <SearchSelect disabled={disabled} placeholder={placeholder}>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );

    fireEvent.click(screen.getByPlaceholderText(placeholder));

    expect(screen.queryByText("1")).toBeNull();
    expect(screen.queryByText("Option Two")).toBeNull();
    expect(screen.queryByText("Option Three")).toBeNull();
  });
});
