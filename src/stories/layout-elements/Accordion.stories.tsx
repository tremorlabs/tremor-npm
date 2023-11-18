import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "components";
import { SimpleAccordion } from "./helpers/SimpleAccordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Layout/Accordion",
  component: Accordion,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/layout-elements/Accordion",
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: SimpleAccordion,
};

export const DefaultOpen: Story = {
  render: SimpleAccordion,
  args: {
    defaultOpen: true,
  },
};
