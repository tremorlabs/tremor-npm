import type { Meta, StoryObj } from "@storybook/react";
// import { RadioGroup, RadioGroupOption } from "components";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

const platformPrices = [
  { id: 0, title: "Starter", description: "Up to 300 requests per day" },
  {
    id: 2,
    title: "Premium",
    description: "Unlimited requests per month",
  },
  { id: 3, title: "Enterprise", description: "Based on your specific needs" },
];

interface StringJoiner {
  (...classes: string[]): string;
}
const classNames: StringJoiner = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

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
      {/* <RadioGroup value={selectedPlatform} onChange={setSelectedPlatform} name="platform">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          {platformPrices.map((priceTier) => (
            <RadioGroupOption
              key={priceTier.id}
              value={priceTier.id}
              className={({ active }) =>
                classNames(
                  active
                    ? "border border-blue-400 ring-2 ring-blue-200 transition-all"
                    : "ring-1 ring-gray-200 border-transparent",
                  "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all",
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-slate-900">
                        {priceTier.title}
                      </span>
                      <span className="mt-1 flex items-center text-sm text-slate-500">
                        {priceTier.description}
                      </span>
                    </span>
                  </span>
                  <CheckCircleIcon
                    className={classNames(!checked ? "invisible" : "", "h-5 w-5 text-blue-500")}
                    aria-hidden="true"
                  />
                  <span
                    className={classNames(
                      active ? "border" : "",
                      checked
                        ? "border border-blue-400 ring-2 ring-blue-200"
                        : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg",
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroupOption>
          ))}
        </div>
      </RadioGroup> */}
      <RadioGroup value={selectedPlatform} onChange={setSelectedPlatform} name="platform">
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          {platformPrices.map((priceTier) => (
            <RadioGroup.Option
              key={priceTier.id}
              value={priceTier}
              className={({ active }) =>
                classNames(
                  active
                    ? "border border-blue-400 ring-2 ring-blue-200 transition-all"
                    : "ring-1 ring-gray-200 border-transparent ",
                  "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all",
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className="block text-sm font-medium text-slate-900"
                      >
                        {priceTier.title}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="mt-1 flex items-center text-sm text-slate-500"
                      >
                        {priceTier.description}
                      </RadioGroup.Description>
                    </span>
                  </span>
                  <CheckCircleIcon
                    className={classNames(!checked ? "invisible" : "", "h-5 w-5 text-blue-500")}
                    aria-hidden="true"
                  />
                  <span
                    className={classNames(
                      active ? "border" : "",
                      checked
                        ? "border border-blue-400 ring-2 ring-blue-200"
                        : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg",
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

const Cards: Story = {
  render: CardTemplate,
};

export const CardsCustomStyled: Story = {
  ...Cards,
};
