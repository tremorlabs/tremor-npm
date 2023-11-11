import { useInternalState } from "hooks";
import * as SliderPrimitive from "@radix-ui/react-slider";
import {
  Color,
  ValueFormatter,
  colorPalette,
  //   defaultValueFormatter,
  getColorClassNames,
  makeClassName,
  tremorTwMerge,
} from "lib";

import React from "react";

const makeSliderClassName = makeClassName("Slider");

const getSliderColors = (color?: Color) => {
  return {
    bgColor: color
      ? getColorClassNames(color, colorPalette.background).bgColor
      : "bg-tremor-brand dark:bg-dark-tremor-brand",
    lightBackgroundColor: color
      ? getColorClassNames(color, colorPalette.lightBorder).bgColor
      : "bg-tremor-brand-muted dark:bg-dark-tremor-brand-muted",
    ringColor: color
      ? getColorClassNames(color, colorPalette.ring).ringColor
      : "focus:ring-tremor-brand-muted focus:dark:ring-dark-tremor-brand-muted",
  };
};

type SliderValue = [number] | [number, number];

export interface SliderProps extends SliderPrimitive.SliderProps {
  min?: number;
  max?: number;
  step?: number;
  color?: Color;
  value?: SliderValue;
  defaultValue?: SliderValue;
  onValueChange?(value: SliderValue): void;
  range?: boolean;
  showTootlip?: boolean;
  valueFormatter?: ValueFormatter;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    defaultValue = [0],
    value: inputValue,
    onValueChange,
    color,
    showTootlip = true,
    // valueFormatter = defaultValueFormatter,
    disabled = false,
    ...other
  } = props;
  const sliderColorStyles = getSliderColors(color);
  const [value, setValue] = useInternalState(defaultValue, inputValue);

  return (
    <SliderPrimitive.Root
      {...other}
      ref={ref}
      value={value}
      onValueChange={(val) => {
        const formatedValue = val as SliderValue;
        setValue(formatedValue);
        onValueChange?.(formatedValue);
      }}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      aria-label="value"
      className={tremorTwMerge(
        makeSliderClassName("root"),
        //common
        "relative flex h-5 w-full touch-none items-center",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:flex-col",
      )}
    >
      {showTootlip && value ? (
        //TBD (with new custom tooltip? @chris @sev)
        <></>
      ) : null}
      <SliderPrimitive.Track
        className={tremorTwMerge(
          makeSliderClassName("track"),
          //common
          "relative h-2 w-full grow rounded-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
          sliderColorStyles.lightBackgroundColor,
        )}
      >
        <SliderPrimitive.Range
          className={tremorTwMerge(
            makeSliderClassName("range"),
            "absolute h-full rounded-full",
            "data-[orientation=vertical]:w-full data-[orientation=vertical]:h-auto",
            sliderColorStyles.bgColor,
          )}
        />
      </SliderPrimitive.Track>
      {value?.map((_, index) => {
        return (
          <SliderPrimitive.Thumb
            key={index}
            className={tremorTwMerge(
              makeSliderClassName("thumb"),
              //common
              "block h-5 w-5 rounded-full outline-none focus:ring-2 shadow-tremor-input duration-100 ease-in-out transition border-2",
              //light
              "border-tremor-background ",
              //dark
              "dark:border-dark-tremor-background",
              sliderColorStyles.bgColor,
              sliderColorStyles.ringColor,
              disabled ? "cursor-not-allowed" : "cursor-pointer",
            )}
          />
        );
      })}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = "Slider";

export default Slider;
