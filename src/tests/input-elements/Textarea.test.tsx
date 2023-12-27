import { render } from "@testing-library/react";
import { Textarea } from "components";
import React from "react";

describe("Texarea", () => {
  test("renders the Texarea component with default props", () => {
    render(
      <Textarea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor." />,
    );
  });
});
