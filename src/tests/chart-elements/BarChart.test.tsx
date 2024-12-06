import React from "react";
import { render } from "@testing-library/react";
import BarChart from "components/chart-elements/BarChart/BarChart";

describe("BarChart", () => {
  beforeAll(() => {
    global.ResizeObserver = class MockedResizeObserver {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    };
    const mockChildMethod = jest.fn();
    jest.spyOn(React, "useRef").mockReturnValue({
      current: {
        childMethod: mockChildMethod,
      },
    });
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it("renders the chart with data", () => {
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ];
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    render(<BarChart data={data} categories={["A", "B", "C"]} index="name" ref={ref} />);
  });

  it("renders the chart with no data", () => {
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const { getByText } = render(<BarChart data={[]} categories={[]} index="name" ref={ref} />);
    expect(getByText("No data")).toBeDefined();
  });
});
