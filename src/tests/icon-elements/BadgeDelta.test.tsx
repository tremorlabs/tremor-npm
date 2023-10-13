/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";

import BadgeDelta from "components/icon-elements/BadgeDelta/BadgeDelta";

describe("BadgeDelta", () => {
  test("renders the BadgeDelta component with default props", () => {
    render(<BadgeDelta deltaType={"increase"} />);
  });
});
