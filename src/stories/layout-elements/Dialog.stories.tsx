import type { Meta, StoryObj } from "@storybook/react";

import { Dialog, DialogPanel, Button, Title } from "components";
import React from "react";

const SimpleDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="text-center">
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      </div>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Title className="mb-3">Account Created Successfully</Title>
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

const meta: Meta<typeof Dialog> = {
  title: "UI/Layout/Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: SimpleDialog,
  parameters: {},
};
