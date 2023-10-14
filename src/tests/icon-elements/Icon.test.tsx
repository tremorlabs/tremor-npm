/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import React from "react";

import ArrowUpIcon from "assets/ArrowUpIcon";

import Icon from "components/icon-elements/Icon/Icon";

describe("Icon", () => {
  test("renders the Icon component with default props", () => {
    render(<Icon icon={ArrowUpIcon} />);
  });

  test("renders the Icon as React.ElementType", () => {
    const DummyIcon = () => <span data-testid="icon">Icon</span>;
    render(<Icon icon={DummyIcon} />);
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders the Icon as React.ReactElement", () => {
    const DummyIcon = () => <span data-testid="icon">Icon</span>;
    render(<Icon icon={<DummyIcon />} />);
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });
});
