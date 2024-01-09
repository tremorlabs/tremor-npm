import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { AccordionList } from "components";
import { SimpleAccordion, SimpleAccordionList } from "./helpers/SimpleAccordion";

const meta: Meta<typeof AccordionList> = {
  title: "UI/Layout/AccordionList",
  component: AccordionList,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/layout-elements/Accordion",
  },
};

export default meta;
type Story = StoryObj<typeof AccordionList>;

export const Default: Story = {
  render: SimpleAccordionList,
};

export const WithLessThanThreeChildren: Story = {
  render: (args) => (
    <>
      <AccordionList {...args}>
        <SimpleAccordion />
      </AccordionList>
      <AccordionList className="mt-5">
        <SimpleAccordion />
        <SimpleAccordion />
      </AccordionList>
    </>
  ),
};
