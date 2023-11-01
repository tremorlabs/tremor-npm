import { render } from "@testing-library/react";
import React from "react";

import Card from "components/layout-elements/Card/Card";
import Col from "components/layout-elements/Grid/Col";
import Grid from "components/layout-elements/Grid/Grid";

describe("Grid", () => {
  test("renders the Grid component with default props", () => {
    render(
      <Grid>
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
      </Grid>,
    );
  });
});
