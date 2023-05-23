import React, { useRef, useState } from "react";
import { render } from "@testing-library/react";

import Modal from "components/util-elements/Modal/Modal";

const TestModalWrapper = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  return (
    <Modal showModal={showModal} setShowModal={setShowModal} parentRef={modalRef}>
      <div>Hello</div>
    </Modal>
  );
};

describe("Modal", () => {
  test("renders the Modal component with default props", () => {
    render(<TestModalWrapper />);
  });
});
