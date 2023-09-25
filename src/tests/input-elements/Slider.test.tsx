import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Slider } from "components";

describe("Slider Component", () => {
  it("handles to trigger onValueChange when dragging the controlled slider", () => {
    const onValueChange = jest.fn();
    render(<Slider value={[10]} onValueChange={onValueChange} />);
    const thumbRight = screen.getByTestId("thumb-right");
    fireEvent.mouseDown(thumbRight);
    fireEvent.mouseMove(thumbRight);
    fireEvent.mouseUp(thumbRight);
    expect(onValueChange).toHaveBeenCalled();
  });

  it("handles to not trigger onValueChange when dragging the uncontrolledcontrolled slider", () => {
    const onValueChange = jest.fn();
    render(<Slider onValueChange={onValueChange} />);
    const thumbRight = screen.getByTestId("thumb-right");

    fireEvent.mouseDown(thumbRight);
    fireEvent.mouseMove(thumbRight);
    fireEvent.mouseUp(thumbRight);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe("Range slider Component", () => {
  it("handles to have two thumbs", () => {
    render(<Slider range />);
    const thumbRight = screen.getByTestId("thumb-right");
    const thumbLeft = screen.getByTestId("thumb-left");

    expect(thumbRight).not.toBeNull();
    expect(thumbLeft).not.toBeNull();
  });

  it("handles to trigger onValueChange when dragging both thumbs on the controlled slider", () => {
    const onValueChange = jest.fn();
    render(<Slider range value={[10, 30]} onValueChange={onValueChange} />);
    const thumbRight = screen.getByTestId("thumb-right");
    const thumbLeft = screen.getByTestId("thumb-left");
    fireEvent.mouseDown(thumbRight);
    fireEvent.mouseMove(thumbRight);
    fireEvent.mouseUp(thumbRight);
    fireEvent.mouseDown(thumbLeft);
    fireEvent.mouseMove(thumbLeft, { clientX: 0 });
    fireEvent.mouseUp(thumbLeft);

    expect(onValueChange).toHaveBeenCalledTimes(2);
  });
});
