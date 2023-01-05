import React from "react";

import { Block, Card, Flex, Text } from "components";
import { ComponentStory } from "@storybook/react";
import { SimpleDropdown } from "./SimpleDropdown";
import { SimpleMultiSelectBox } from "stories/input-elements/helpers/SimpleMultiSelectBox";
import { SimpleSelectBox } from "stories/input-elements/helpers/SimpleSelectBox";

const maxWidth = "max-w-xs";

export const SelectElementsFlexTemplate: ComponentStory<any> = () => (
  <Card>
    <Text marginTop="mt-2">Justify Start</Text>
    <Flex justifyContent="justify-start" marginTop="mt-2">
      <Block spaceY="space-y-2">
        <SimpleDropdown maxWidth={maxWidth} />
        <SimpleSelectBox maxWidth={maxWidth} />
        <SimpleMultiSelectBox maxWidth={maxWidth} />
      </Block>
    </Flex>
    <Text marginTop="mt-2">Justify End</Text>
    <Flex justifyContent="justify-end" marginTop="mt-2">
      <Block maxWidth={maxWidth} spaceY="space-y-2">
        <SimpleDropdown maxWidth={maxWidth} />
        <SimpleSelectBox maxWidth={maxWidth} />
        <SimpleMultiSelectBox maxWidth={maxWidth} />
      </Block>
    </Flex>
    <Text marginTop="mt-2">Justify End with inner div</Text>
    <Flex justifyContent="justify-end" marginTop="mt-2">
      <div>
        <Block spaceY="space-y-2">
          <SimpleDropdown maxWidth={maxWidth} />
          <SimpleSelectBox maxWidth={maxWidth} />
          <SimpleMultiSelectBox maxWidth={maxWidth} />
        </Block>
      </div>
    </Flex>
    <Text marginTop="mt-2">Justify Start with inner div</Text>
    <Flex justifyContent="justify-start" marginTop="mt-2">
      <div>
        <Block spaceY="space-y-2">
          <SimpleDropdown maxWidth={maxWidth} />
          <SimpleSelectBox maxWidth={maxWidth} />
          <SimpleMultiSelectBox maxWidth={maxWidth} />
        </Block>
      </div>
    </Flex>
  </Card>
);
