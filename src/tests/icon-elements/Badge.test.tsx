/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import React from "react";

import Badge from "components/icon-elements/Badge/Badge";

describe("Badge", () => {
  test("renders the Badge component with default props", () => {
    render(<Badge>Badge</Badge>);
  });

  test("renders the Badge component with Icon as ElementType", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(<Badge icon={Icon} />);
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders the Badge component with Icon as ReactElement", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(<Badge icon={<Icon />} />);
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });
});
