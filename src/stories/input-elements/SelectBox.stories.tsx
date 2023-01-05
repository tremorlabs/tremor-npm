import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import {
  Button,
  Card,
  Datepicker,
  Flex,
  SelectBox,
  SelectBoxItem,
  Text,
  Title,
} from "components";
import { SelectElementsFlexTemplate } from "./helpers/SelectElementsFlexTemplate";
import { SimpleDropdown } from "stories/input-elements/helpers/SimpleDropdown";
import { SimpleSelectBox } from "./helpers/SimpleSelectBox";

import { CalendarIcon } from "assets";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/SelectBox",
  component: SelectBox,
} as ComponentMeta<typeof SelectBox>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof SelectBox> = (args) => (
  <form>
    <Title>Mobile</Title>
    <div className="tr-w-64">
      <Card>
        <Datepicker />
        <SimpleSelectBox {...args} />
        <SimpleDropdown />
      </Card>
    </div>
    <Title marginTop="mt-5">Desktop</Title>
    <Card>
      <SimpleSelectBox {...args} />
    </Card>
    <Title marginTop="mt-5">With Black Background</Title>
    <Card>
      <div className="tr-flex tr-items-center tr-bg-black tr-h-24">
        <SimpleSelectBox {...args} />
      </div>
    </Card>
  </form>
);

const FlexTemplate: ComponentStory<typeof SelectBox> = (args) => (
  <>
    <Card>
      <Text marginTop="mt-2">Justify Start</Text>
      <Flex justifyContent="justify-start" marginTop="mt-2">
        <SimpleSelectBox {...args} />
      </Flex>
      <Text marginTop="mt-2">Justify End</Text>
      <Flex justifyContent="justify-end" marginTop="mt-2">
        <SimpleSelectBox {...args} />
      </Flex>
      <Text marginTop="mt-2">Justify End with inner div</Text>
      <Flex justifyContent="justify-end" marginTop="mt-2">
        <div>
          <SimpleSelectBox {...args} />
        </div>
      </Flex>
      <Text marginTop="mt-2">Justify Start with inner div</Text>
      <Flex justifyContent="justify-start" marginTop="mt-2">
        <div>
          <SimpleSelectBox {...args} />
        </div>
      </Flex>
    </Card>
  </>
);

const WithControlledStateTemplate: ComponentStory<typeof SelectBox> = () => {
  const [value, setValue] = useState<number | null>(5);
  return (
    <Card>
      <SelectBox
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
      >
        <SelectBoxItem value={5} text={"Five"} />
        <SelectBoxItem value={3} text={"Three"} />
        <SelectBoxItem value={1} text={"One"} />
        <SelectBoxItem value={30} text={"Thirty"} />
        <SelectBoxItem value={33} text={"Thirtythree"} />
      </SelectBox>
      <Button text="Reset" onClick={() => setValue(null)} />
      <Button text="Set to One" onClick={() => setValue(1)} />
    </Card>
  );
};

export const DefaultResponsive = ResponsiveTemplate.bind({});
DefaultResponsive.args = {
  onValueChange: (v) => alert(v),
};

export const WithFlexParent = FlexTemplate.bind({});
WithFlexParent.args = {
  maxWidth: "max-w-xs",
};

export const WithDefaultValue = ResponsiveTemplate.bind({});
WithDefaultValue.args = {
  defaultValue: 5,
};

export const WithIcon = ResponsiveTemplate.bind({});
WithIcon.args = {
  defaultValue: 5,
  icon: CalendarIcon,
};

export const SelectElementsComparison = SelectElementsFlexTemplate.bind({});

export const WithControlledState = WithControlledStateTemplate.bind({});
