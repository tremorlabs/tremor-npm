"use client";

import React, { useState, useEffect, MouseEvent, useRef } from "react";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { useInternalState } from "hooks";
import {
  Color,
  ValueFormatter,
  arraysAreEqual,
  colorPalette,
  defaultValueFormatter,
  getColorClassNames,
  makeClassName,
  tremorTwMerge,
} from "lib";

const makeBadgeClassName = makeClassName("Slider");

const Thumb = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const { className, testid, ...other } = props;

  return (
    // CLASSIC VARIANT
    // <span
    //     ref={ref}
    //     className={tremorTwMerge(
    //         makeBadgeClassName("thumb"),
    //         // common
    //         "absolute shrink-0 rounded-tremor-full h-5 w-5 border-2 top-1/2",
    //         // light
    //         "border-tremor-background shadow-tremor-card",
    //         // dark
    //         "dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
    //         className
    //     )}
    //     tabIndex={0}
    //     {...other}
    // />

    //WHITE VARIANT (white with two vertical lines)
    <span
      ref={ref}
      className={tremorTwMerge(
        makeBadgeClassName("thumb"),
        // common
        "absolute flex justify-center gap-0.5 items-center shrink-0 rounded-tremor-full h-5 w-5 border-2 top-1/2",
        // light
        "bg-tremor-background border-tremor-background shadow-tremor-card",
        // dark
        "dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
        className,
      )}
      tabIndex={0}
      data-testid={testid}
      {...other}
    >
      <span
        className={tremorTwMerge(
          // common
          "h-3/4 w-0.5 ",
          // light
          "bg-tremor-background-subtle bg-gray-200 rounded-tremor-full",
          // dark
          "dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
        )}
      />
      <span
        className={tremorTwMerge(
          // common
          "h-3/4 w-0.5 ",
          // light
          "bg-tremor-background-subtle bg-gray-200 rounded-tremor-full",
          // dark
          "dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
        )}
      />
    </span>
  );
});

type SliderValue = [number] | [number, number];

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  color?: Color;
  defaultValue?: SliderValue;
  onValueChange?: (value: SliderValue) => void;
  range?: boolean;
  showValues?: boolean;
  showTootlip?: boolean;
  valueFormatter?: ValueFormatter;
  value?: SliderValue;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    defaultValue,
    onValueChange,
    color,
    range = false,
    showTootlip = true,
    showValues = true,
    value,
    valueFormatter = defaultValueFormatter,
    disabled = false,
    ...other
  } = props;
  const sliderTrackRef = useRef<HTMLDivElement | null>(null);
  //   const initialValue: SliderValue = range ? defaultValue ?? [min, max] : defaultValue ?? [min];
  console.log(value);

  const initialDefaultValue: SliderValue = range
    ? defaultValue && defaultValue.length === 2
      ? defaultValue
      : [min, max]
    : defaultValue && defaultValue.length === 1
    ? defaultValue
    : [min];
  const initialValue: SliderValue | undefined = range
    ? value && value.length === 2
      ? value
      : undefined
    : value && value.length === 1
    ? value
    : undefined;
  const [values, setValues] = useInternalState<SliderValue | undefined>(
    initialDefaultValue,
    initialValue,
  );
  const [dragging, setDragging] = useState<string | null>(null);
  const { tooltipProps, getReferenceProps } = useTooltip();

  const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>, draggingThumb: string) => {
    e.preventDefault();
    setDragging(draggingThumb);
  };
  const calculatePercentage = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMouseUp = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setDragging(null);
  };

  const handleMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
    if (dragging && values && !disabled) {
      const trackElement = sliderTrackRef.current;

      if (trackElement) {
        const trackRect = trackElement.getBoundingClientRect();
        const mouseX = e.clientX - trackRect.left;
        const newPercentage = (mouseX / trackRect.width) * 100;
        let newValue = Math.max(Math.min((newPercentage / 100) * (max - min) + min, max), min);
        newValue = Math.round((newValue - min) / step) * step + min;

        let finalValues = values;
        if (range) {
          const [value1, value2] = values as [number, number];
          if (dragging === "left") {
            if (newValue <= value2) {
              finalValues = [newValue, value2];
            } else {
              finalValues = [value2, newValue];
              setDragging("right");
            }
          } else {
            if (newValue >= value1) finalValues = [value1, newValue];
            else {
              finalValues = [newValue, value1];
              setDragging("left");
            }
          }
        } else {
          if (!arraysAreEqual(values, [newValue])) {
            finalValues = [newValue];
          }
        }
        setValues(finalValues);

        if (value && !arraysAreEqual(value, finalValues)) {
          onValueChange?.(finalValues);
          //remove listener to prevent having multiple times the same value on onValueChange
          document.removeEventListener("mousemove", handleMouseMove);
        }
      }
    }
  };

  useEffect(() => {
    if (dragging) {
      // Add event listeners for mouse move and mouse up when dragging
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      // Remove event listeners when not dragging
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      // Clean up event listeners when the component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, value]);

  return (
    <div
      ref={ref}
      className={tremorTwMerge(
        makeBadgeClassName("root"),
        dragging && !disabled ? "cursor-grabbing" : "cursor-default",
      )}
      data-testid="slider"
    >
      <div
        ref={sliderTrackRef}
        className={tremorTwMerge(
          makeBadgeClassName("bar"),
          //common
          "h-2 rounded-tremor-full",
          //light
          "bg-tremor-background-subtle shadow-tremor-input",
          //dark
          "dark:bg-tremor-background-subtle dark:shadow-tremor-input",
        )}
        {...other}
      >
        {showTootlip && values ? (
          <Tooltip
            text={
              range
                ? values[0] === values[1]
                  ? valueFormatter(values[0])
                  : `${valueFormatter(values[0])} - ${valueFormatter(values[1])}`
                : valueFormatter(values[0])
            }
            {...tooltipProps}
          />
        ) : null}
        <div
          ref={range ? tooltipProps.refs.setReference : null}
          className={tremorTwMerge(
            makeBadgeClassName("rangeBar"),
            //common
            "relative h-full rounded-tremor-full",
            color
              ? getColorClassNames(color, colorPalette.background).bgColor
              : "bg-tremor-brand dark:bg-tremor-brand",
            disabled ? "opacity-70" : "",
          )}
          style={{
            width: `${
              range
                ? calculatePercentage(values[1] as number) -
                  calculatePercentage(values[0] as number)
                : calculatePercentage(values[0])
            }%`,
            left: `${range ? calculatePercentage(values[0] as number) : 0}%`,
          }}
          {...getReferenceProps}
        >
          {range ? (
            <Thumb
              className={tremorTwMerge(
                // common
                "left-0 transform -translate-y-1/2 -translate-x-1/2",
                disabled ? "cursor-not-allowed" : dragging ? "cursor-grabbing" : "cursor-grab",
              )}
              onMouseDown={(e: MouseEvent) => handleMouseDown(e, "left")}
              onMouseUp={handleMouseUp}
              testid="thumb-left"
            />
          ) : null}
          <Thumb
            ref={!range ? tooltipProps.refs.setReference : null}
            className={tremorTwMerge(
              // common
              "right-0 transform -translate-y-1/2 translate-x-1/2",
              disabled ? "cursor-not-allowed" : dragging ? "cursor-grabbing" : "cursor-grab",
            )}
            onMouseDown={(e: MouseEvent) => handleMouseDown(e, "right")}
            onMouseUp={handleMouseUp}
            testid="thumb-right"
          />
        </div>
      </div>
      {showValues ? (
        <div
          className={tremorTwMerge(
            makeBadgeClassName("labels"),
            "flex justify-between items-center mt-1 text-tremor-default ",
            //light
            "text-tremor-content-subtle",
            //dark
            "dark:text-tremor-content-subtle",
          )}
        >
          <span>{valueFormatter(min)}</span>
          <span>{valueFormatter(max)}</span>
        </div>
      ) : null}
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;
