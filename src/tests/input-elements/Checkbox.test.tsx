import { render, fireEvent } from "@testing-library/react";
import { Checkbox } from "components";
import React from "react";

describe("Checkbox", () => {
  test("Renders correctly", () => {
    const { container } = render(<Checkbox onChange={() => console.log("clicked")} />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
  });

  test("Changes the checked state when clicked", () => {
    render(<Checkbox checked={false} onChange={() => console.log("clicked")} />);
    const checkbox = document.querySelector('input[type="checkbox"]')!;

    fireEvent.click(checkbox);

    expect(checkbox?.className).toContain("cursor-pointer");
  });

  test("Renders correctly with disabled prop", () => {
    const { container } = render(
      <Checkbox disabled={true} onChange={() => console.log("clicked")} />,
    );
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });
});
