/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import React from "react";

import Button from "components/input-elements/Button/Button";

describe("Button", () => {
  test("renders the Button component with default props", () => {
    render(<Button>Button</Button>);
  });

  test("renders the Button component with Icon as ElementType", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(<Button icon={Icon} />);
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders the Button component with Icon as ReactElement", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(<Button icon={<Icon />} />);
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });
});
