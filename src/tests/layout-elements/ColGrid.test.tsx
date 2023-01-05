import React from "react";
import { render } from "@testing-library/react";

import Card from "components/layout-elements/Card/Card";
import Col from "components/layout-elements/ColGrid/Col";
import ColGrid from "components/layout-elements/ColGrid/ColGrid";

describe("ColGrid", () => {
  test("renders the ColGrid component with default props", () => {
    render(
      <ColGrid>
        <Col numColSpan={2}>
          <Card>
            <div className="h-44" />
          </Card>
        </Col>
        <Card>
          <div className="h-44" />
        </Card>
        <Col>
          <Card>
            <div className="h-44" />
          </Card>
        </Col>
        <Card>
          <div className="h-44" />
        </Card>
        <Card>
          <div className="h-44" />
        </Card>
      </ColGrid>
    );
  });
});
