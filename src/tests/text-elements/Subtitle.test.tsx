import { render } from "@testing-library/react";
import React from "react";

import Subtitle from "components/text-elements/Subtitle/Subtitle";

describe("Subtitle", () => {
  test("renders the Subtitle component with default props", () => {
    render(<Subtitle>Subtitle</Subtitle>);
  });
});
