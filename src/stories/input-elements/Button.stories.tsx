import React, { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";
import { ArrowRightIcon } from "assets";

import { BaseColors, Sizes as InputSizes } from "lib/constants";

import { Card, Grid, Flex, Title, Button } from "components";

const meta: Meta<typeof Button> = {
  title: "Tremor/InputElements/Button",
  component: Button,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Button>;

const SizesTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Grid numItems={5} className="gap-4">
          <Button {...args}>Button</Button>
          <Button {...args} icon={ArrowRightIcon}>
            Button
          </Button>
          <Button {...args} icon={ArrowRightIcon} iconPosition="right">
            Button
          </Button>
          <Button {...args} variant="secondary" icon={ArrowRightIcon} iconPosition="left">
            Button
          </Button>
          <Button {...args} variant="light" icon={ArrowRightIcon} iconPosition="right">
            Button
          </Button>
          {Object.values(InputSizes).map((size) => (
            <>
              <Button {...args} size={size}>
                Button
              </Button>
              <Button {...args} size={size} icon={ArrowRightIcon}>
                Button
              </Button>
              <Button {...args} size={size} icon={ArrowRightIcon} iconPosition="right">
                Button
              </Button>
              <Button
                {...args}
                size={size}
                variant="secondary"
                icon={ArrowRightIcon}
                iconPosition="left"
              >
                Button
              </Button>
              <Button
                {...args}
                size={size}
                variant="light"
                icon={ArrowRightIcon}
                iconPosition="right"
              >
                Button
              </Button>
            </>
          ))}
        </Grid>
      </Card>
    );
  },
};

const ColorsTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Grid numItems={4} numItemsLg={4} className="gap-y-2">
          {Object.values(BaseColors).map((color) => (
            <>
              <Button {...args} color={color}>
                Button
              </Button>
              <Button {...args} color={color} icon={ArrowRightIcon}>
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
  },
};

const ResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
          <Card>
            <Flex>
              <Button {...args} icon={ArrowRightIcon}>
                Button
              </Button>
              <Button {...args} icon={ArrowRightIcon} variant={"secondary"}>
                Button
              </Button>
            </Flex>
          </Card>
        </div>
        <Title className="mt-5">Desktop</Title>
        <Card>
          <Flex>
            <Button {...args} icon={ArrowRightIcon}>
              Button
            </Button>
            <Button {...args} icon={ArrowRightIcon} variant={"secondary"}>
              Very Long Button Text
            </Button>
          </Flex>
        </Card>
      </>
    );
  },
};

function LoadingState({ ...args }) {
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
            <Button {...args} size={size} icon={ArrowRightIcon} loading={loading}>
              Button
            </Button>
            <Button
              {...args}
              size={size}
              icon={ArrowRightIcon}
              iconPosition="right"
              loading={loading}
            >
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
        <Button {...args} icon={ArrowRightIcon} loading={loading} loadingText="Loading">
          Button
        </Button>
        <Button
          {...args}
          icon={ArrowRightIcon}
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
}

const LoadingStateTemplate: Story = {
  render: ({ ...args }) => <LoadingState {...args} />,
};

export const SizesExample: Story = {
  ...SizesTemplate,
  args: {
    onClick: () => alert(2),
    className: "max-w-fit",
  },
};

export const ColorsExample: Story = {
  ...ColorsTemplate,
  args: {
    onClick: () => alert(2),
    className: "max-w-fit",
  },
};

export const WithFlexParent: Story = {
  ...ResponsiveFlexTemplate,
};

export const WithDisabled: Story = {
  ...ResponsiveFlexTemplate,
  args: {
    disabled: true,
  },
};

export const LoadingStatesExample: Story = {
  ...LoadingStateTemplate,
  args: {
    className: "max-w-fit",
  },
};
