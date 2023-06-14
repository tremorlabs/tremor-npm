import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ArrowRightIcon } from "assets";

import { BaseColors, Sizes as InputSizes } from "lib/constants";

import { Card, Grid, Flex, Title } from "components";

import { Button } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/Button",
  component: Flex,
} as ComponentMeta<typeof Flex>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const MyIcon = ArrowRightIcon;

const SizesTemplate: ComponentStory<typeof Button> = (args) => (
  <Card>
    <Grid numItems={5} className="gap-4">
      <Button {...args}>Button</Button>
      <Button {...args} icon={MyIcon}>
        Button
      </Button>
      <Button {...args} icon={MyIcon} iconPosition="right">
        Button
      </Button>
      <Button {...args} variant="secondary" icon={MyIcon} iconPosition="left">
        Button
      </Button>
      <Button {...args} variant="light" icon={MyIcon} iconPosition="right">
        Button
      </Button>
      {Object.values(InputSizes).map((size) => (
        <>
          <Button {...args} size={size}>
            Button
          </Button>
          <Button {...args} size={size} icon={MyIcon}>
            Button
          </Button>
          <Button {...args} size={size} icon={MyIcon} iconPosition="right">
            Button
          </Button>
          <Button {...args} size={size} variant="secondary" icon={MyIcon} iconPosition="left">
            Button
          </Button>
          <Button {...args} size={size} variant="light" icon={MyIcon} iconPosition="right">
            Button
          </Button>
        </>
      ))}
    </Grid>
  </Card>
);

const ColorsTemplate: ComponentStory<typeof Button> = (args) => (
  <Card>
    <Grid numItems={4} numItemsLg={4} className="gap-y-2">
      {Object.values(BaseColors).map((color) => (
        <>
          <Button {...args} color={color}>
            Button
          </Button>
          <Button {...args} color={color} icon={MyIcon}>
            Button
          </Button>
          <Button {...args} color={color} variant="secondary">
            Button
          </Button>
          <Button {...args} color={color} variant="light">
            Button
          </Button>
        </>
      ))}
    </Grid>
  </Card>
);

const ResponsiveFlexTemplate: ComponentStory<typeof Button> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="tr-w-64">
      <Card>
        <Flex>
          <Button {...args} icon={MyIcon}>
            Button
          </Button>
          <Button {...args} icon={MyIcon} variant={"secondary"}>
            Button
          </Button>
        </Flex>
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <Flex>
        <Button {...args} icon={MyIcon}>
          Button
        </Button>
        <Button {...args} icon={MyIcon} variant={"secondary"}>
          Very Long Button Text
        </Button>
      </Flex>
    </Card>
  </>
);

const LoadingStateTemplate: ComponentStory<typeof Button> = (args) => {
  const [loading, setLoading] = useState(false);

  return (
    <Card>
      <Button onClick={() => setLoading(!loading)}>Click to Load</Button>
      <Grid numItems={3} className="gap-y-2 mt-10">
        {Object.values(InputSizes).map((size) => (
          <>
            <Button {...args} size={size} loading={loading}>
              Button
            </Button>
            <Button {...args} size={size} icon={MyIcon} loading={loading}>
              Button
            </Button>
            <Button {...args} size={size} icon={MyIcon} iconPosition="right" loading={loading}>
              Button
            </Button>
            <Button {...args} size={size} variant="secondary" loading={loading}>
              Button
            </Button>
          </>
        ))}
      </Grid>
      <Title>With Loading Text</Title>
      <Grid numItems={4} className="gap-y-2">
        <Button {...args} loading={loading} loadingText="Loading">
          Button
        </Button>
        <Button {...args} icon={MyIcon} loading={loading} loadingText="Loading">
          Button
        </Button>
        <Button
          {...args}
          icon={MyIcon}
          iconPosition="right"
          loading={loading}
          loadingText="Loading"
        >
          Button
        </Button>
        <Button {...args} variant="secondary" loading={loading} loadingText="Loading">
          Button
        </Button>
      </Grid>
    </Card>
  );
};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {
  onClick: () => alert(2),
  className: "max-w-fit",
};

export const Colors = ColorsTemplate.bind({});
Colors.args = {
  onSelect: () => console.log("clicked"),
  className: "max-w-fit",
};

export const WithFlexParent = ResponsiveFlexTemplate.bind({});

export const WithDisabled = ResponsiveFlexTemplate.bind({});
WithDisabled.args = {
  disabled: true,
};

export const LoadingStates = LoadingStateTemplate.bind({});
LoadingStates.args = {
  className: "max-w-fit",
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
