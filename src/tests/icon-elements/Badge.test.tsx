/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import Badge from "components/icon-elements/Badge/Badge";

describe("Badge", () => {
  test("renders the Badge component with default props", () => {
    render(<Badge>Badge</Badge>);
  });
});
