import React from "react";
import Navbar from "components/layout-elements/Navbar";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NavbarItem, NavbarProps } from "components/layout-elements/Navbar/Navbar";
import { Card, Flex, Text } from "components";
import ArrowUpIcon from "assets/ArrowUpIcon";

export default {
  title: "Tremor/LayoutElements/Navbar",
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const renderChild = (key: string) => {
  return (
    <Card>
      <Text>{key}</Text>
    </Card>
  );
};
const items: NavbarProps["items"] = [
  {
    key: "first_button",
    label: <Text color="blue">Blue Component</Text>,
    renderChild,
  },
  { key: "second_button", label: "Basic Link", link: "https://www.tremor.so", renderChild },
  {
    key: "third_button",
    label: "Open in a new tab",
    link: "https://www.tremor.so",
    openInNewTab: true,
    renderChild,
    icon: ArrowUpIcon,
  },
  { key: "fourth_button", label: "With Icon", icon: ArrowUpIcon, renderChild },
  {
    key: "fifth_button",
    label: "Just Text",
    renderChild,
  },
];

const Template: ComponentStory<typeof Navbar> = (args) => {
  return <Navbar {...args} />;
};

const TemplateWithNavbarRenderChild: ComponentStory<typeof Navbar> = (args) => {
  const renderChild = (key: string, item: NavbarItem, itemComponent: React.ReactNode) => {
    return (
      <Flex flexDirection="col">
        <Text>Key: {key}</Text>
        <Text>Label</Text>
        {item.label}
        {itemComponent}
      </Flex>
    );
  };
  return <Navbar {...args} renderChild={renderChild} />;
};

export const Default = Template.bind({});
Default.args = {
  items,
};

export const WithColor = Template.bind({});
WithColor.args = {
  items,
  color: "red",
};

export const WithNavbarRenderChild = TemplateWithNavbarRenderChild.bind({});
WithNavbarRenderChild.args = {
  items,
};
