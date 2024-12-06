import React from "react";
import { render } from "@testing-library/react";
import AreaChart from "components/spark-elements/SparkAreaChart/SparkAreaChart";

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
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ];
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const { container } = render(
      <AreaChart
        data={data}
        className="test"
        categories={["A", "B", "C"]}
        index="name"
        ref={ref}
      />,
    );
    expect(container.getElementsByClassName("w-28 h-12 test").length).toBe(1);
  });

  it("renders the chart without gradient", () => {
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ];
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const { container } = render(
      <AreaChart
        data={data}
        categories={["A", "B", "C"]}
        index="name"
        className="test"
        showGradient={false}
        ref={ref}
      />,
    );
    expect(container.getElementsByClassName("w-28 h-12 test").length).toBe(1);
  });

  it("renders the chart with custom colors", () => {
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ];
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const { container } = render(
      <AreaChart
        data={data}
        categories={["A", "B", "C"]}
        index="name"
        className="test"
        colors={["#ff0000", "#00ff00", "#0000ff"]}
        ref={ref}
      />,
    );
    expect(container.getElementsByClassName("w-28 h-12 test").length).toBe(1);
  });

  it("renders the chart with custom curve type", () => {
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ];
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const { container } = render(
      <AreaChart
        data={data}
        categories={["A", "B", "C"]}
        index="name"
        className="test"
        curveType="monotone"
        ref={ref}
      />,
    );
    expect(container.getElementsByClassName("w-28 h-12 test").length).toBe(1);
  });

  it("renders the chart with connectNulls", () => {
    const data = [
      { name: "A", value: 10 },
      { name: "B", value: null },
      { name: "C", value: 30 },
    ];
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const { container } = render(
      <AreaChart
        data={data}
        categories={["A", "B", "C"]}
        index="name"
        className="test"
        connectNulls
        ref={ref}
      />,
    );
    expect(container.getElementsByClassName("w-28 h-12 test").length).toBe(1);
  });

  it("renders the chart with no data", () => {
    const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const { getByText } = render(<AreaChart data={[]} categories={[]} index="name" ref={ref} />);
    expect(getByText("No data")).toBeDefined();
  });
});
