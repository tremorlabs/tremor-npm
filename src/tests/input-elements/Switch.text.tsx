/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";

import Switch from "components/input-elements/Switch/Switch";

describe("Switch", () => {
  test("renders the Switch component with default props", () => {
    render(<Switch />);
  });
});
