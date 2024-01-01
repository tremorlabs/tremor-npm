import type { Meta, StoryObj } from "@storybook/react";

import { Dialog } from "components";
import SimpleDialog from "./helpers/SimpleDialog";

const meta: Meta<typeof Dialog> = {
  title: "UI/Layout/Dialog",
  component: Dialog,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/layout-elements/Dialog",
    docs: {
      description: {
        component: "Dialogs are used to display content in a layer above the app.",
      },
      source: {
        code: `
import { useState } from "react";
import { Dialog, DialogPanel, Button, Title } from "@tremor/react";

export const SimpleDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="text-center">
                <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
            </div>
            <Dialog open={isOpen} onClose={(val) => setIsOpen(val)}>
            <DialogPanel className="w-full max-w-sm">
                <Title className="mb-3">Account Creted Successfully</Title>
                Your account has been created successfully. You can now login to your account. For more
                information, please contact us.
                <div className="mt-3">
                <Button variant="light" onClick={() => setIsOpen(false)}>
                    Got it!
                </Button>
                </div>
            </DialogPanel>
            </Dialog>
        </>
    );
}; 
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: SimpleDialog,
  parameters: {},
};
