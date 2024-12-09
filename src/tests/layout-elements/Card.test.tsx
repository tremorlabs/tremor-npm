import { render } from "@testing-library/react";
import React from "react";

import { Card } from "components";

describe("Card", () => {
  test("renders the Card component with default props", () => {
    render(
      <Card>
        <div>Hello</div>
      </Card>,
    );
  });
});
