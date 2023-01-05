/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import Button from "components/input-elements/Button";

describe("Button", () => {
  test("renders the Button component with default props", () => {
    render(<Button text={"Button"} />);
  });
});
