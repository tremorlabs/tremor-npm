import { render } from "@testing-library/react";
import React from "react";

import Flex from "components/layout-elements/Flex/Flex";

describe("Flex", () => {
  test("renders the Flex component with default props", () => {
    render(
      <Flex>
        <div>Hello</div>
        <div>World</div>
      </Flex>,
    );
  });
});
