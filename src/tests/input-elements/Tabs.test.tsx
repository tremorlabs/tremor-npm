import React from "react";
import { render, screen } from "@testing-library/react";

import Tab from "components/input-elements/Tabs/Tab";
import TabList from "components/input-elements/Tabs/TabList";
import TabGroup from "components/input-elements/Tabs/TabGroup";
import TabPanels from "components/input-elements/Tabs/TabPanels";
import TabPanel from "components/input-elements/Tabs/TabPanel";

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
  test("applies correct ARIA role and label to TabPanel", () => {
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
    expect(screen.getByRole("tabpanel", { name: "Option One" }));
  });
});
