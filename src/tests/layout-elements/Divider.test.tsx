import React from "react";
import { render } from "@testing-library/react";

import Divider from "components/layout-elements/Divider";

describe("Divider", () => {
  test("renders the Divider component with default props", () => {
    render(<Divider />);
  });
});
