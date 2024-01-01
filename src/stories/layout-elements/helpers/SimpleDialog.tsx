import React, { useState } from "react";
import { Dialog, DialogPanel, Button, Title } from "components";

const SimpleDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="text-center">
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Dialog
        </Button>
      </div>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
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
export default SimpleDialog;
