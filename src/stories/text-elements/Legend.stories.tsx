import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Legend } from "components";

const meta: Meta<typeof Legend> = {
  title: "UI/Text/Legend",
  component: Legend,
  args: {
    categories: [
      "Critical",
      "This is a very long category name to test an edge case",
      "Category C",
      "Category D",
    ],
  },
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/text-elements/Legend",
  },
};

export default meta;
type Story = StoryObj<typeof Legend>;

function LegendComponent(args: any) {
  // if (args.onClickLegendItem?.length === 0) {
  //   args.onClickLegendItem = undefined;
  // }
  return <Legend {...args} />;
}

const LegendTemplate: Story = {
  render: ({ ...args }) => <LegendComponent {...args} />,
};

export const Default: Story = {
  ...LegendTemplate,
};

export const OnClick: Story = {
  ...LegendTemplate,
  args: {
    onClickLegendItem: (e: any) => alert(JSON.stringify(e)),
  },
};

export const ActiveLegend: Story = {
  ...LegendTemplate,
  args: {
    activeLegend: "Category C",
  },
};

export const ManyCategories: Story = {
  ...LegendTemplate,
  args: {
    categories: [
      "Critical",
      "This is a very long category name to test an edge case",
      "Category C",
      "Category D",
      "Critical",
      "This is a very long category name to test an edge case",
      "Category C",
      "Category D",
    ],
  },
};

export const ManyCategoriesWithScroll: Story = {
  ...LegendTemplate,
  args: {
    categories: [
      "Critical",
      "This is a very long category name to test an edge case",
      "Category C",
      "Category D",
      "Critical",
      "This is a very long category name to test an edge case",
      "Category C",
      "Category D",
    ],
    enableLegendSlider: true,
  },
};

export const MoreCategoriesThanColors: Story = {
  ...LegendTemplate,
  args: {
    categories: [
      "Indeed Sponsorisé",
      "Moteurs de recherche",
      "Autres",
      "Linkedin",
      "Jobteaser",
      "Glassdoor",
      "Talent.com",
      "Facebook",
      "Mailing",
      "Non Tracable",
      "Apec",
      "Figaro Emploi",
      "OptionCarriere",
      "Welcome to the jungle",
      "JobiJoba",
      "kedgebs.p.iagora",
      "Instagram",
      "Engagement Jeunes",
      "Hellowork",
      "Pole Emploi",
      "ezafterdark",
      "ezafterdark1",
      "afterdarkmode",
    ],
  },
};

export const CustomColors: Story = {
  ...LegendTemplate,
  args: {
    colors: ["red", "rose", "green", "blue"],
  },
};

export const CustomColorsConClick: Story = {
  ...LegendTemplate,
  args: {
    colors: ["red", "rose", "green", "#32a852"],
    onClickLegendItem: (e) => {
      console.log(e);
    },
  },
};
