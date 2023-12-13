import React, { useState } from "react";
import { ChoiceboxGroup, ChoiceboxGroupOption } from "components";

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

export function SimpleChoiceboxGroup() {
  return (
    <ChoiceboxGroup defaultValue="1" disabled={true}>
      {platformPrices.map((priceTier) => (
        <ChoiceboxGroupOption
          disabled={true}
          key={priceTier.id}
          value={priceTier.id}
          label={priceTier.title}
          description={priceTier.description}
        />
      ))}
    </ChoiceboxGroup>
  );
}

export function SimpleChoiceboxGroupControlled() {
  const [selectedPlatform, setSelectedPlatform] = useState(platformPrices[0]);
  return (
    <ChoiceboxGroup
      value={selectedPlatform.id}
      onValueChange={(val) =>
        setSelectedPlatform((prev) => platformPrices.find((ele) => ele.id === val) ?? prev)
      }
    >
      {platformPrices.map((priceTier) => (
        <ChoiceboxGroupOption
          key={priceTier.id}
          value={priceTier.id}
          label={priceTier.title}
          description={priceTier.description}
        />
      ))}
    </ChoiceboxGroup>
  );
}
