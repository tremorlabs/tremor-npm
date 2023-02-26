import React from "react";

import { Card, Flex, Text } from "components";
import { ComponentStory } from "@storybook/react";
import { SimpleDropdown } from "./SimpleDropdown";
import { SimpleMultiSelectBox } from "stories/input-elements/helpers/SimpleMultiSelectBox";
import { SimpleSelectBox } from "stories/input-elements/helpers/SimpleSelectBox";

const maxWidth = "max-w-xs";

export const SelectElementsFlexTemplate: ComponentStory<any> = () => (
  <Card>
    <Text className="mt-2">Justify Start</Text>
    <Flex justifyContent="start" className="mt-2">
      <div className="space-y-2">
        <SimpleDropdown maxWidth={maxWidth} />
        <SimpleSelectBox maxWidth={maxWidth} />
        <SimpleMultiSelectBox maxWidth={maxWidth} />
      </div>
    </Flex>
    <Text className="mt-2">Justify End</Text>
    <Flex justifyContent="end" className="mt-2">
      <div className={maxWidth + " space-y-2"}>
        <SimpleDropdown maxWidth={maxWidth} />
        <SimpleSelectBox maxWidth={maxWidth} />
        <SimpleMultiSelectBox maxWidth={maxWidth} />
      </div>
    </Flex>
    <Text className="mt-2">Justify End with inner div</Text>
    <Flex justifyContent="end" className="mt-2">
      <div>
        <div className="space-y-2">
          <SimpleDropdown maxWidth={maxWidth} />
          <SimpleSelectBox maxWidth={maxWidth} />
          <SimpleMultiSelectBox maxWidth={maxWidth} />
        </div>
      </div>
    </Flex>
    <Text className="mt-2">Justify Start with inner div</Text>
    <Flex justifyContent="start" className="mt-2">
      <div>
        <div className="space-y-2">
          <SimpleDropdown maxWidth={maxWidth} />
          <SimpleSelectBox maxWidth={maxWidth} />
          <SimpleMultiSelectBox maxWidth={maxWidth} />
        </div>
      </div>
    </Flex>
  </Card>
);
