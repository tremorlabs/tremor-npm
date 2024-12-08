import { render } from "@testing-library/react";
import React from "react";

import { Badge } from "components";

describe("Badge", () => {
  test("renders the Badge component with default props", () => {
    render(<Badge>Badge</Badge>);
  });
});
