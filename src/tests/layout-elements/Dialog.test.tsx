import React from "react";
import { act, render } from "@testing-library/react";

import { Dialog, DialogPanel } from "components";

describe("Dialog", () => {
  test("renders the Dialog component", async () => {
    const { findByText } = render(
      <Dialog open onClose={() => {}}>
        <DialogPanel>Test</DialogPanel>
      </Dialog>,
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });
    const message = await findByText("Test");
    expect(message.textContent).toBe("Test");
  });
});
