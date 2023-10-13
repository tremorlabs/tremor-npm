import { render } from "@testing-library/react";
import React from "react";

import Accordion from "components/layout-elements/Accordion/Accordion";
import AccordionBody from "components/layout-elements/Accordion/AccordionBody";
import AccordionHeader from "components/layout-elements/Accordion/AccordionHeader";
import AccordionList from "components/layout-elements/Accordion/AccordionList";

describe("AccordionList", () => {
  test("renders the AccordionList component with default props", () => {
    render(
      <AccordionList>
        <Accordion>
          <AccordionHeader>Hello</AccordionHeader>
          <AccordionBody>World</AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionHeader>Hello</AccordionHeader>
          <AccordionBody>World</AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionHeader>Hello</AccordionHeader>
          <AccordionBody>World</AccordionBody>
        </Accordion>
      </AccordionList>,
    );
  });
});
