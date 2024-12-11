import { render } from "@testing-library/react";
import { Accordion, AccordionList } from "components";
import { AccordionBody } from "components/layout-elements/Accordion/AccordionBody";
import { AccordionHeader } from "components/layout-elements/Accordion/AccordionHeader";
import React from "react";

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
