import { render } from "@testing-library/react";
import { Accordion } from "components";
import { AccordionBody } from "components/layout-elements/Accordion/AccordionBody";
import { AccordionHeader } from "components/layout-elements/Accordion/AccordionHeader";
import React from "react";

describe("Accordion", () => {
  test("renders the Accordion component with default props", () => {
    render(
      <Accordion>
        <AccordionHeader>
          <div>Hello</div>
        </AccordionHeader>
        <AccordionBody>
          <div>World</div>
        </AccordionBody>
      </Accordion>,
    );
  });
});
