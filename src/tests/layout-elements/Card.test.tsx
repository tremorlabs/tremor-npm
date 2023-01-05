import React from "react";
import { render } from "@testing-library/react";

import Card from "components/layout-elements/Card";

describe("Card", () => {
  test("renders the Card component with default props", () => {
    render(
      <Card>
        <div>Hello</div>
      </Card>
    );
  });
});
