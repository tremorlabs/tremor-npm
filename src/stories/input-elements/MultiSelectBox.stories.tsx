import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import {
  Button,
  Card,
  Datepicker,
  Flex,
  MultiSelectBox,
  MultiSelectBoxItem,
  Text,
  Title,
} from "components";
import { SelectElementsFlexTemplate } from "./helpers/SelectElementsFlexTemplate";
import { SimpleMultiSelectBox } from "./helpers/SimpleMultiSelectBox";

import { CalendarIcon } from "assets";
import { SimpleSelectBox } from "stories/input-elements/helpers/SimpleSelectBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/MultiSelectBox",
  component: MultiSelectBox,
} as ComponentMeta<typeof MultiSelectBox>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof MultiSelectBox> = (args) => (
  <form>
    <Title>Mobile</Title>
    <div className="tr-w-64">
      <Card>
        <Datepicker />
        <SimpleMultiSelectBox {...args} />
        <SimpleSelectBox icon={CalendarIcon} />
      </Card>
    </div>
    <Title marginTop="mt-5">Desktop</Title>
    <Card>
      <SimpleMultiSelectBox {...args} />
    </Card>
    <Title marginTop="mt-5">With Black Background</Title>
    <Card>
      <div className="tr-flex tr-items-center tr-bg-black tr-h-24">
        <SimpleMultiSelectBox {...args} />
      </div>
    </Card>
  </form>
);

const FlexTemplate: ComponentStory<typeof MultiSelectBox> = (args) => (
  <>
    <Card>
      <Text marginTop="mt-2">Justify Start</Text>
      <Flex justifyContent="justify-start" marginTop="mt-2">
        <SimpleMultiSelectBox {...args} />
      </Flex>
      <Text marginTop="mt-2">Justify End</Text>
      <Flex justifyContent="justify-end" marginTop="mt-2">
        <SimpleMultiSelectBox {...args} />
      </Flex>
      <Text marginTop="mt-2">Justify End with inner div</Text>
      <Flex justifyContent="justify-end" marginTop="mt-2">
        <div>
          <SimpleMultiSelectBox {...args} />
        </div>
      </Flex>
      <Text marginTop="mt-2">Justify Start with inner div</Text>
      <Flex justifyContent="justify-start" marginTop="mt-2">
        <div>
          <SimpleMultiSelectBox {...args} />
        </div>
      </Flex>
    </Card>
  </>
);

const WithControlledStateTemplate: ComponentStory<typeof MultiSelectBox> =
  () => {
    const [value, setValue] = useState<number[]>([]);
    console.log("OUTER", value);
    return (
      <Card>
        <MultiSelectBox
          value={value}
          onValueChange={(values) => {
            setValue(values);
            alert(values);
          }}
        >
          <MultiSelectBoxItem value={5} text={"Five"} />
          <MultiSelectBoxItem value={3} text={"Three"} />
          <MultiSelectBoxItem value={1} text={"One"} />
        </MultiSelectBox>
        <Button text="Reset" onClick={() => setValue([])} />
        <Button text="Set to One" onClick={() => setValue([1])} />
      </Card>
    );
  };

export const DefaultResponsive = ResponsiveTemplate.bind({});

export const WithFlexParent = FlexTemplate.bind({});
WithFlexParent.args = {
  maxWidth: "max-w-xs",
  handleSelect: (values) => console.log(values),
};

export const WithDefaultValues = ResponsiveTemplate.bind({});
WithDefaultValues.args = {
  defaultValues: [5, 1],
};

export const WithIcon = ResponsiveTemplate.bind({});
WithIcon.args = {
  icon: CalendarIcon,
  defaultValues: [5, 1],
};

export const SelectElementsComparison = SelectElementsFlexTemplate.bind({});

export const WithControlledState = WithControlledStateTemplate.bind({});
