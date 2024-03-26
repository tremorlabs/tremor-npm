import { render, screen } from "@testing-library/react";
import React from "react";

import Tab from "components/input-elements/Tabs/Tab";
import TabGroup from "components/input-elements/Tabs/TabGroup";
import TabList from "components/input-elements/Tabs/TabList";
import TabPanel from "components/input-elements/Tabs/TabPanel";
import TabPanels from "components/input-elements/Tabs/TabPanels";

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

  test("renders with the Icon as ElementType", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <TabGroup>
        <TabList>
          <Tab icon={Icon}>Option One</Tab>
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
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders with Icon as ReactElement", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <TabGroup>
        <TabList>
          <Tab icon={<Icon />}>Option One</Tab>
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
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });
});
