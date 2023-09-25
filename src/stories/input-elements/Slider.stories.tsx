import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, Slider, Title, SliderProps, Subtitle } from "components";
import { BaseColors } from "lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/Slider",
  component: Slider,
} as ComponentMeta<typeof Slider>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const ControlledSilder = (args: SliderProps) => {
  const [value, setValue] = useState<[number] | [number, number] | undefined>(args.value);

  const handleChange = (e: [number] | [number, number] | undefined) => {
    console.log(e);
    setValue(e);
  };

  return (
    <>
      <Slider {...args} value={value} onValueChange={handleChange} />
      <Subtitle className="mt-2">Value: {value?.join("-")}</Subtitle>
    </>
  );
};

const DefaultTemplate: ComponentStory<typeof Slider> = (args) => {
  return (
    <Card>
      <Slider {...args} />
    </Card>
  );
};
const DefaultSliderTemplate: ComponentStory<typeof Slider> = (args) => {
  return (
    <div className="flex flex-col gap-1">
      <Title className="mt-5">Uncontrolled</Title>
      <Card>
        <Slider {...args} />
      </Card>
      <Title className="mt-5">Controlled without onValueChange</Title>
      <Card>
        <Slider {...args} value={[30]} />
      </Card>
      <Title className="mt-5">Controlled with onValueChange</Title>
      <Card>
        <ControlledSilder {...args} value={[30]} />
      </Card>
    </div>
  );
};

const DefaultRangeSliderTemplate: ComponentStory<typeof Slider> = (args) => {
  return (
    <div className="flex flex-col gap-1">
      <Title className="mt-5">Uncontrolled</Title>
      <Card>
        <Slider {...args} />
      </Card>
      <Title className="mt-5">Controlled without onValueChange</Title>
      <Card>
        <Slider {...args} value={[30, 50]} />
      </Card>
      <Title className="mt-5">Controlled with onValueChange</Title>
      <Card>
        <ControlledSilder {...args} value={[30, 50]} />
      </Card>
    </div>
  );
};

const DefaultSliderTemplateColors: ComponentStory<typeof Slider> = (args) => {
  return (
    <div className="flex flex-col gap-1">
      {Object.values(BaseColors).map((color) => (
        <>
          <Title className="mt-5 capitalize">{color}</Title>
          <Card key={color}>
            <Slider {...args} color={color} />
          </Card>
        </>
      ))}
    </div>
  );
};

export const DefaultResponsive = DefaultSliderTemplate.bind({});
DefaultResponsive.args = {};

export const WithStep = DefaultSliderTemplate.bind({});
WithStep.args = {
  step: 10,
};

export const WithDisabled = DefaultSliderTemplate.bind({});
WithDisabled.args = {
  disabled: true,
};

export const WithCustomColors = DefaultSliderTemplateColors.bind({});
WithCustomColors.args = {
  defaultValue: [30],
};

export const WithMin = DefaultSliderTemplate.bind({});
WithMin.args = {
  min: 10,
};

export const WithMax = DefaultSliderTemplate.bind({});
WithMax.args = {
  max: 90,
};

export const WithMinMax = DefaultSliderTemplate.bind({});
WithMinMax.args = {
  min: 10,
  max: 90,
};

export const WithRange = DefaultRangeSliderTemplate.bind({});
WithRange.args = {
  range: true,
};

export const WithRangeDisabled = DefaultRangeSliderTemplate.bind({});
WithRangeDisabled.args = {
  range: true,
  disabled: true,
};

export const WithRangeCustomColors = DefaultSliderTemplateColors.bind({});
WithRangeCustomColors.args = {
  range: true,
  defaultValue: [30, 50],
};

export const WithRangeStep = DefaultRangeSliderTemplate.bind({});
WithRangeStep.args = {
  range: true,
  step: 10,
};

export const WithRangeMin = DefaultRangeSliderTemplate.bind({});
WithRangeMin.args = {
  range: true,
  min: 10,
};

export const WithRangeMax = DefaultRangeSliderTemplate.bind({});
WithRangeMax.args = {
  range: true,
  max: 90,
};

export const WithRangeMinMax = DefaultRangeSliderTemplate.bind({});
WithRangeMinMax.args = {
  range: true,
  min: 10,
  max: 90,
};

export const WithValueFormatter = DefaultRangeSliderTemplate.bind({});
WithValueFormatter.args = {
  range: true,
  valueFormatter: (e) => `${e}€`,
};

export const WithBadDefaultValue = DefaultTemplate.bind({});
WithBadDefaultValue.args = {
  defaultValue: [30, 60],
};

export const WithRangeAndBadDefaultValue = DefaultTemplate.bind({});
WithRangeAndBadDefaultValue.args = {
  range: true,
  defaultValue: [30],
};
