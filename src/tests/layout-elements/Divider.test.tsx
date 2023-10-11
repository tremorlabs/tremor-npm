import { render } from "@testing-library/react";
import React from "react";

import Divider from "components/layout-elements/Divider/Divider";

describe("Divider", () => {
  test("renders the Divider component with default props", () => {
    render(<Divider />);
  });
});
