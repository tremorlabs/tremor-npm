import React from "react";
import { render } from "@testing-library/react";

import Block from "components/layout-elements/Block";

describe("Block", () => {
  test("renders the Block component with default props", () => {
    render(
      <Block>
        <div>Hello</div>
      </Block>
    );
  });
});
