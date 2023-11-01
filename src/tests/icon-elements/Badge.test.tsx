/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";

import Badge from "components/icon-elements/Badge/Badge";

describe("Badge", () => {
  test("renders the Badge component with default props", () => {
    render(<Badge>Badge</Badge>);
  });
});
