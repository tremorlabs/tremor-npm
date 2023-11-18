import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRightIcon } from "assets";
import { Button, Grid } from "components";
import { BaseColors, Sizes as InputSizes } from "lib/constants";

const meta: Meta<typeof Button> = {
  title: "UI/Input/Button",
  component: Button,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/input-elements/Button",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const SizesTemplate: Story = {
  render: ({ ...args }) => {
    return (
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
    );
  },
};

const SizesTemplateNoText: Story = {
  render: ({ ...args }) => {
    return (
      <Grid numItems={5} className="gap-4">
        <Button {...args} icon={ArrowRightIcon}></Button>
        <Button {...args} icon={ArrowRightIcon}></Button>
        <Button {...args} variant="secondary" icon={ArrowRightIcon}></Button>
        <Button {...args} variant="light" icon={ArrowRightIcon}></Button>
        {Object.values(InputSizes).map((size) => (
          <>
            <Button {...args} size={size}></Button>
            <Button {...args} size={size} icon={ArrowRightIcon}></Button>
            <Button {...args} size={size} icon={ArrowRightIcon}></Button>
            <Button {...args} size={size} variant="secondary" icon={ArrowRightIcon}></Button>
            <Button {...args} size={size} variant="light" icon={ArrowRightIcon}></Button>
          </>
        ))}
      </Grid>
    );
  },
};

const ColorsTemplate: Story = {
  render: ({ ...args }) => {
    return (
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
    );
  },
};

function LoadingState({ ...args }) {
  const [loading, setLoading] = useState(false);
  function RenderButtons(args: any, loading: any) {
    return (
      <>
        <Button {...args} loading={loading}>
          Button
        </Button>
        <Button {...args} icon={ArrowRightIcon} loading={loading}>
          Button
        </Button>
        <Button {...args} icon={ArrowRightIcon} iconPosition="right" loading={loading}>
          Button
        </Button>
        <Button {...args} variant="secondary" loading={loading}>
          Button
        </Button>
      </>
    );
  }

  return (
    <>
      <Button onClick={() => setLoading(!loading)} color="gray">
        Click to Load
      </Button>
      <div className="flex flex-col max-w-fit gap-y-2 mt-10">
        {Object.values(InputSizes).map((size, index) => (
          <React.Fragment key={index}>{RenderButtons(args, loading)}</React.Fragment>
        ))}
      </div>
      With Loading Text
      <div className="flex flex-col max-w-fit gap-y-2 mt-10">
        {RenderButtons({ ...args, loadingText: "Loading" }, loading)}
      </div>
    </>
  );
}

const LoadingStateTemplate: Story = {
  render: ({ ...args }) => <LoadingState {...args} />,
};

export const Default: Story = {
  args: {
    children: "Default",
  },
};

export const Sizes: Story = {
  ...SizesTemplate,
  args: {
    onClick: () => alert(2),
    className: "max-w-fit",
  },
};

export const SizesNoText: Story = {
  ...SizesTemplateNoText,
  args: {
    onClick: () => alert(2),
    className: "max-w-fit",
  },
};

export const Colors: Story = {
  ...ColorsTemplate,
  args: {
    onClick: () => alert(2),
    className: "max-w-fit",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const LoadingStates: Story = {
  ...LoadingStateTemplate,
  args: {},
};
