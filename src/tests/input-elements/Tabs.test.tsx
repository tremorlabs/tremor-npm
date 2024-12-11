import { render } from "@testing-library/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "components";
import React from "react";

describe("SelectBox", () => {
  test("renders the SelectBox component with default props", () => {
    render(
      <TabGroup>
        <TabList>
          <Tab>Option One</Tab>
          <Tab>Option Two</Tab>
          <Tab>Option Three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Hello World 1</TabPanel>
          <TabPanel>Hello World 2</TabPanel>
          <TabPanel>Hello World 3</TabPanel>
        </TabPanels>
      </TabGroup>,
    );
  });
});
