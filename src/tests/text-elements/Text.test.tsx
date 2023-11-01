import { render } from "@testing-library/react";
import React from "react";

import Text from "components/text-elements/Text/Text";

describe("Text", () => {
  test("renders the Text component with default props", () => {
    render(
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry&apos;s standard dummy text ever since the 900s, when an unknown printer
        took a galley of type and scrambled it to make a type specimen book.
      </Text>,
    );
  });
});
