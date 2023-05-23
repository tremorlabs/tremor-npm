import React from "react";
import { render } from "@testing-library/react";

import Title from "components/text-elements/Title/Title";

describe("Title", () => {
  test("renders the Title component with default props", () => {
    render(<Title>Subtitle</Title>);
  });
});
