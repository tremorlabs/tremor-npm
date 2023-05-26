import { render, fireEvent } from "@testing-library/react";
import CheckBox from "components/input-elements/CheckBox";
import React from "react";

describe("CheckBox", () => {
  test("Renders correctly", () => {
    const { container } = render(
      <CheckBox label="Example Checkbox" onChange={() => console.log("clicked")} />,
    );
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
  });

  test("Changes the checked state when clicked", () => {
    render(
      <CheckBox label="Example Checkbox" checked={false} onChange={() => console.log("clicked")} />,
    );
    const checkbox = document.querySelector('input[type="checkbox"]')!;

    fireEvent.click(checkbox);

    expect(checkbox?.className).toContain("cursor-pointer");
  });

  test("Renders correctly with disabled prop", () => {
    const { container } = render(
      <CheckBox label="Example Checkbox" disabled={true} onChange={() => console.log("clicked")} />,
    );
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  test("Applies checkBoxClassName correctly", () => {
    const checkBoxClassName = "custom-checkbox";

    const { getByRole } = render(
      <CheckBox
        label="Example Checkbox"
        checkBoxClassName={checkBoxClassName}
        onChange={() => console.log("clicked")}
      />,
    );

    const checkbox = getByRole("checkbox");

    expect(checkbox.classList.contains(checkBoxClassName)).toBeTruthy();
  });

  test("Applies containerClassName correctly", () => {
    const containerClassName = "custom-container";

    const { container } = render(
      <CheckBox
        label="Example Checkbox"
        containerClassName={containerClassName}
        onChange={() => console.log("clicked")}
      />,
    );

    const checkboxContainer = container.querySelector(".flex.items-center");

    expect(checkboxContainer?.classList.contains(containerClassName)).toBeTruthy();
  });

  test("Applies labelClassName correctly", () => {
    const labelClassName = "custom-label";

    const { getByText } = render(
      <CheckBox
        label="Example Checkbox"
        labelClassName={labelClassName}
        onChange={() => console.log("clicked")}
      />,
    );

    const label = getByText("Example Checkbox");

    expect(label.classList.contains(labelClassName)).toBeTruthy();
  });
});
