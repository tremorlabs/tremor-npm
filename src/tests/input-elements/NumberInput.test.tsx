import { fireEvent, render, screen } from "@testing-library/react";
import { NumberInput } from "components";
import React from "react";

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

  test(".1 step attribute", () => {
    render(<NumberInput defaultValue="2" step=".1" />);
    const inputEl: HTMLInputElement = screen.getByTestId("base-input");
    expect(inputEl.value).toBe("2");
    const stepUp = screen.getByTestId("step-up");
    fireEvent.mouseUp(stepUp);
    expect(inputEl.value).toBe("2.1");
  });

  test("min/max attribute", () => {
    render(<NumberInput defaultValue="1" min="1" max="2" />);
    const inputEl: HTMLInputElement = screen.getByTestId("base-input");
    const stepUp = screen.getByTestId("step-up");
    const stepDown = screen.getByTestId("step-down");
    fireEvent.mouseUp(stepDown);
    expect(inputEl.value).toBe("1");
    fireEvent.mouseUp(stepUp);
    fireEvent.mouseUp(stepUp);
    expect(inputEl.value).toBe("2");
  });
});
