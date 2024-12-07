import React from "react";
import { render } from "@testing-library/react";
import AreaChart from "components/chart-elements/AreaChart/AreaChart";

describe("AreaChart", () => {
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
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ];
    const { container } = render(
      <AreaChart data={data} categories={["A", "B", "C"]} index="name" ref={ref} />,
    );
    expect(container.getElementsByClassName("w-full h-80").length).toBe(1);
  });

  it("renders the chart without gradient", () => {
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ];
    const { container } = render(
      <AreaChart
        data={data}
        categories={["A", "B", "C"]}
        index="name"
        showGradient={false}
        ref={ref}
      />,
    );
    expect(container.getElementsByClassName("w-full h-80").length).toBe(1);
  });

  it("renders the chart with custom colors", () => {
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ];
    const { container } = render(
      <AreaChart
        data={data}
        categories={["A", "B", "C"]}
        index="name"
        colors={["#ff0000", "#00ff00", "#0000ff"]}
        ref={ref}
      />,
    );
    expect(container.getElementsByClassName("w-full h-80").length).toBe(1);
  });

  it("renders the chart with custom curve type", () => {
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ];
    const { container } = render(
      <AreaChart
        data={data}
        categories={["A", "B", "C"]}
        index="name"
        curveType="monotone"
        ref={ref}
      />,
    );
    expect(container.getElementsByClassName("w-full h-80").length).toBe(1);
  });

  it("renders the chart with connectNulls", () => {
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: null },
      { name: "C", value: 30 },
    ];
    const { container } = render(
      <AreaChart data={data} categories={["A", "B", "C"]} index="name" connectNulls />,
    );
    expect(container.getElementsByClassName("w-full h-80").length).toBe(1);
  });

  it("renders the chart with no data", () => {
    const { getByText } = render(<AreaChart data={[]} categories={[]} index="name" />);
    expect(getByText("No data")).toBeDefined();
  });
});
