import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { RadioGroup, RadioGroupOption } from "components";

const platformPrices = [
  { id: "0", title: "Starter", description: "Up to 300 requests per day", price: 0 },
  {
    id: "2",
    title: "Premium",
    description: "Unlimited requests per month",
    price: 100,
  },
  { id: "3", title: "Enterprise", description: "Based on your specific needs", price: 1000 },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Input/RadioGroup",
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

function CardTemplate() {
  const [selectedPlatform, setSelectedPlatform] = useState(platformPrices[0]);
  return (
    <div className="p-10">
      <RadioGroup
        value={selectedPlatform.id}
        onValueChange={(val) =>
          setSelectedPlatform((prev) => platformPrices.find((ele) => ele.id === val) ?? prev)
        }
      >
        {platformPrices.map((priceTier) => (
          <RadioGroupOption
            key={priceTier.id}
            value={priceTier.id}
            label={priceTier.title}
            description={priceTier.description}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

const Cards: Story = {
  render: CardTemplate,
};

export const DefaultRadioGroup: Story = {
  ...Cards,
};
