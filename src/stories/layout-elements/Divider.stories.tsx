import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SimpleCard } from "stories/layout-elements/helpers/SimpleCard";
import { Divider, Title } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/LayoutElements/Divider",
  component: Divider,
} as ComponentMeta<typeof Divider>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Divider> = () => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <SimpleCard />
      <Divider />
      <Divider>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      </Divider>
      <Divider>Divider</Divider>
      <SimpleCard />
    </div>
    <Title className="mt-5">Desktop</Title>
    <SimpleCard />
    <Divider />
    <SimpleCard />
  </>
);

export const Default = Template.bind({});
