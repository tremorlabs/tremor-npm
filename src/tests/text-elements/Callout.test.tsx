import { render, screen } from "@testing-library/react";
import React from "react";

import Callout from "components/text-elements/Callout/Callout";

describe("Callout", () => {
  test("renders the Callout component with default props", () => {
    render(
      <Callout title="Performance Metric">
        You are outranking 83% of the sales representatives in your cohort. Sit repellendus qui ut
        at blanditis et quo et molestiae. Doloribus dolores nostrum quia qui natus officia quod et
        dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae
      </Callout>,
    );
  });

  test("renders the Callout component with icon as ElementType", () => {
    const Icon = () => <span data-testid="icon">icon</span>;
    render(
      <Callout title="Performance Metric" icon={Icon}>
        You are outranking 83% of the sales representatives in your cohort. Sit repellendus qui ut
        at blanditis et quo et molestiae. Doloribus dolores nostrum quia qui natus officia quod et
        dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae
      </Callout>,
    );
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });

  test("renders the Callout component with icon as ReactElement", () => {
    const Icon = () => <span data-testid="icon">icon</span>;
    render(
      <Callout title="Performance Metric" icon={<Icon />}>
        You are outranking 83% of the sales representatives in your cohort. Sit repellendus qui ut
        at blanditis et quo et molestiae. Doloribus dolores nostrum quia qui natus officia quod et
        dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae
      </Callout>,
    );
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });
});
