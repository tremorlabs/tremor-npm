/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import { CategoryBar } from "components";
import React from "react";

describe("CategoryBar", () => {
  test("renders the CategoryBar component with default props", () => {
    render(<CategoryBar values={[10, 25, 45, 20]} />);
  });
  test("renders the CategoryBar component with values more than 100", () => {
    render(<CategoryBar values={[400, 400, 800]} />);
  });
  test("renders the CategoryBar component with values less than 100", () => {
    render(<CategoryBar values={[8, 7, 9, 8]} />);
  });
});
