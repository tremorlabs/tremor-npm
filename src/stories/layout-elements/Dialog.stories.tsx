import type { Meta, StoryObj } from "@storybook/react";

import { Dialog } from "components";
import SimpleDialog from "./helpers/SimpleDialog";

const meta: Meta<typeof Dialog> = {
  title: "UI/Layout/Dialog",
  component: Dialog,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/layout-elements/Dialog",
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: SimpleDialog,
  parameters: {},
};
