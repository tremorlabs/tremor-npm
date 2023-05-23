/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import BadgeDelta from "components/icon-elements/BadgeDelta/BadgeDelta";

describe("BadgeDelta", () => {
  test("renders the BadgeDelta component with default props", () => {
    render(<BadgeDelta deltaType={"increase"} />);
  });
});
