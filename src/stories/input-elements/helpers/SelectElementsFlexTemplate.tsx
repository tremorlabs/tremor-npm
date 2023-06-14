import React from "react";

import { Card, Flex, Text } from "components";
import { ComponentStory } from "@storybook/react";
import { SimpleSelect } from "./SimpleSelect";
import { SimpleMultiSelect } from "stories/input-elements/helpers/SimpleMultiSelect";
import { SimpleSearchSelect } from "stories/input-elements/helpers/SimpleSearchSelect";

const maxWidth = "max-w-xs";

export const SelectElementsFlexTemplate: ComponentStory<any> = () => (
  <Card>
    <Text className="mt-2">Justify Start</Text>
    <Flex justifyContent="start" className="mt-2">
      <div className="space-y-2">
        <SimpleSelect maxWidth={maxWidth} />
        <SimpleSearchSelect maxWidth={maxWidth} />
        <SimpleMultiSelect maxWidth={maxWidth} />
      </div>
    </Flex>
    <Text className="mt-2">Justify End</Text>
    <Flex justifyContent="end" className="mt-2">
      <div className={maxWidth + " space-y-2"}>
        <SimpleSelect maxWidth={maxWidth} />
        <SimpleSearchSelect maxWidth={maxWidth} />
        <SimpleMultiSelect maxWidth={maxWidth} />
      </div>
    </Flex>
    <Text className="mt-2">Justify End with inner div</Text>
    <Flex justifyContent="end" className="mt-2">
      <div>
        <div className="space-y-2">
          <SimpleSelect maxWidth={maxWidth} />
          <SimpleSearchSelect maxWidth={maxWidth} />
          <SimpleMultiSelect maxWidth={maxWidth} />
        </div>
      </div>
    </Flex>
    <Text className="mt-2">Justify Start with inner div</Text>
    <Flex justifyContent="start" className="mt-2">
      <div>
        <div className="space-y-2">
          <SimpleSelect maxWidth={maxWidth} />
          <SimpleSearchSelect maxWidth={maxWidth} />
          <SimpleMultiSelect maxWidth={maxWidth} />
        </div>
      </div>
    </Flex>
  </Card>
);
