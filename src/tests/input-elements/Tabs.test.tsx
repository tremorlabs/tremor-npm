import React from "react";
import { render } from "@testing-library/react";

import Tab from "components/input-elements/Tab/Tab";
import TabList from "components/input-elements/Tab/TabList";

describe("SelectBox", () => {
  test("renders the SelectBox component with default props", () => {
    render(
      <TabList>
        <Tab value="1">Option One</Tab>
        <Tab value="2">Option Two</Tab>
        <Tab value="3">Option Three</Tab>
      </TabList>,
    );
  });
});
