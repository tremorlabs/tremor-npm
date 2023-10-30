/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";

import Button from "components/input-elements/Button/Button";

describe("Button", () => {
  test("renders the Button component with default props", () => {
    render(<Button>Button</Button>);
  });
});
