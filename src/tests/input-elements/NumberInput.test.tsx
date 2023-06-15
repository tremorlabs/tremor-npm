import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { NumberInput } from "components";

describe("NumberInput", () => {
  test("renders the NumberInput component with default props", () => {
    const { container } = render(<NumberInput defaultValue="123" />);
    expect(container.querySelector('[data-testid="base-input"]')?.getAttribute("type")).toBe(
      "number",
    );
  });
  test("can only type numbers", () => {
    render(<NumberInput defaultValue="" />);
    const inputEl: HTMLInputElement = screen.getByTestId("base-input");
    fireEvent.change(inputEl, { target: { value: "Test" } });
    expect(inputEl.value).toBe("");
  });
});
